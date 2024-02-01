import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/listaUsuarios");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="flex h-screen items-center justify-center bg-gray-90">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {RegisterErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl text-white mb-4">Registro de Usuario</h1>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="nombre"
          />
          {errors.nombre && <p className="text-red-500">Nombre es requerido</p>}
          <input
            type="email"
            {...register("correo", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="correo"
          />
          {errors.correo && <p className="text-red-500">Correo es requerido</p>}
          <input
            type="password"
            {...register("clave", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="contrasena"
          />
          {errors.clave && <p className="text-red-500">Clave es requerida</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Registrarse
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-sky-500">
            Inicia Sesion
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
