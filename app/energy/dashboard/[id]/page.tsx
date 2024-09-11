import { getParquesSolaresData } from '@/lib/apiSolar';
import { QueryParamsProvider } from '@/context/QueryParamsContext';
import ScenarioDashboardContent from '@/components/ScenarioDashboardContent';
import { getParqueSolarData } from '@/lib/apiSolar';




export default async function ScenarioDashboardPage({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const id = parseInt(params.id, 10);
    const queryParams = {
        provincia: searchParams.provincia as string,
        localidad: searchParams.localidad as string,
        capacidad: searchParams.capacidad as string,
        area: searchParams.area as string
    };

    console.log("ScenarioDashboardPage: Fetching data for scenario", id)
    //console.log("ScenarioDashboardPage: Fetching data for scenario", id, "with params", queryParams);

    try {
        const scenario = await getParqueSolarData(id, queryParams);
        //console.log("ScenarioDashboardPage: Data received for scenario", id, scenario);

        if (!scenario) {
            console.error(`No se encontró el escenario con id ${id}`);
            // Aquí podrías redirigir a una página de error o mostrar un mensaje
            return <div>Escenario no encontrado </div>;
        }

        return (
            <QueryParamsProvider initialQueryParams= { queryParams } >
            <ScenarioDashboardContent initialScenario={ scenario } id = { params.id } />
                </QueryParamsProvider>
            );
    } catch (error) {
        console.error("Error fetching scenario data:", error);
        return <div>Error al cargar el escenario </div>;
    }
}