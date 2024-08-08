import "@/styles/financing.css";


export default function FinancingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className= "financing-section" >
        { children }
        </section>
  )
}