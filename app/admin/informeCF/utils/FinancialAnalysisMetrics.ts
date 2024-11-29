// FinancialAnalysisMetrics.ts

import FinancialUtils from './financialUtils';

/**
 * Configuración para el análisis financiero de proyectos energéticos
 */
interface FinancialAnalysisMetricsConfig {
    // Parámetros básicos obligatorios
    potencia: number;                    // Potencia del proyecto
    precioEnergia: number;              // Precio de la energía por unidad
    tasaInteres: number;                // Tasa de interés del financiamiento
    omAnualFinanciamiento: number;      // Costo O&M anual durante financiamiento
    omAnualPostFinanciamiento: number;  // Costo O&M anual post-financiamiento
    anosFinanciacion: number;           // Duración del financiamiento en años
    tasaDescuento: number;              // Tasa de descuento para VAN
    porcentajeFinanciado: number;       // Porcentaje del proyecto a financiar (0-1)
    costoBase: number;                  // Costo base del proyecto
    coefLinear: number;                 // Coeficiente lineal para costo
    coefQuadratic: number;              // Coeficiente cuadrático para costo
    unidad: "MW" | "kW";                // Unidad de medida de la potencia

    // Parámetros configurables opcionales
    tasaBonoVerde?: number;             // Tasa del bono verde
    tasaAhorroFiscal?: number;          // Tasa de ahorro fiscal
    factorGeneracionAnual?: number;     // Factor de generación anual
    anosVidaUtil?: number;              // Años de vida útil del proyecto
    costoParqueMin?: number;            // Costo mínimo del parque
    costoParqueMax?: number;            // Costo máximo del parque
}

/**
 * Resultado del resumen financiero
 */
interface ResumenFinanciero {
    inversion: number;                  // Inversión total inicial
    montoFinanciado: number;           // Monto a financiar
    pagosAnuales: number;              // Pagos anuales del financiamiento
    ahorroAnualLeasing: number;        // Ahorro anual durante leasing
    ahorroAnualPostLeasing: number;    // Ahorro anual post-leasing
    ahorroTotal: number;               // Ahorro total del proyecto
    relacionCuotaIngreso: number;      // Relación cuota/ingreso
    van: number;                       // Valor Actual Neto
    tir: number | null;                // Tasa Interna de Retorno
    tirm: number;                      // Tasa Interna de Retorno Modificada
    paybackSimple: number | null;      // Período de recuperación simple
    paybackDescontado: number | null;  // Período de recuperación descontado
    generacionAnualUSD: number;        // Generación anual en USD
    costoParque: number;               // Costo del parque
    beneficiosLeasing: number;         // Beneficios del leasing
}

export default class FinancialAnalysisMetrics {
    private readonly potencia: number;
    private readonly precioEnergia: number;
    private readonly tasaInteres: number;
    private readonly omAnualFinanciamiento: number;
    private readonly omAnualPostFinanciamiento: number;
    private readonly anosFinanciacion: number;
    private readonly tasaDescuento: number;
    private readonly porcentajeFinanciado: number;
    private readonly costoBase: number;
    private readonly coefLinear: number;
    private readonly coefQuadratic: number;
    private readonly unidad: "MW" | "kW";

    // Parámetros configurables con valores por defecto
    private readonly tasaBonoVerde: number;
    private readonly tasaAhorroFiscal: number;
    private readonly factorGeneracionAnual: number;
    private readonly anosVidaUtil: number;
    private readonly costoParqueMin: number;
    private readonly costoParqueMax: number;

    // Constantes del sistema
    private static readonly MIN_POTENCIA = 0;
    private static readonly MIN_PRECIO_ENERGIA = 0;
    private static readonly MIN_TASA = 0;
    private static readonly MAX_TASA = 1;
    private static readonly MIN_ANOS = 1;
    private static readonly MAX_ANOS_VIDA_UTIL = 50;

