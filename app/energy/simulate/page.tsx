// pages/simulate.tsx
import { QueryParamsWrapper } from '@/components/QueryParamsWrapper';
import SimulatePage from '@/components/SimulatePageContent';
import ChatCompNew2 from "@/components/ChatCompNew2";


export default function SimulatePageCon() {
    return (
        <QueryParamsWrapper>
        <SimulatePage />
        < ChatCompNew2 />
        </QueryParamsWrapper>
    );
}