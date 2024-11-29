import React from 'react';
import { ConstantsProvider } from '../contexts/ConstantsContext';
import InformePDF2 from '../components/InformePDF2';
const App = () => {
    return (
        <ConstantsProvider>
        <InformePDF2 />
        </ConstantsProvider>
    );
};

export default App;
