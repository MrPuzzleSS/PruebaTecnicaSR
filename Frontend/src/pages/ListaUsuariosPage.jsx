import { useState, useEffect } from 'react';
import { getUsuarios } from './../api/usuarios';

function ListaUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Llamada a la función getUsuarios para obtener la lista de usuarios
    getUsuarios()
      .then(response => {
        // Actualizar el estado con la lista de usuarios
        setUsuarios(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // El segundo parámetro [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-4">Lista de Usuarios</h1>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-black">ID</th>
            <th className="py-2 px-4 border-b text-black" >Nombre</th>
            <th className="py-2 px-4 border-b text-black">Correo Electrónico</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index)=> (
            <tr key={index} className="hover:bg-gray-100 text-black text-center">
              <td className="py-2 px-4 border-b">{usuario.id_usuario}</td>
              <td className="py-2 px-4 border-b">{usuario.nombre}</td>
              <td className="py-2 px-4 border-b">{usuario.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuariosPage;
