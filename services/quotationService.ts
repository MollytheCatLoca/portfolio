// services/quotationService.ts

export interface QuotationFilters {
    clientName?: string;
    minPower?: number;
    maxPower?: number;
    status?: string;
}

export interface QuotationData {
    clientName: string;
    plantAddress: string;
    latitude: number;
    longitude: number;
    technical_data: {
        contractedPowerKVA: number;
        contractedPowerKW: number;
        injectionLimitKW: number;
        costPerKW: number;
        referencePowerMW: number;
        referenceAnnualGenerationMWH: number;
        maxCurtailmentPercentage: number;
        hoursPico: number;
        hoursValle: number;
        hoursResto: number;
        hoursGeneration: number;
        OyMLeasing: number;
        OyMSLeasing: number;
        duracionLeasing: number;
        vidaUtil: number;
        tasaInteres: number;
    };
    consumption_data: {
        annualConsumption: number;
        picoMonthly: number;
        valleMonthly: number;
        restoMonthly: number;
    };
    power_data: {
        installedPowerKW: number;
    };
    invoice_data: {
        exchangeRate: number;
        totalInvoiceAmountPesos: number;
        taxesPercentage: number;
        fixedChargesPesos: number;
        reactivePowerChargesPesos: number;
        priceEnergyMWh: number;
    };
    detailed_metrics: {
        capacityMW: number;
        valoresAnuales: {
            generacionTotal: number;
            autoconsumo: number;
            inyeccion: number;
            curtailment: number;
        };
        porcentajes: {
            ahorroTotal: number;
            autoconsumo: number;
            inyeccion: number;
            curtailment: number;
        };
    };
}

export const quotationService = {
    // Obtener todas las cotizaciones con filtros opcionales
    async getAllQuotations(filters?: QuotationFilters) {
        try {
            let url = '/api/quotations';

            if (filters) {
                const params = new URLSearchParams();
                if (filters.clientName) params.append('clientName', filters.clientName);
                if (filters.minPower) params.append('minPower', filters.minPower.toString());
                if (filters.maxPower) params.append('maxPower', filters.maxPower.toString());
                if (filters.status) params.append('status', filters.status);

                if (params.toString()) {
                    url += `?${params.toString()}`;
                }
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch quotations');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching quotations:', error);
            throw error;
        }
    },

    // Obtener una cotización específica por ID
    async getQuotationById(id: string) {
        try {
            const response = await fetch(`/api/quotations/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch quotation');
            }
            const data = await response.json();
            return data; // Incluye tanto los datos de constants como la cotización original
        } catch (error) {
            console.error('Error fetching quotation:', error);
            throw error;
        }
    },

    // Crear una nueva cotización
    async createQuotation(quotationData: QuotationData) {
        try {
            const response = await fetch('/api/quotations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quotationData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create quotation');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating quotation:', error);
            throw error;
        }
    },

    // Actualizar el estado de una cotización
    async updateQuotationStatus(id: string, status: string) {
        try {
            const response = await fetch(`/api/quotations/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quotation status');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating quotation status:', error);
            throw error;
        }
    },

    // Descargar/Guardar datos de la cotización
    async downloadQuotationData(id: string) {
        try {
            const response = await this.getQuotationById(id);
            // Los datos ya se habrán guardado en constantsAUX.json por la API
            return response.data; // Retorna los datos formateados para constants
        } catch (error) {
            console.error('Error downloading quotation data:', error);
            throw error;
        }
    },

    // Verificar si existe una cotización idéntica
    async checkDuplicateQuotation(quotationData: QuotationData) {
        try {
            const response = await fetch('/api/quotations/check-duplicate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quotationData),
            });

            return await response.json();
        } catch (error) {
            console.error('Error checking duplicate quotation:', error);
            throw error;
        }
    },
};

// Ejemplo de uso del servicio:
/*
// Obtener todas las cotizaciones
const quotations = await quotationService.getAllQuotations();

// Obtener cotizaciones con filtros
const filteredQuotations = await quotationService.getAllQuotations({
    clientName: 'Empresa',
    minPower: 100,
    maxPower: 500,
    status: 'pendiente'
});

// Obtener una cotización específica
const quotation = await quotationService.getQuotationById('123');

// Crear una nueva cotización
const newQuotation = await quotationService.createQuotation(quotationData);

// Actualizar estado
await quotationService.updateQuotationStatus('123', 'aprobada');

// Descargar datos
const quotationData = await quotationService.downloadQuotationData('123');
*/