    /**
     * Constructor de la clase
     * @param config Configuración del análisis financiero
     * @throws Error si algún parámetro es inválido
     */
    constructor(config: FinancialAnalysisMetricsConfig) {
        this.validateConfig(config);

        // Asignación de parámetros básicos
        this.potencia = config.potencia;
        this.precioEnergia = config.precioEnergia;
        this.tasaInteres = config.tasaInteres;
        this.omAnualFinanciamiento = config.omAnualFinanciamiento;
        this.omAnualPostFinanciamiento = config.omAnualPostFinanciamiento;
        this.anosFinanciacion = config.anosFinanciacion;
        this.tasaDescuento = config.tasaDescuento;
        this.porcentajeFinanciado = config.porcentajeFinanciado;
        this.costoBase = config.costoBase;
        this.coefLinear = config.coefLinear;
        this.coefQuadratic = config.coefQuadratic;
        this.unidad = config.unidad;

        // Asignación de parámetros configurables con valores por defecto
        this.tasaBonoVerde = config.tasaBonoVerde ?? 0.08;
        this.tasaAhorroFiscal = config.tasaAhorroFiscal ?? 0.10;
        this.factorGeneracionAnual = config.factorGeneracionAnual ?? 2295;
        this.anosVidaUtil = config.anosVidaUtil ?? 25;
        this.costoParqueMin = config.costoParqueMin ?? 750000;
        this.costoParqueMax = config.costoParqueMax ?? 1200000;
    }

    /**
     * Valida los parámetros de configuración
     * @throws Error si algún parámetro es inválido
     */
    private validateConfig(config: FinancialAnalysisMetricsConfig): void {
        if (config.potencia <= FinancialAnalysisMetrics.MIN_POTENCIA)
            throw new Error('La potencia debe ser positiva');

        if (config.precioEnergia <= FinancialAnalysisMetrics.MIN_PRECIO_ENERGIA)
            throw new Error('El precio de energía debe ser positivo');

        if (config.tasaInteres < FinancialAnalysisMetrics.MIN_TASA ||
            config.tasaInteres > FinancialAnalysisMetrics.MAX_TASA)
            throw new Error('La tasa de interés debe estar entre 0 y 1');

        if (config.anosFinanciacion < FinancialAnalysisMetrics.MIN_ANOS)
            throw new Error('Los años de financiación deben ser positivos');

        if (config.tasaDescuento < FinancialAnalysisMetrics.MIN_TASA)
            throw new Error('La tasa de descuento no puede ser negativa');

        if (config.porcentajeFinanciado <= FinancialAnalysisMetrics.MIN_TASA ||
            config.porcentajeFinanciado > FinancialAnalysisMetrics.MAX_TASA)
            throw new Error('El porcentaje financiado debe estar entre 0 y 1');

        if (config.anosVidaUtil &&
            config.anosVidaUtil > FinancialAnalysisMetrics.MAX_ANOS_VIDA_UTIL)
            throw new Error(`Los años de vida útil no pueden superar ${FinancialAnalysisMetrics.MAX_ANOS_VIDA_UTIL}`);

        if (config.anosFinanciacion > (config.anosVidaUtil ?? 25))
            throw new Error('Los años de financiación no pueden superar la vida útil');
    }

    /**
     * Convierte la potencia a MW si está en kW
     */
    private convertirPotencia(): number {
        return this.unidad === "kW" ? this.potencia / 1000 : this.potencia;
    }

    /**
     * Calcula la generación anual en USD
     */
    calcularGeneracionAnualUSD(): number {
        try {
            const potencia_mw = this.convertirPotencia();
            return potencia_mw * this.factorGeneracionAnual * this.precioEnergia;
        } catch (error) {
            throw new Error(`Error al calcular generación anual: ${error.message}`);
        }
    }

    /**
     * Calcula el costo del parque
     */
    calcularCostoParque(): number {
        try {
            const potencia_mw = this.convertirPotencia();
            const costo = this.costoBase +
                this.coefLinear * potencia_mw +
                this.coefQuadratic * (potencia_mw ** 2);
            return Math.max(this.costoParqueMin, Math.min(costo, this.costoParqueMax));
        } catch (error) {
            throw new Error(`Error al calcular costo del parque: ${error.message}`);
        }
    }

    /**
     * Calcula la inversión total
     */
    calcularInversion(): number {
        try {
            const potencia_mw = this.convertirPotencia();
            return potencia_mw * this.calcularCostoParque();
        } catch (error) {
            throw new Error(`Error al calcular inversión: ${error.message}`);
        }
    }

    /**
     * Calcula el monto a financiar
     */
    calcularMontoFinanciar(): number {
        try {
            return this.calcularInversion() * this.porcentajeFinanciado;
        } catch (error) {
            throw new Error(`Error al calcular monto a financiar: ${error.message}`);
        }
    }

