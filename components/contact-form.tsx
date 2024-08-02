export function ContactForm() {
    const customStyle = {
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)",
    };

    return (
        <div className= "flex flex-col mb-10 p-12 rounded-3xl items-center w-full max-w-4xl mx-auto" >
        <header className="w-full text-white py-4 px-4 rounded-3xl mb-4" style = { customStyle } >
            <div className="flex items-center justify-between rounded-3xl" >
                <img src="/BISLogo.svg" alt = "Bis Integraciones" className = "h-16" />
                    <h1 className="text-2xl font-bold" > BIS Integraciones </h1>
                        </div>
                        </header>
                        < div className = "flex-1 flex justify-center items-center w-full" >
                            <div className="justify-center grid grid-cols-1 md:grid-cols-2 gap-6 text-white rounded-3xl p-4 w-full" style = { customStyle } >
                                <div>
                                <h2 className="text-2xl font-bold mb-4" > Contáctenos </h2>
                                    < form >
                                    <div className="mb-4" >
                                        <label htmlFor="name" className = "block mb-1" >
                                            Nombre
                                            </label>
                                            < input
    type = "text"
    id = "name"
    className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full"
    placeholder = "Ingrese su nombre"
    style = { customStyle }
        />
        </div>
        < div className = "mb-4" >
            <label htmlFor="email" className = "block mb-1" >
                Correo electrónico
                    </label>
                    < input
    type = "email"
    id = "email"
    className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full"
    placeholder = "Ingrese su correo electrónico"
    style = { customStyle }
        />
        </div>
        < div className = "mb-4" >
            <label htmlFor="message" className = "block mb-1" >
                Mensaje
                </label>
                < textarea
    id = "message"
    className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full h-24 resize-none"
    placeholder = "Ingrese su mensaje"
    style = { customStyle }
        />
        </div>
        < button
    type = "submit"
    className = "bg-[#4a4ae2] justify-center hover:bg-[#3b3be0] text-white font-bold py-2 px-4 rounded-3xl w-full"
        >
        Enviar
        </button>
        </form>
        </div>
        < div >
        <h2 className="text-2xl font-bold mb-4" > Nuestros Datos </h2>
            < div className = "space-y-4" >
                <div>
                <h3 className="font-bold" > Dirección </h3>
                    < p > Cerrito 1054 6to, CABA, Argentina </p>
                        </div>
                        < div >
                        <h3 className="font-bold" > Correo electrónico </h3>
                            < p >
                            <a href="mailto:contacto@bisintegraciones.com" className = "text-blue-500 hover:underline" >
                                contacto@bisintegraciones.com
    </a>
        </p>
        </div>
        < div >
        <h3 className="font-bold" > Teléfono </h3>
            < p > +54(911) 5121 - 3012 </p>
                </div>
                < div >
                <h3 className="font-bold" > Sitio web </h3>
                    < p >
                    <a href="http://www.bisintegraciones.com" className = "text-blue-500 hover:underline" >
                        www.bisintegraciones.com
                        </a>
                        </p>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
    );
}