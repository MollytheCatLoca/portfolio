import React from 'react';
import { ConstantsProvider } from '../contexts/ConstantsContext';
import InformePDF3 from '../components/InformePDF3';
const App = () => {
    return (
        <ConstantsProvider>
        <InformePDF3 />
        </ConstantsProvider>
    );
};

export default App;