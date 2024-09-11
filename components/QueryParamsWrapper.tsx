// components/QueryParamsWrapper.tsx

import { QueryParamsProvider } from '@/context/QueryParamsContext';


export function QueryParamsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <QueryParamsProvider>
        { children }
        </QueryParamsProvider>
    );
}