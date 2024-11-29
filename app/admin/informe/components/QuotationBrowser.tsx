import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
//import { Badge } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select';
//import { Badge } from '@nextui-org/react';
import { TableHeader } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Filter, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
;

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
            address: string;
        };
    };
}

interface QuotationBrowserProps {
    quotations: QuotationData[];
    onQuotationSelect: (quotation: QuotationData) => void;
    clientId?: string; // Agregamos el clientId como prop
    //onClose?: () => void;
}

const QuotationBrowser = ({ quotations, onQuotationSelect, clientId }: QuotationBrowserProps) => {

    // Al inicializar filteredQuotations, ya filtramos por cliente
    const clientQuotations = useMemo(() =>
        quotations.filter(q => q.plant.client.id.toString() === clientId),
        [quotations, clientId]
    );


    const [filteredQuotations, setFilteredQuotations] = useState(clientQuotations);
    const [filters, setFilters] = useState({
        minPower: '',
        maxPower: '',
        status: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setFilteredQuotations(clientQuotations);
    }, [clientQuotations]);

    const getStatusBadge = (status: string) => {
        const variants = {
            pendiente: "warning",
            aprobada: "success",
            rechazada: "destructive"
        } as const;

        return (
            <Badge variant= { variants[status as keyof typeof variants] || "default" } >
            { status.charAt(0).toUpperCase() + status.slice(1) }
            </Badge>
        );
    };

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

const applyFilters = () => {
    setIsLoading(true);
    try {
        let filtered = [...clientQuotations];

        if (filters.minPower) {
            filtered = filtered.filter(q =>
                q.technical_data[0]?.contracted_power_kw >= parseFloat(filters.minPower)
            );
        }

        if (filters.maxPower) {
            filtered = filtered.filter(q =>
                q.technical_data[0]?.contracted_power_kw <= parseFloat(filters.maxPower)
            );
        }

        if (filters.status) {
            filtered = filtered.filter(q => q.status === filters.status);
        }

        setFilteredQuotations(filtered);
        toast({
            title: "Filtros aplicados",
            description: `Se encontraron ${filtered.length} cotizaciones`,
        });
    } catch (error) {
        toast({
            title: "Error",
            description: "Error al aplicar los filtros",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
};

const handleQuotationSelect = (quotation: QuotationData) => {
    onQuotationSelect(quotation);
    toast({
        title: "Cotización seleccionada",
        description: `Cotización #${quotation.id} seleccionada`,
    });
};

const handleExportQuotation = async (id: number) => {
    try {
        const response = await fetch(`/api/quotations/${id}`);
        if (!response.ok) throw new Error('Error al exportar');

        window.open(`/admin/informe?id=${id}`, '_blank');

        toast({
            title: "Exportación iniciada",
            description: "El informe se abrirá en una nueva pestaña",
        });
    } catch (error) {
        toast({
            title: "Error",
            description: "No se pudo exportar la cotización",
            variant: "destructive",
        });
    }
};

return (
    <div className= "space-y-6" >
    <Card>
    <CardHeader>
    <CardTitle>Filtros </CardTitle>
    </CardHeader>
    < CardContent >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" >
        <div>
        <label className="text-sm font-medium mb-2 block" > Potencia Mínima(kW) </label>
            < Input
type = "number"
placeholder = "Min kW"
value = { filters.minPower }
onChange = {(e) => setFilters(prev => ({
    ...prev,
    minPower: e.target.value
}))}
                        />
    </div>
    < div >
    <label className="text-sm font-medium mb-2 block" > Potencia Máxima(kW) </label>
        < Input
type = "number"
placeholder = "Max kW"
value = { filters.maxPower }
onChange = {(e) => setFilters(prev => ({
    ...prev,
    maxPower: e.target.value
}))}
                        />
    </div>
    < div >
    <label className="text-sm font-medium mb-2 block" > Estado </label>
        < Select
value = { filters.status || undefined }
onValueChange = {(value) => setFilters(prev => ({
    ...prev,
    status: value
}))}
                        >
    <SelectTrigger>
    <SelectValue placeholder="Todos los estados" />
        </SelectTrigger>
        < SelectContent >
        <SelectGroup>
        <SelectItem value="pendiente" > Pendiente </SelectItem>
            < SelectItem value = "aprobada" > Aprobada </SelectItem>
                < SelectItem value = "rechazada" > Rechazada </SelectItem>
                    </SelectGroup>
                    </SelectContent>
                    </Select>
                    </div>
                    </div>
                    < Button
onClick = { applyFilters }
className = "w-full mt-4"
disabled = { isLoading }
    >
{
    isLoading?(
                        <>
    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        Aplicando...
</>
                    ) : (
    <>
    <Filter className= "mr-2 h-4 w-4" />
    Aplicar Filtros({ clientQuotations.length } cotizaciones)
        </>
                    )}
</Button>
    </CardContent>
    </Card>

    < Card >
    <CardContent className="p-0" >
        <Table>
        <TableHeader>
        <TableRow>
        <TableHead>ID </TableHead>
        < TableHead > Cliente </TableHead>
        < TableHead > Fecha </TableHead>
        < TableHead > Potencia(kW) </TableHead>
        < TableHead > Estado </TableHead>
        < TableHead > Métricas </TableHead>
        < TableHead className = "text-right" > Acciones </TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
{
    filteredQuotations.map((quotation) => (
        <TableRow key= { quotation.id } >
        <TableCell>{ quotation.id } </TableCell>
        < TableCell >
        <div className="flex flex-col" >
    <span className="font-medium" >
    { quotation.plant.client.company_name }
    </span>
    < span className = "text-sm text-muted-foreground" >
    { quotation.plant.address }
    </span>
    </div>
    </TableCell>
    <TableCell>
                                    { new Date(quotation.created_at).toLocaleDateString() }
        </TableCell>
        <TableCell>
                                    { (quotation.power_data[0].installed_power_kw || 0)
}
</TableCell>
    < TableCell >
    <Badge variant={
    quotation.status === 'pendiente' ? 'warning' :
        quotation.status === 'aprobada' ? 'success' :
            'destructive'
}>
    { quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1) }
    </Badge>
    </TableCell>
    < TableCell >
    <div className="flex flex-col text-sm" >
        <span>Autoconsumo: { formatNumber(quotation.detailed_metrics[0]?.autoconsumo || 0) }% </span>
            < span > Inyección: { formatNumber(quotation.detailed_metrics[0]?.inyeccion || 0) }% </span>
                </div>
                </TableCell>
                < TableCell className = "text-right" >
                    <div className="flex justify-end gap-2" >
                        <Button
                                            variant="outline"
size = "sm"
onClick = {() => onQuotationSelect(quotation)}
                                        >
    <FileText className="h-4 w-4" />
        </Button>
        < Button
variant = "outline"
size = "sm"
onClick = {() => handleExportQuotation(quotation.id)}
                                        >
    <Download className="h-4 w-4" />
        </Button>
        </div>
        </TableCell>
        </TableRow>
                        ))}
{
    filteredQuotations.length === 0 && (
        <TableRow>
        <TableCell colSpan={ 7 } className = "text-center py-6" >
            No se encontraron cotizaciones
                </TableCell>
                </TableRow>
                        )
}
</TableBody>
    </Table>
    </CardContent>
    </Card>
    </div>
);
};

export default QuotationBrowser;