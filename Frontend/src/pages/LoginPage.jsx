import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: SigninErrors, isAuthenticated } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    const signInSuccess = await signin(data);

    if (signInSuccess) {
      return <Navigate to="/" />;
    }
  });

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {SigninErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-3xl text-white mb-4">Inicio de Sesion</h1>
        <form onSubmit={onSubmit}>
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Iniciar Sesion</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Aun no te haz registrado?{" "}
          <Link to="/register" className="text-sky-500">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
