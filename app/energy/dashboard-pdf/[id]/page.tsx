import { getParqueSolarData } from '@/lib/apiSolar';
import ScenarioDashboardPDFContent from '@/components/ScenarioDashboardPDFContent';


export default async function ScenarioDashboardPDFPage({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const id = parseInt(params.id, 10);
    const queryParams = {
        provincia: searchParams.provincia as string || '',
        localidad: searchParams.localidad as string || '',
        capacidad: searchParams.capacidad as string || '',
        area: searchParams.area as string || '',
        scenarioId: searchParams.scenarioId as string || ''  // Añadido scenarioId
    };

    console.log("ScenarioDashboardPDFPage: Fetching data for scenario", id);

    try {
        const scenarioData = await getParqueSolarData(id, queryParams);

        if (!scenarioData) {
            console.error(`No se encontró el escenario con id ${id}`);
            return <div>Escenario no encontrado </div>;
        }

        return <ScenarioDashboardPDFContent data={ scenarioData } id = { params.id } queryParams = { queryParams } />;
    } catch (error) {
        console.error("Error fetching scenario data:", error);
        return <div>Error al cargar el escenario </div>;
    }
}