import { Link } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">Prueba Tecnica</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
          <li>
            Bienvenido {user.nombre}!
          </li>
            <li>
              <Link to="/listaUsuarios" className="text-white">
                Lista de Usuarios
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => {
                logout();
              }} className="text-white">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-white">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white">
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
