import React, { useState } from 'react';

export function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const customStyle = {
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Enviando...');
        console.log('Sending form data:', { name, email, message });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                setStatus('Mensaje enviado con éxito!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus(`Error al enviar el mensaje: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error al enviar el mensaje. Por favor, intente de nuevo.');
        }
    };

    return (
        <div className= "flex flex-col mb-10 p-4 md:p-12 rounded-3xl items-center w-full max-w-4xl mx-auto relative" >
        <header className="w-full text-white py-4 px-4 rounded-3xl mb-4" style = { customStyle } >
            <div className="flex items-center justify-between rounded-3xl" >
                <img src="/BISLogo.svg" alt = "Bis Integraciones" className = "h-12 md:h-16" />
                    <h1 className="text-xl md:text-2xl font-bold" > BIS Integraciones </h1>
                        </div>
                        </header>

                        < div className = "flex-1 flex justify-center items-center w-full" >
                            <div className="justify-center grid grid-cols-1 md:grid-cols-2 gap-6 text-white rounded-3xl p-4 w-full" style = { customStyle } >
                                <div>
                                <h2 className="text-lg md:text-2xl font-bold mb-4" > Contáctenos </h2>
                                    < form onSubmit = { handleSubmit } >
                                        <div className="mb-4" >
                                            <label htmlFor="name" className = "block mb-1 text-xs md:text-sm" >
                                                Nombre
                                                </label>
                                                < input
    type = "text"
    id = "name"
    value = { name }
    onChange = {(e) => setName(e.target.value)
}
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-xs md:text-sm"
placeholder = "Ingrese su nombre"
style = { customStyle }
required
    />
    </div>
    < div className = "mb-4" >
        <label htmlFor="email" className = "block mb-1 text-xs md:text-sm" >
            Correo electrónico
                </label>
                < input
type = "email"
id = "email"
value = { email }
onChange = {(e) => setEmail(e.target.value)}
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-xs md:text-sm"
placeholder = "Ingrese su correo electrónico"
style = { customStyle }
required
    />
    </div>
    < div className = "mb-4" >
        <label htmlFor="message" className = "block mb-1 text-xs md:text-sm" >
            Mensaje
            </label>
            < textarea
id = "message"
value = { message }
onChange = {(e) => setMessage(e.target.value)}
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full h-24 resize-none text-xs md:text-sm"
placeholder = "Ingrese su mensaje"
style = { customStyle }
required
    />
    </div>
    < button
type = "submit"
className = "bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-4 rounded-3xl w-full text-xs md:text-sm"
    >
    Enviar
    </button>
    </form>
{ status && <p className="mt-4 text-center" > { status } </p> }
</div>

    < div >
    <h2 className="text-lg md:text-2xl font-bold mb-4" > Nuestros Datos </h2>
        < div className = "space-y-4" >
            <div>
            <h3 className="font-bold text-xs md:text-sm" > Dirección </h3>
                < p className = "text-xs md:text-sm" > Cerrito 1054 6to, CABA, Argentina </p>
                    </div>
                    < div >
                    <h3 className="font-bold text-xs md:text-sm" > Correo electrónico </h3>
                        < p className = "text-xs md:text-sm" >
                            <a href="mailto:contacto@bisintegraciones.com" className = "text-blue-500 hover:underline" >
                                contacto@bisintegraciones.com
</a>
    </p>
    </div>
    < div >
    <h3 className="font-bold text-xs md:text-sm" > Teléfono </h3>
        < p className = "text-xs md:text-sm" > +54(911) 5121 - 3012 </p>
            </div>
            < div >
            <h3 className="font-bold text-xs md:text-sm" > Sitio web </h3>
                < p className = "text-xs md:text-sm" >
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