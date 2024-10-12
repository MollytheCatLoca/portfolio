import { QueryParamsWrapper } from '@/components/QueryParamsWrapper';
import DimensioningPage from '@/components/DimensioningPage';
import ChatCompNew2 from "@/components/ChatCompNew2";

export default function DimensionarPage() {
    return (
        <QueryParamsWrapper>
        <DimensioningPage />
        < ChatCompNew2 />
        </QueryParamsWrapper>
    );
}