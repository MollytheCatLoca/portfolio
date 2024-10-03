// app/energy/powerbase/page.tsx
import { getParquesSolaresData } from '@/lib/apiSolar';
import PowerContent from '@/components/PowerBase_Dinamico';
export default async function DashboardPDFPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const initialQueryParams = {
        provincia: searchParams.provincia as string || '',
        localidad: searchParams.localidad as string || '',
        capacidad: searchParams.capacidad as string || '',
        area: searchParams.area as string || ''
    };

    console.log("DashboardPDFPage: Initial query params", initialQueryParams);

    let initialScenarios = [];
    //** if (Object.values(initialQueryParams).every(param => param !== '')) {
    //    try {
    //        console.log("DashboardPDFPage: Intentando obtener escenarios iniciales");
    //        initialScenarios = await getParquesSolaresData(initialQueryParams);
    //    } catch (error) {
    //        console.error("Error al obtener escenarios iniciales:", error);
    //    }
    //} else {
    //    console.log("DashboardPDFPage: Faltan parámetros para obtener escenarios iniciales");
    //}

    return <PowerContent
        initialScenarios={ initialScenarios }
    initialQueryParams = { initialQueryParams }
        />;
}