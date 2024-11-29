// SolarPlantFinancialMetrics.ts
import financialUtils from './financialUtils';

interface SolarPlantFinancialMetricsConfig {
    tasaInteres: number;
    omAnualFinanciamiento: number;
    omAnualPostFinanciamiento: number;
    anosFinanciacion: number;
    costoBase: number;
    coefLinear: number;
    coefQuadratic: number;
    unidad: "MW" | "kW";
}

export default class SolarPlantFinancialMetrics {
    private tasa_interes: number;
    private om_anual_financiamiento: number;
    private om_anual_post_financiamiento: number;
    private anos_financiacion_rangos: [number, number, number][];
    private costoBase: number;
    private coefLinear: number;
    private coefQuadratic: number;
    private unidad: "MW" | "kW";

    constructor(config: SolarPlantFinancialMetricsConfig) {
        this.tasa_interes = config.tasaInteres;
        this.om_anual_financiamiento = config.omAnualFinanciamiento;
        this.om_anual_post_financiamiento = config.omAnualPostFinanciamiento;
        this.anos_financiacion_rangos = [[1, 15, config.anosFinanciacion]];
        this.costoBase = config.costoBase;
        this.coefLinear = config.coefLinear;
        this.coefQuadratic = config.coefQuadratic;
        this.unidad = config.unidad;
    }

    private convertirPotencia(potencia: number): number {
        // Convierte potencia a MW si la unidad es kW
        return this.unidad === "kW" ? potencia / 1000 : potencia;
    }

    calcular_generacion_anual_mwh(potencia: number): number {
        const potencia_mw = this.convertirPotencia(potencia);
        return potencia_mw * 2295;
    }

    calcular_generacion_anual_usd(potencia: number, precio_energia: number): number {
        const generacion_anual_mwh = this.calcular_generacion_anual_mwh(potencia);
        return generacion_anual_mwh * precio_energia;
    }

    calcular_costo_parque(potencia: number): number {
        const potencia_mw = this.convertirPotencia(potencia);
        const costo = this.costoBase + this.coefLinear * potencia_mw + this.coefQuadratic * (potencia_mw ** 2);
        return Math.max(750000, Math.min(costo, 1200000));
    }

    calcular_inversion(potencia: number): number {
        const potencia_mw = this.convertirPotencia(potencia);
        const costo_parque = this.calcular_costo_parque(potencia);
        return potencia_mw * costo_parque;
    }

    calcular_porcentaje_financiar(potencia: number): number {
        const potencia_mw = this.convertirPotencia(potencia);
        return Math.max(0.70, Math.min(0.95, 0.95 - ((potencia_mw - 1) * (0.95 - 0.70) / (15 - 1))));
    }

    calcular_monto_financiar(potencia: number): number {
        const inversion = this.calcular_inversion(potencia);
        const porcentaje_financiar = this.calcular_porcentaje_financiar(potencia);
        return inversion * porcentaje_financiar;
    }

    obtener_anos_financiacion(): number {
        return this.anos_financiacion_rangos[0][2];
    }

    calcular_pagos_anuales(potencia: number): number {
        const monto_financiar = this.calcular_monto_financiar(potencia);
        const anos_financiacion = this.obtener_anos_financiacion();
        return financialUtils.pmt(this.tasa_interes, anos_financiacion, -monto_financiar);
    }

    calcular_cash_inicial(potencia: number): number {
        const inversion = this.calcular_inversion(potencia);
        const porcentaje_financiar = this.calcular_porcentaje_financiar(potencia);
        return -(inversion * (1 - porcentaje_financiar));
    }

    calcular_cashflow_anual_con_financiamiento(potencia: number, precio_energia: number): number {
        const generacion_anual_usd = this.calcular_generacion_anual_usd(potencia, precio_energia);
        const pagos_anuales = this.calcular_pagos_anuales(potencia);
        const potencia_mw = this.convertirPotencia(potencia);
        return generacion_anual_usd - this.om_anual_financiamiento * potencia_mw - pagos_anuales;
    }

    calcular_cashflow_anual_sin_financiamiento(potencia: number, precio_energia: number): number {
        const generacion_anual_usd = this.calcular_generacion_anual_usd(potencia, precio_energia);
        const potencia_mw = this.convertirPotencia(potencia);
        return generacion_anual_usd - this.om_anual_post_financiamiento * potencia_mw;
    }

    calcular_tir(potencia: number, precio_energia: number): number {
        const cash_inicial = this.calcular_cash_inicial(potencia);
        const cashflow_con_fin = this.calcular_cashflow_anual_con_financiamiento(potencia, precio_energia);
        const cashflow_sin_fin = this.calcular_cashflow_anual_sin_financiamiento(potencia, precio_energia);
        const anos_financiacion = this.obtener_anos_financiacion();
        const periodos_totales = 25;
        const flujos = [cash_inicial, ...Array(anos_financiacion).fill(cashflow_con_fin), ...Array(periodos_totales - anos_financiacion).fill(cashflow_sin_fin)];
        return financialUtils.irr(flujos) || 0;
    }

    calcular_payback(potencia: number, precio_energia: number): number | null {
        const cash_inicial = this.calcular_cash_inicial(potencia);
        const cashflow_con_fin = this.calcular_cashflow_anual_con_financiamiento(potencia, precio_energia);
        const cashflow_sin_fin = this.calcular_cashflow_anual_sin_financiamiento(potencia, precio_energia);
        const anos_financiacion = this.obtener_anos_financiacion();
        const periodos_totales = 25;
        const flujos = [cash_inicial, ...Array(anos_financiacion).fill(cashflow_con_fin), ...Array(periodos_totales - anos_financiacion).fill(cashflow_sin_fin)];
        let acumulado = 0;
        for (let i = 0; i < flujos.length; i++) {
            acumulado += flujos[i];
            if (acumulado >= 0) return i;
        }
        return null;
    }
}
