import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "../../styles/Auth.css";
import { loginUser, type User } from "../../utils/Auth";
import { AuthContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [errors, setErrors] = useState<{ user?: string, pass?: string }>({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    useEffect(() => {
        if (user) navigate("/");
        }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let temp:any = {};
        if(!usernameOrEmail.trim()) temp.user="Ingresa tu usuario o correo";
        if(!password.trim()) temp.pass="Ingresa tu contraseña";
        setErrors(temp);
        if(Object.keys(temp).length>0) return;

        const res = loginUser(usernameOrEmail,password);

        if (!res.ok) return setErrors({pass: res.msg});

        login(res.user as User);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#050505] to-black text-white px-4">

            <div className="
            relative w-full max-w-md p-10 rounded-2xl 
            backdrop-blur-xl bg-white/5 border border-white/15 
            shadow-[0_0_25px_rgba(0,200,255,0.45)] 
            transition duration-300 hover:shadow-[0_0_35px_rgba(0,200,255,0.75)]
            animate-fadeIn
            ">

            {/* Glow exterior envolvente */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-cyan-500/20 rounded-2xl"></div>

            <h2 className="text-center text-4xl font-bold text-cyan-300 tracking-wide drop-shadow-[0_0_8px_rgba(0,200,255,0.55)]">
                Iniciar sesión
            </h2>
            <p className="text-center text-gray-300 mt-2 mb-10">
                Gestioná tu biblioteca personal digital
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Usuario */}
                <div className="flex flex-col gap-1">
                <label className="text-gray-200 text-sm font-medium">Usuario o email</label>
                <input
                    className="
                    w-full bg-black/40 border border-white/20 px-4 py-3 rounded-lg
                    focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,200,255,0.45)] 
                    outline-none transition-all text-white
                    "
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e)=>setUsernameOrEmail(e.target.value)}
                    placeholder="Ingrese el email/usuario"
                />
                {errors.user && <span className="text-red-400 text-xs">{errors.user}</span>}
                </div>

                {/* Contraseña */}
                <div className="flex flex-col gap-1 relative">
                <label className="text-gray-200 text-sm font-medium">Contraseña</label>
                <input
                    className="
                    w-full bg-black/40 border border-white/20 px-4 py-3 rounded-lg
                    focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,200,255,0.45)]
                    outline-none transition-all text-white
                    "
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Ingrese la Contraseña"
                />

                <span
                    onClick={()=>setShowPass(!showPass)}
                    className="
                    absolute right-4 bottom-3.5 cursor-pointer 
                    text-gray-300 hover:text-cyan-300 transition select-none
                    "
                >
                    {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
                </span>

                {errors.pass && <span className="text-red-400 text-xs">{errors.pass}</span>}
                </div>

                {/* Botón */}
                <button
                className="
                    w-full py-3 rounded-lg font-bold text-white text-lg 
                    bg-cyan-400 hover:bg-cyan-300 active:scale-[0.97]
                    transition-all duration-200 shadow-[0_0_20px_rgba(0,200,255,0.45)]
                "
                >
                Ingresar
                </button>

                <p className="text-center text-gray-300 text-sm mt-2">
                ¿No tenés cuenta?
                <Link 
                    to="/register" 
                    className="text-cyan-300 hover:text-cyan-200 ml-1 underline underline-offset-2"
                >
                    Registrate
                </Link>
                </p>

            </form>
            </div>
        </div>
        );
}