    /**
     * Calcula los pagos anuales del financiamiento
     */
    calcularPagosAnuales(): number {
        try {
            const montoFinanciar = this.calcularMontoFinanciar();
            return FinancialUtils.pmt(this.tasaInteres, this.anosFinanciacion, -montoFinanciar);
        } catch (error) {
            throw new Error(`Error al calcular pagos anuales: ${error.message}`);
        }
    }

    /**
     * Calcula los beneficios del leasing
     */
    calcularBeneficiosLeasing(): number {
        try {
            const montoFinanciar = this.calcularMontoFinanciar();
            return montoFinanciar * this.tasaAhorroFiscal;
        } catch (error) {
            throw new Error(`Error al calcular beneficios leasing: ${error.message}`);
        }
    }

    /**
     * Calcula el ahorro anual durante el período de leasing
     */
    calcularAhorroAnualEnPeriodoLeasing(): number {
        try {
            const generacionAnualUSD = this.calcularGeneracionAnualUSD();
            const omFinanciamiento = this.omAnualFinanciamiento * this.convertirPotencia();
            const pagosAnuales = this.calcularPagosAnuales();
            const beneficiosLeasing = this.calcularBeneficiosLeasing();

            return generacionAnualUSD - omFinanciamiento - pagosAnuales + beneficiosLeasing;
        } catch (error) {
            throw new Error(`Error al calcular ahorro anual en período leasing: ${error.message}`);
        }
    }

    /**
     * Calcula el ahorro total durante el período de leasing
     */
    calcularAhorroTotalEnPeriodoLeasing(): number {
        try {
            const ahorroAnualLeasing = this.calcularAhorroAnualEnPeriodoLeasing().total;

            return ahorroAnualLeasing * this.anosFinanciacion;
        } catch (error) {
            throw new Error(`Error al calcular ahorro total en período leasing: ${error.message}`);
        }
    }

    /**
     * Calcula el ahorro anual fuera del período de leasing
     */
    calcularAhorroAnualFueraPeriodoLeasing(): number {
        try {
            const generacionAnualUSD = this.calcularGeneracionAnualUSD();
            const omPostFinanciamiento = this.omAnualPostFinanciamiento * this.convertirPotencia();
            const bonoVerde = generacionAnualUSD * this.tasaBonoVerde;

            return generacionAnualUSD - omPostFinanciamiento + bonoVerde;
        } catch (error) {
            throw new Error(`Error al calcular ahorro anual fuera período leasing: ${error.message}`);
        }
    }

    /**
     * Calcula el ahorro total fuera del período de leasing
     */
    calcularAhorroTotalFueraPeriodoLeasing(): number {
        try {
            const ahorroAnual = this.calcularAhorroAnualFueraPeriodoLeasing().total;
            const anosRestantes = this.anosVidaUtil - this.anosFinanciacion;
            return ahorroAnual * anosRestantes;
        } catch (error) {
            throw new Error(`Error al calcular ahorro total fuera período leasing: ${error.message}`);
        }
    }

    /**
     * Calcula el ahorro total del proyecto
     */
    calcularAhorroTotal(): number {
        try {
            return this.calcularAhorroTotalEnPeriodoLeasing() +
                this.calcularAhorroTotalFueraPeriodoLeasing();
        } catch (error) {
            throw new Error(`Error al calcular ahorro total: ${error.message}`);
        }
    }

    /**
     * Calcula la relación cuota/ingreso
     */
    calcularRelacionCuotaIngreso(): number {
        try {
            const pagosAnuales = this.calcularPagosAnuales();
            const generacionAnualUSD = this.calcularGeneracionAnualUSD();
            return pagosAnuales / generacionAnualUSD;
        } catch (error) {
            throw new Error(`Error al calcular relación cuota/ingreso: ${error.message}`);
        }
    }

    /**
     * Calcula el Valor Actual Neto (VAN)
     */
    calcularVAN(): number {
        try {
            const cashFlow = this.generarCashflowCompleto();
            return FinancialUtils.npv(this.tasaDescuento, cashFlow);
        } catch (error) {
            throw new Error(`Error al calcular VAN: ${error.message}`);
        }
    }

    /**
     * Calcula la Tasa Interna de Retorno (TIR)
     */
    calcularTIR(): number | null {
        try {
            const cashFlow = this.generarCashflowCompleto();
            return FinancialUtils.irr(cashFlow);
        } catch (error) {
            throw new Error(`Error al calcular TIR: ${error.message}`);
        }
    }

