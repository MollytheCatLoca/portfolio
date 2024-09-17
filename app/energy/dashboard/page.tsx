import { QueryParamsProvider } from "@/context/QueryParamsContext";
import DashboardPageContent from "@/components/DashboardPageContent";
import { getParquesSolaresData } from '@/lib/apiSolar'
import ChatCompNew2 from "@/components/ChatCompNew2";

export default async function DashboardPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    //console.log("DashboardPage: Received search params", searchParams);

    const initialQueryParams = {
        provincia: searchParams.provincia as string || '',
        localidad: searchParams.localidad as string || '',
        capacidad: searchParams.capacidad as string || '',
        area: searchParams.area as string || ''
    };

    //console.log("DashboardPage: Initial query params", initialQueryParams);

    let initialScenarios = [];
    if (Object.values(initialQueryParams).every(param => param !== '')) {
        try {
            console.log("DashboardPage: Intentando obtener escenarios iniciales");
            initialScenarios = await getParquesSolaresData(initialQueryParams);
            //console.log("DashboardPage: Escenarios iniciales obtenidos", initialScenarios);
        } catch (error) {
            console.error("Error al obtener escenarios iniciales:", error);
        }
    } else {
        console.log("DashboardPage: Faltan parámetros para obtener escenarios iniciales");
    }

    return (
        <QueryParamsProvider initialQueryParams= { initialQueryParams } >
        <DashboardPageContent 
                initialScenarios={ initialScenarios }
    initialQueryParams = { initialQueryParams }
        />
        <ChatCompNew2 />
        </QueryParamsProvider>
    );
}