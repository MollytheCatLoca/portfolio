"use client"
import React, { useState, useEffect } from 'react';
import { useConstants } from '../contexts/ConstantsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Download, Plus, Search, FileText, ClipboardList, Users, FileSearch, Receipt } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useToast } from '@/hooks/use-toast';
import QuotationBrowser from './QuotationBrowser';
import { Badge } from '@/components/ui/badge';
import QuotationDetails from './QuotationDetails';

interface Client {
    id: number;
    company_name: string;
}

interface QuotationData {
    id: number;
    created_at: string;
    status: string;
    technical_data: any[];
    consumption_data: any[];
    power_data: any[];
    invoice_data: any[];
    detailed_metrics: any[];
    plant: {
        client: {
            company_name: string;
        };
    };
}

const QuotationManager = () => {
    const { constants, isLoading: contextLoading } = useConstants();
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cotizacionId, setCotizacionId] = useState<string>('');
    const [cotizacionCargada, setCotizacionCargada] = useState<any>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [clientQuotations, setClientQuotations] = useState([]);

    const { toast } = useToast();



    // Estados para diálogos

    const [showBrowser, setShowBrowser] = useState(false);





    // Cargar lista de clientes
    // Cargar lista de clientes al montar el componente
    useEffect(() => {
        loadClients();
    }, []);

    // Funciones principales
    async function loadClients() {
        try {
            const response = await fetch('/api/clients');
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Error cargando clientes:', error);
            toast({
                title: "Error",
                description: "No se pudieron cargar los clientes",
                variant: "destructive",
            });
        }
    }


    async function createQuotation() {
        setIsLoading(true);
        try {
            const response = await fetch('/api/quotations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientName: constants.company?.companyName || 'Cliente Desconocido',
                    plantAddress: constants.company?.address || 'Dirección Desconocida',
                    latitude: constants.company?.latitude || 0,
                    longitude: constants.company?.longitude || 0,
                    technical_data: constants.technical,
                    consumption_data: constants.consumption,
                    power_data: constants.power,
                    invoice_data: constants.invoice,
                    detailed_metrics: constants.detailedMetrics,
                }),
            });

            const result = await response.json();
            setResponseMessage(result.message);
            toast({
                title: "Éxito",
                description: "Cotización creada correctamente",
            });
        } catch (error) {
            console.error('Error al crear la cotización:', error);
            setResponseMessage('Error al crear la cotización');
            toast({
                title: "Error",
                description: "No se pudo crear la cotización",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    // En loadClientQuotations
    async function loadClientQuotations() {
        if (!selectedClient) return;

        setIsLoading(true);
        try {
            console.log('Fetching quotations for client:', selectedClient);
            const response = await fetch(`/api/quotations?clientId=${selectedClient}`);
            const data = await response.json();
            console.log('Client quotations response:', data);
            setClientQuotations(data);
            setShowBrowser(true);
        } catch (error) {
            console.error('Error loading client quotations:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // En handleQuotationSelect
    const handleQuotationSelect = (quotation: QuotationData) => {
        console.log('Selected quotation:', quotation); // Debug

        if (!quotation || !quotation.id) {
            console.error('Invalid quotation data');
            return;
        }
        const quotationAux = 7
        //quotation.id
        setIsLoading(true);
        fetch(`/api/quotations/${quotationAux}`)
            .then(response => response.json())
            .then(data => {
                console.log('Loaded quotation data:', data); // Debug
                setCotizacionCargada(data);
                setShowDetails(true);
                setShowBrowser(false);
            })
            .catch(error => {
                console.error('Error loading quotation:', error);
                toast({
                    title: "Error",
                    description: "Error al cargar la cotización",
                    variant: "destructive",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    // En loadQuotation
    // En loadQuotation
    const loadQuotation = async (id?: string) => {
        const idToUse = id || cotizacionId;
        if (!idToUse || typeof idToUse !== 'string') {
            console.log("No ID provided");
            return;
        }

        setIsLoading(true);
        try {
            console.log('Loading quotation with ID:', idToUse);
            const response = await fetch(`/api/quotations/${encodeURIComponent(idToUse)}`);
            const result = await response.json();

            if (response.ok) {
                setCotizacionCargada(result);
                setShowDetails(true);
                setCotizacionId(idToUse);
                toast({
                    title: "Éxito",
                    description: "Cotización cargada correctamente",
                });
            }
        } catch (error) {
            console.error('Error loading quotation:', error);
            toast({
                title: "Error",
                description: "Error al cargar la cotización",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Función para cerrar los detalles
    const handleCloseDetails = () => {
        setShowDetails(false);
        setCotizacionCargada(null);
        setCotizacionId(''); // Limpiamos el ID cuando cerramos los detalles
    };


    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            const response = await fetch(`/api/quotations/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                setCotizacionCargada(prev => ({ ...prev, status }));
                toast({
                    title: "Estado actualizado",
                    description: "El estado de la cotización se actualizó correctamente"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar el estado",
                variant: "destructive"
            });
        }
    };

    const handleDownloadData = async (id: number) => {
        try {
            const response = await fetch(`/api/quotations/${id}/export`);
            if (response.ok) {
                toast({
                    title: "Datos exportados",
                    description: "Los datos se exportaron correctamente a Constants"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudieron exportar los datos",
                variant: "destructive"
            });
        }
    };

    

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex items-center gap-2 mb-6">
                <Receipt className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Gestión de Cotizaciones</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Client Search Card */}
                <Card className="bg-[#1b1b3a] border border-[#3b3b4f] p-6 rounded-3xl">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                            <Users className="h-6 w-6 mr-2 text-blue-400" />
                            <h3 className="text-lg font-semibold text-white">Búsqueda por Cliente</h3>
                        </div>
                        <Select value={selectedClient} onValueChange={setSelectedClient}>
                            <SelectTrigger className="mb-4 bg-[#1b1b3a] border-[#3b3b4f] text-white rounded-3xl">
                                <SelectValue placeholder="Seleccionar cliente" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1b1b3a] border-[#3b3b4f] text-white">
                                {clients.map((client) => (
                                    <SelectItem key={client.id} value={client.id.toString()}>
                                        {client.company_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={loadClientQuotations}
                            disabled={!selectedClient || isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Ver Cotizaciones
                        </Button>
                    </div>
                </Card>

                {/* ID Search Card */}
                <Card className="bg-[#1b1b3a] border border-[#3b3b4f] p-6 rounded-3xl">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                            <FileSearch className="h-6 w-6 mr-2 text-blue-400" />
                            <h3 className="text-lg font-semibold text-white">Búsqueda por ID</h3>
                        </div>
                        <Input
                            type="text"
                            placeholder="ID de Cotización"
                            value={cotizacionId}
                            onChange={(e) => setCotizacionId(e.target.value)}
                            className="bg-[#1b1b3a] border-[#3b3b4f] text-white rounded-3xl mb-4"
                        />
                        <Button
                            onClick={() => loadQuotation()}
                            disabled={isLoading || !cotizacionId}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            {isLoading ? 'Cargando...' : 'Buscar'}
                        </Button>
                    </div>
                </Card>

                {/* Create New Quote Card */}
                <Card className="bg-[#1b1b3a] border border-[#3b3b4f] p-6 rounded-3xl">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                            <ClipboardList className="h-6 w-6 mr-2 text-blue-400" />
                            <h3 className="text-lg font-semibold text-white">Nueva Cotización</h3>
                        </div>
                        <p className="text-gray-400 mb-4">Cree una nueva cotización con los datos actuales</p>
                        <Button
                            onClick={createQuotation}
                            disabled={isLoading || contextLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl mt-auto"
                        >
                            {isLoading || contextLoading ? (
                                'Procesando...'
                            ) : (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Crear Nueva Cotización
                                </>
                            )}
                        </Button>
                    </div>
                </Card>
            </div>

            {responseMessage && (
                <Alert className="mb-6 bg-green-900/50 border border-green-500/50 text-green-200 rounded-3xl">
                    <AlertDescription>{responseMessage}</AlertDescription>
                </Alert>
            )}

            {/* Dialogs */}
            <Dialog open={showBrowser} onOpenChange={setShowBrowser}>
                <DialogContent className="max-w-7xl max-h-[90vh] w-full overflow-y-auto bg-[#1b1b3a] border-[#3b3b4f] rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-white">
                            Cotizaciones del Cliente: {
                                clients.find(c => c.id.toString() === selectedClient)?.company_name
                            }
                        </DialogTitle>
                    </DialogHeader>
                    <QuotationBrowser
                        quotations={clientQuotations}
                        onQuotationSelect={handleQuotationSelect}
                        clientId={selectedClient}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1b1b3a] border-[#3b3b4f] rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-white">
                            Detalles de la Cotización #{cotizacionCargada?.id}
                        </DialogTitle>
                    </DialogHeader>
                    {cotizacionCargada && <QuotationDetails quotation={cotizacionCargada} />}

                    <DialogFooter>
                        <div className="flex justify-between w-full">
                            <Select
                                value={cotizacionCargada?.status}
                                onValueChange={(value) => handleStatusUpdate(cotizacionCargada.id, value)}
                            >
                                <SelectTrigger className="w-[180px] bg-[#1b1b3a] border-[#3b3b4f] text-white rounded-3xl">
                                    <SelectValue placeholder="Cambiar estado" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1b1b3a] border-[#3b3b4f] text-white">
                                    <SelectItem value="pendiente">Pendiente</SelectItem>
                                    <SelectItem value="aprobada">Aprobada</SelectItem>
                                    <SelectItem value="rechazada">Rechazada</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline"
                                    onClick={() => handleDownloadData(cotizacionCargada.id)}
                                    className="border-[#3b3b4f] text-white hover:bg-[#2b2b4a] rounded-3xl"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Exportar a Constants
                                </Button>
                                <Button
                                    onClick={() => window.open(`/admin/informe?id=${cotizacionCargada.id}`, '_blank')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Generar Informe
                                </Button>
                            </div>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default QuotationManager;