    /**
     * Calcula la Tasa Interna de Retorno Modificada (TIRM)
     */
    calcularTIRM(): number {
        try {
            const cashFlow = this.generarCashflowCompleto();
            return FinancialUtils.mirr(cashFlow, this.tasaInteres, this.tasaDescuento);
        } catch (error) {
            throw new Error(`Error al calcular TIRM: ${error.message}`);
        }
    }

    /**
     * Genera el flujo de caja completo del proyecto
     */
    /**
 * Genera el flujo de caja completo del proyecto
/**
 * Genera el flujo de caja completo del proyecto
 */
    generarCashflowCompleto(): number[] {
        try {
            const cashflow = [];

            // Desembolso inicial: inversión menos el monto financiado (negativo)
            const inversion = this.calcularInversion();
            const montoFinanciar = this.calcularMontoFinanciar();
            cashflow.push(-(inversion - montoFinanciar));

            // Período de leasing: añadir el total de ahorro en cada año
            const ahorroAnualEnPeriodoLeasing = this.calcularAhorroAnualEnPeriodoLeasing();
            for (let i = 1; i <= this.anosFinanciacion; i++) {
                cashflow.push(ahorroAnualEnPeriodoLeasing.total);  // Solo el valor `total`
            }

            // Período post-leasing: añadir el total de ahorro en cada año
            const ahorroAnualFueraPeriodoLeasing = this.calcularAhorroAnualFueraPeriodoLeasing();
            for (let i = this.anosFinanciacion + 1; i <= this.anosVidaUtil; i++) {
                cashflow.push(ahorroAnualFueraPeriodoLeasing.total);  // Solo el valor `total`
            }

            return cashflow;
        } catch (error) {
            throw new Error(`Error al generar cashflow completo: ${error.message}`);
        }
    }



    /**
     * Calcula el período de recuperación simple (Payback)
     */
    calcularPaybackSimple(): number | null {
        try {
            const inversion = this.calcularInversion();
            let flujoAcumulado = 0;
            let anos = 0;

            // Durante período de leasing
            const ahorroLeasing = this.calcularAhorroAnualEnPeriodoLeasing();
            for (let i = 1; i <= this.anosFinanciacion; i++) {
                flujoAcumulado += ahorroLeasing;
                anos++;
                if (flujoAcumulado >= inversion) {
                    return anos + (inversion - (flujoAcumulado - ahorroLeasing)) / ahorroLeasing;
                }
            }

            // Durante período post-leasing
            const ahorroPostLeasing = this.calcularAhorroAnualFueraPeriodoLeasing();
            const anosRestantes = this.anosVidaUtil - this.anosFinanciacion;
            for (let i = 1; i <= anosRestantes; i++) {
                flujoAcumulado += ahorroPostLeasing;
                anos++;
                if (flujoAcumulado >= inversion) {
                    return anos + (inversion - (flujoAcumulado - ahorroPostLeasing)) / ahorroPostLeasing;
                }
            }

            return null; // No se recupera la inversión
        } catch (error) {
            throw new Error(`Error al calcular payback simple: ${error.message}`);
        }
    }

    /**
     * Calcula el período de recuperación descontado (Discounted Payback)
     */
    calcularPaybackDescontado(): number | null {
        try {
            const inversion = this.calcularInversion();
            let flujoAcumulado = 0;
            let anos = 0;

            // Durante período de leasing
            const ahorroLeasing = this.calcularAhorroAnualEnPeriodoLeasing();
            for (let i = 1; i <= this.anosFinanciacion; i++) {
                const flujoDescontado = ahorroLeasing / Math.pow(1 + this.tasaDescuento, i);
                flujoAcumulado += flujoDescontado;
                anos++;
                if (flujoAcumulado >= inversion) {
                    const flujoAnterior = flujoAcumulado - flujoDescontado;
                    return anos - 1 + (inversion - flujoAnterior) / flujoDescontado;
                }
            }

            // Durante período post-leasing
            const ahorroPostLeasing = this.calcularAhorroAnualFueraPeriodoLeasing();
            const anosRestantes = this.anosVidaUtil - this.anosFinanciacion;
            for (let i = 1; i <= anosRestantes; i++) {
                const ano = i + this.anosFinanciacion;
                const flujoDescontado = ahorroPostLeasing / Math.pow(1 + this.tasaDescuento, ano);
                flujoAcumulado += flujoDescontado;
                anos++;
                if (flujoAcumulado >= inversion) {
                    const flujoAnterior = flujoAcumulado - flujoDescontado;
                    return anos - 1 + (inversion - flujoAnterior) / flujoDescontado;
                }
            }

            return null; // No se recupera la inversión
        } catch (error) {
            throw new Error(`Error al calcular payback descontado: ${error.message}`);
        }
    }


