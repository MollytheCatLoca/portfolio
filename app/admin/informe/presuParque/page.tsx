import React from 'react';
import { ConstantsProvider } from '../contexts/ConstantsContext';


import PresupFierros from '../components/presupFierros';
const App = () => {
    return (
        <ConstantsProvider>
        <PresupFierros />
        </ConstantsProvider>
    );
};

export default App;
