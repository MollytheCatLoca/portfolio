/**
 * Utilidades para cálculos financieros
 */
class FinancialUtils {
    private static readonly NEWTON_MAX_ITERATIONS = 1000;
    private static readonly NEWTON_TOLERANCE = 1e-8;
    private static readonly NEWTON_DELTA = 0.0001;

    /**
     * Calcula el pago periódico de una anualidad.
     * @param rate - Tasa de interés por periodo (en decimal, ej: 0.05 para 5%)
     * @param nper - Número total de periodos
     * @param pv - Valor presente (monto del préstamo)
     * @throws Error si los parámetros son inválidos
     * @returns El pago por periodo (negativo indica pago a realizar)
     */
    static pmt(rate: number, nper: number, pv: number): number {
        // Validaciones
        if (nper <= 0) throw new Error('El número de períodos debe ser positivo');
        if (rate < 0) throw new Error('La tasa de interés no puede ser negativa');

        // Caso especial: tasa de interés 0
        if (rate === 0) return -pv / nper;

        try {
            const pvif = Math.pow(1 + rate, nper);
            const pmt = (rate * pv * pvif) / (pvif - 1);
            return -pmt;
        } catch (error) {
            throw new Error('Error en el cálculo de PMT: ' + error.message);
        }
    }

    /**
     * Calcula el Valor Presente Neto (VPN/NPV) de una serie de flujos de caja.
     * @param rate - Tasa de descuento por periodo (en decimal)
     * @param cashflows - Array de flujos de caja, comenzando con la inversión inicial (negativa)
     * @throws Error si los parámetros son inválidos
     * @returns El valor presente neto
     */
    static npv(rate: number, cashflows: number[]): number {
        // Validaciones
        if (rate < -1) throw new Error('La tasa de descuento no puede ser menor a -100%');
        if (!cashflows.length) throw new Error('El array de flujos de caja no puede estar vacío');

        try {
            return cashflows.reduce(
                (acc, curr, i) => acc + curr / Math.pow(1 + rate, i),
                0
            );
        } catch (error) {
            throw new Error('Error en el cálculo de NPV: ' + error.message);
        }
    }

    /**
     * Calcula la Tasa Interna de Retorno (TIR/IRR) usando el método de Newton-Raphson.
     * @param cashflows - Array de flujos de caja, comenzando con la inversión inicial (negativa)
     * @param guess - Estimación inicial de la TIR (por defecto 0.1 = 10%)
     * @throws Error si los parámetros son inválidos o no hay convergencia
     * @returns La tasa interna de retorno o null si no converge
     */
    static irr(cashflows: number[], guess: number = 0.1): number | null {
        // Validaciones
        if (!cashflows.length) throw new Error('El array de flujos de caja no puede estar vacío');
        if (!cashflows.some(flow => flow < 0)) {
            throw new Error('Debe haber al menos un flujo negativo (inversión)');
        }
        if (!cashflows.some(flow => flow > 0)) {
            throw new Error('Debe haber al menos un flujo positivo (retorno)');
        }

        const calcNpv = (rate: number): number => {
            return cashflows.reduce(
                (npv, value, index) => npv + value / Math.pow(1 + rate, index),
                0
            );
        };

        let rate = guess;

        try {
            for (let i = 0; i < this.NEWTON_MAX_ITERATIONS; i++) {
                const npv = calcNpv(rate);

                // Verificar si ya encontramos una solución aceptable
                if (Math.abs(npv) < this.NEWTON_TOLERANCE) {
                    return rate;
                }

                // Calcular la derivada numérica
                const derivative = (calcNpv(rate + this.NEWTON_DELTA) - npv) / this.NEWTON_DELTA;

                // Evitar división por cero
                if (Math.abs(derivative) < this.NEWTON_TOLERANCE) {
                    return null;
                }

                // Calcular nueva aproximación
                const newRate = rate - npv / derivative;

                // Verificar convergencia
                if (Math.abs(newRate - rate) < this.NEWTON_TOLERANCE) {
                    return newRate;
                }

                rate = newRate;
            }
        } catch (error) {
            throw new Error('Error en el cálculo de IRR: ' + error.message);
        }

        return null; // No se encontró convergencia
    }

    /**
     * Calcula la Tasa Interna de Retorno Modificada (TIRM/MIRR).
     * @param cashflows - Array de flujos de caja
     * @param financeRate - Tasa de financiamiento para flujos negativos
     * @param reinvestRate - Tasa de reinversión para flujos positivos
     * @returns La tasa interna de retorno modificada
     */
    static mirr(cashflows: number[], financeRate: number, reinvestRate: number): number {
        if (!cashflows.length) throw new Error('El array de flujos de caja no puede estar vacío');

        const n = cashflows.length - 1;

        // Separar flujos positivos y negativos
        const negativeFlows = cashflows.map(flow => flow < 0 ? flow : 0);
        const positiveFlows = cashflows.map(flow => flow > 0 ? flow : 0);

        // Calcular valor presente de flujos negativos
        const presentValue = Math.abs(this.npv(financeRate, negativeFlows));

        // Calcular valor futuro de flujos positivos
        const futureValue = positiveFlows.reduce(
            (acc, flow, i) => acc + flow * Math.pow(1 + reinvestRate, n - i),
            0
        );

        // Calcular MIRR
        return Math.pow(futureValue / presentValue, 1 / n) - 1;
    }
}

export default FinancialUtils;