    /**
 * Calcula los beneficios adicionales durante el período de leasing (beneficios fiscales)
 */
    calcularBeneficiosLeasing(): number {
        try {
            const montoFinanciar = this.calcularMontoFinanciar();
            return montoFinanciar * this.tasaAhorroFiscal;  // Beneficio fiscal del leasing
        } catch (error) {
            throw new Error(`Error al calcular beneficios leasing: ${error.message}`);
        }
    }

    /**
     * Calcula los beneficios adicionales fuera del período de leasing (bono verde)
     */
    calcularBeneficiosFueraLeasing(): number {
        try {
            const generacionAnualUSD = this.calcularGeneracionAnualUSD();
            return generacionAnualUSD * this.tasaBonoVerde;  // Beneficio del bono verde
        } catch (error) {
            throw new Error(`Error al calcular beneficios fuera leasing: ${error.message}`);
        }
    }

    /**
     * Calcula el ahorro total durante el período de leasing, incluyendo beneficios
     */
    calcularAhorroAnualEnPeriodoLeasing(): number {
        try {
            const generacionAnualUSD = this.calcularGeneracionAnualUSD();
            const omFinanciamiento = this.omAnualFinanciamiento * this.convertirPotencia();
            const pagosAnuales = this.calcularPagosAnuales();
            const beneficiosLeasing = this.calcularBeneficiosLeasing();

            return {
                generacion: generacionAnualUSD,
                operacionMantenimiento: -omFinanciamiento,
                pagosLeasing: -pagosAnuales,
                beneficiosAdicionales: beneficiosLeasing,
                total: generacionAnualUSD - omFinanciamiento - pagosAnuales + beneficiosLeasing
            };
        } catch (error) {
            throw new Error(`Error al calcular ahorro anual en período leasing: ${error.message}`);
        }
    }

    /**
     * Calcula el ahorro total fuera del período de leasing, incluyendo beneficios
     */
    calcularAhorroAnualFueraPeriodoLeasing(): number {
        try {
            const generacionAnualUSD = this.calcularGeneracionAnualUSD();
            const omPostFinanciamiento = this.omAnualPostFinanciamiento * this.convertirPotencia();
            const beneficiosBonoVerde = this.calcularBeneficiosFueraLeasing();

            return {
                generacion: generacionAnualUSD,
                operacionMantenimiento: -omPostFinanciamiento,
                beneficiosAdicionales: beneficiosBonoVerde,
                total: generacionAnualUSD - omPostFinanciamiento + beneficiosBonoVerde
            };
        } catch (error) {
            throw new Error(`Error al calcular ahorro anual fuera período leasing: ${error.message}`);
        }
    }

    /**
     * Obtiene un resumen completo del análisis financiero
     */
    obtenerResumenFinanciero(): ResumenFinanciero {
        try {
            return {
                inversion: this.calcularInversion(),
                montoFinanciado: this.calcularMontoFinanciar(),
                pagosAnuales: this.calcularPagosAnuales(),
                ahorroAnualLeasing: this.calcularAhorroAnualEnPeriodoLeasing(),
                ahorroAnualPostLeasing: this.calcularAhorroAnualFueraPeriodoLeasing(),
                ahorroTotal: this.calcularAhorroTotal(),
                relacionCuotaIngreso: this.calcularRelacionCuotaIngreso(),
                van: this.calcularVAN(),
                tir: this.calcularTIR(),
                tirm: this.calcularTIRM(),
                paybackSimple: this.calcularPaybackSimple(),
                paybackDescontado: this.calcularPaybackDescontado(),
                generacionAnualUSD: this.calcularGeneracionAnualUSD(),
                costoParque: this.calcularCostoParque(),
                beneficiosLeasing: this.calcularBeneficiosLeasing()
            };
        } catch (error) {
            throw new Error(`Error al generar resumen financiero: ${error.message}`);
        }
    }
}