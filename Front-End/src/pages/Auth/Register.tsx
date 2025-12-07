import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Auth.css";
import { saveUser } from "../../utils/Auth";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
        if (user) navigate("/");
        }, [user]);

  const [form, setForm] = useState({
    username: "",
    fullname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });

  validateField(name, value);
};

const validateField = (name: string, value: string) => {
  let msg = "";

  switch (name) {
    case "username":
      if (!value.trim()) msg = "El nombre de usuario es obligatorio.";
      break;

    case "fullname":
      if (!value.trim()) msg = "Ingresa tu nombre completo.";
      break;

    case "phone":
      if (!value.trim()) msg = "El teléfono es obligatorio.";
      else if (!/^[0-9\s+-]{6,}$/.test(value)) msg = "Teléfono inválido.";
      break;

    case "email":
      if (!value.trim()) msg = "El correo es obligatorio.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = "Correo inválido.";
      break;

    case "password":
      if (value.length < 6) msg = "Mínimo 6 caracteres.";
      break;

    case "confirmPassword":
      if (value !== form.password) msg = "Las contraseñas no coinciden.";
      break;
  }

  setErrors(prev => ({ ...prev, [name]: msg }));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    const { confirmPassword, ...userData } = form;
    const res = saveUser(userData);

    if (!res.ok) {
      alert(res.msg);
      return;
    }

    alert("Cuenta creada con éxito 🎉");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#050505] to-black text-white px-4">

      <div className="
        relative w-full max-w-xl p-10 rounded-2xl 
        backdrop-blur-xl bg-white/5 border border-white/10 
        shadow-[0_0_25px_rgba(0,200,255,0.25)] 
        transition duration-300 hover:shadow-[0_0_30px_rgba(0,200,255,0.55)]
        animate-fadeIn space-y-8
      ">

        {/* Glow externo suave */}
        <div className="absolute inset-0 -z-10 blur-[90px] opacity-20 bg-cyan-400/30 rounded-2xl"></div>

        <header className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-cyan-300 tracking-wide drop-shadow-[0_0_10px_rgba(0,200,255,0.60)]">
            Crear cuenta
          </h2>
          <p className="text-gray-300 text-sm">Bienvenido a NetViTeca — tu biblioteca digital personalizada</p>
        </header>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Campo Reutilizable → Input Premium */}
          {[
            { label:"Nombre de usuario", name:"username" },
            { label:"Nombre completo", name:"fullname" },
            { label:"Teléfono",      name:"phone" },
            { label:"Correo electrónico", name:"email" }
          ].map((field) => (
            <div key={field.name} className="flex flex-col col-span-1">
              
              <label className="text-gray-200 text-sm mb-1">{field.label}</label>

              <input
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className={`
                  w-full bg-black/30 border px-4 py-3 pr-10 rounded-lg text-white outline-none
                  transition-all duration-200

                  ${errors[field.name] 
                      ? "border-red-400 shadow-[0_0_18px_rgba(255,60,60,0.55)]"                // ❌ inválido
                      : form[field.name as keyof typeof form]
                          ? "border-green-400 shadow-[0_0_18px_rgba(60,255,150,0.55)]"        // ✔ válido
                          : "border-white/20 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,200,255,0.45)]" // ◼ neutral
                  }
                `}
              />

              {errors[field.name] && (
                <span className="text-red-400 text-xs mt-1">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}

          {/* PASSWORD */}
          <div className="col-span-1 relative">
            <label className="block text-gray-200 text-sm mb-1">Contraseña</label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`
                  w-full bg-black/30 border px-4 py-3 pr-10 rounded-lg text-white outline-none
                  transition-all duration-200
                  ${errors.password 
                      ? "border-red-400 shadow-[0_0_18px_rgba(255,60,60,0.55)]" 
                      : form.password
                          ? "border-green-400 shadow-[0_0_18px_rgba(60,255,150,0.55)]"
                          : "border-white/20 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(0,200,255,0.45)]"
                  }
                `}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-cyan-300
                  transition active:scale-95
                  bg-transparent p-0 m-0
                  outline-none border-none shadow-none
                "
                style={{
                  background: "none",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirmar contraseña */}
          <div className="col-span-1 relative">
            <label className="block text-gray-200 text-sm mb-1">Confirmar contraseña</label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`
                  w-full bg-black/30 border px-4 py-3 pr-10 rounded-lg text-white outline-none
                  transition-all duration-200
                  ${errors.confirmPassword 
                    ? "border-red-400 shadow-[0_0_10px_rgba(255,50,50,0.45)]" 
                    : form.confirmPassword 
                      ? "border-green-400 shadow-[0_0_10px_rgba(50,255,150,0.45)]"
                      : "border-white/20 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,200,255,0.4)]"
                  }
                `}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-cyan-300
                  transition active:scale-95
                  bg-transparent p-0 m-0
                  outline-none border-none shadow-none
                "
                style={{
                  background: "none",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                {showConfirm ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>

            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Botón */}
          <button type="submit"
            className="
              col-span-full py-3 rounded-lg text-lg font-bold 
              bg-cyan-400 hover:bg-cyan-300 text-white 
              transition-all duration-200 shadow-[0_0_18px_rgba(0,200,255,0.4)]
              hover:shadow-[0_0_25px_rgba(0,200,255,0.7)] active:scale-95
            ">
            Crear cuenta
          </button>

          <p className="text-center col-span-full text-gray-300 text-sm">
            ¿Ya tenés cuenta?
            <Link to="/login" className="text-cyan-300 hover:text-cyan-200 underline ml-1">
              Iniciar sesión
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
