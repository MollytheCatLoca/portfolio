// app/admin/informe/components/GlobalConstantsProvider.tsx
"use client"
import React, { useEffect } from 'react';
import { useConstants } from '../contexts/ConstantsContext';
import { setGlobalConstants } from '../data/constants_pdf';

const GlobalConstantsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { constants } = useConstants();
  
  useEffect(() => {
    if (constants) {
      setGlobalConstants(constants);
    }
  }, [constants]);
  
  return <>{children}</>;
};

export default GlobalConstantsProvider;