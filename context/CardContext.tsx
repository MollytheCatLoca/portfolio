"use client"

import React, { createContext, useState, useContext } from 'react';

interface CardContextProps {
    isCardActive: boolean;
    setIsCardActive: (active: boolean) => void;
}

const CardContext = createContext<CardContextProps | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCardActive, setIsCardActive] = useState<boolean>(false);

    return (
        <CardContext.Provider value= {{ isCardActive, setIsCardActive }
}>
    { children }
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error('useCardContext must be used within a CardProvider');
    }
    return context;
};
