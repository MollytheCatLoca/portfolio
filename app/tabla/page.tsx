import ResumenParquesSolares from '@/components/TablaResumenParques';

import { Tab } from '@nextui-org/react';

export default function Page() {
    return (
        <div style= {{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }
}>
    <h1 style={ { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' } }>
        Proyectos Solares Rawson - Todos los Escenarios
            </h1>
            < ResumenParquesSolares />
            </div>
    );
  }