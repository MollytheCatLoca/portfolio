
import { AdminProvider } from './scenarios/contexts/AdminProvider'
import GlobalConstantsProvider from './informe/components/GlobalConstantsProvider'
import { ConstantsProvider } from './informe/contexts/ConstantsContext'


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminProvider>
        <ConstantsProvider>
        <GlobalConstantsProvider>
        <div className= "admin-layout" >
        {/* Aquí puedes agregar elementos comunes de la interfaz de administración, como un sidebar o header */ }
        < main > { children } </main>
        </div>
        </GlobalConstantsProvider>
        </ConstantsProvider>
        </AdminProvider>
  )
}