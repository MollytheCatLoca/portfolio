'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';

interface QueryParams {
    provincia: string;
    localidad: string;
    capacidad: string;
    area: string;
}

interface QueryParamsContextType {
    queryParams: QueryParams;
    setQueryParams: (params: Partial<QueryParams>) => void;
}

const initialQueryParams: QueryParams = {
    provincia: '',
    localidad: '',
    capacidad: '',
    area: ''
};

const QueryParamsContext = createContext<QueryParamsContextType | undefined>(undefined);

export function QueryParamsProvider({ children }: { children: React.ReactNode }) {
    const [queryParams, setQueryParamsState] = useState<QueryParams>(initialQueryParams);

    const setQueryParams = useCallback((newParams: Partial<QueryParams>) => {
        //console.log("QueryParamsContext: Updating query params", newParams);
        setQueryParamsState(prevParams => {
            const updatedParams = { ...prevParams, ...newParams };
            //console.log("QueryParamsContext: Parámetros actualizados", updatedParams);
            console.log("QueryParamsContext: Parámetros actualizados");
            return updatedParams;
        });
    }, []);

    //console.log("QueryParamsContext: Current query params", queryParams);

    return (
        <QueryParamsContext.Provider value= {{ queryParams, setQueryParams }
}>
    { children }
    </QueryParamsContext.Provider>
    );
}

export function useQueryParams() {
    const context = useContext(QueryParamsContext);
    if (context === undefined) {
        throw new Error('useQueryParams must be used within a QueryParamsProvider');
    }
    return context;
}