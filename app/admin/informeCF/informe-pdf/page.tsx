import React from 'react';
import { ConstantsProvider } from '../contexts/ConstantsContext';

import InformePDF from '../components/InformePDF';
const App = () => {
    return (
        <ConstantsProvider>
        <InformePDF />
        </ConstantsProvider>
    );
};

export default App;
