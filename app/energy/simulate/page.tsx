// pages/simulate.tsx
import { QueryParamsWrapper } from '@/components/QueryParamsWrapper';
import SimulatePage from '@/components/SimulatePageContent';


export default function SimulatePageCon() {
    return (
        <QueryParamsWrapper>
        <SimulatePage />
        </QueryParamsWrapper>
    );
}