import { useState, useRef, forwardRef } from "react";
import "/src/styles/contact.css";


function Label({ children }) {
  return (
    <label className="block text-lg font-semibold text-[#4b2e83] dark:text-[#d8caff]">
      {children}
    </label>
  );
}

const Input = forwardRef((props, ref) => {
  const { type = "text", placeholder = "", ...rest } = props;

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-lg p-4 border-white hover:border-red-500 transition-all duration-300 contacto-input"
      {...rest}
    />
  );
});

const TextArea = forwardRef((props, ref) => {
  const { rows = 4, placeholder = "", ...rest } = props;

  return (
    <textarea
      ref={ref}
      rows={rows}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-lg p-4 border border-white hover:border-red-500 transition-all duration-300 contacto-textarea"
      {...rest}
    />
  );
});

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      nombre: nameRef.current.value,
      correo: emailRef.current.value,
      asunto: messageRef.current.value,
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbxb7A8y_m21ukZAvKvAjD2J94-1fhzrfgOoEKVzbDFXSztxHwLahhlM9KDaIKoKiJ3U/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then(() => {
        alert("Mensaje enviado correctamente!");
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      })
      .catch((error) => {
        console.error(error);
        alert("Error al enviar el mensaje");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="contenido-principal">
      <div className="contacto-contenedor">
        <h2 className="contacto-titulo">Contáctame</h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-6" disabled={loading}>
            <Label>Nombre</Label>
            <Input placeholder="Tu nombre" ref={nameRef} required />

            <Label>Correo</Label>
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              ref={emailRef}
              required
            />

            <Label>Mensaje</Label>
            <TextArea
              placeholder="Tu mensaje"
              rows={6}
              ref={messageRef}
              required
            />

            <button type="submit" className="contacto-boton">
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}




















// import { useRef, useState, useMemo } from "react";

// function Label(props) {
//     return (
//         <label className="block text-sm font-medium text-gray-700">
//             {props.children}
//         </label>
//     );
// }

// function Input({props, ...rest}) {
//     return (
//         <input
//             className="mt-2 block w-full rounded-lg p-4 border border-white hover:border-purple-900 transition-all duration-300"
//             {...rest} 
//         />
//     );
// }

// function TextArea({props, ...rest}) {
//     return (
//         <textarea
//             className="mt-2 block w-full rounded-lg p-5 border border-white hover:border-purple-900 transition-all duration-300"

//             {...rest}
//         />
//     );
// }

// export default function ContactForm() {

//     const [loading, setLoading] = useState(false);

//     const nameRef = useRef(null);
//     const emailRef = useRef(null);
//     const messageRef = useRef(null);

//     const handleSubmit = async (e) => {
//         console.log("Submit clicked");
//         e.preventDefault();
//         setLoading(true);

//         setTimeout(() => {
//             setLoading(false);
//             nameRef.current.value = "";
//             emailRef.current.value = "";
//             messageRef.current.value = "";
//         }, 2000);
//     };

//     const SubmitButton = useMemo(() => {
//         return (
//             <button
//                 type="submit"
//                 className="mt-4 w-full bg-purple-950 hover:bg-purple-900 text-white py-3 rounded-lg transition font-semibold cursor-pointer disabled:bg-red-500 disabled:cursor-not-allowed disabled:text-black "
//                 onClick={handleSubmit}
//             >
//                 {loading ? "Sending...." : "Send"}
//             </button>
//         );
//     }, [loading]);

//     return (
//         <fieldset className="w-full flex flex-col gap-4" disabled={loading}>
//             <Label>Name</Label>
//             <Input placeholder="Your Name" ref={nameRef} />

//             <Label>Email</Label>
//             <Input placeholder="Your Email" ref={emailRef} />

//             <Label>Message</Label>
//             <TextArea placeholder="Your Message" rows={6} ref={messageRef} />

//             {SubmitButton}
//         </fieldset>
//     );
// }