import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import EstudianteForm from './EstudianteForm';

const EstudiantesList = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteEditar, setEstudianteEditar] = useState(null);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axiosInstance.get('estudiantes/');
        setEstudiantes(response.data);
      } catch (error) {
        console.error('Error al obtener los estudiantes', error);
      }
    };

    fetchEstudiantes();
  }, []);

  const deleteEstudiante = async (id) => {
    try {
      await axiosInstance.delete(`estudiantes/${id}/`);
      setEstudiantes(estudiantes.filter((est) => est.id !== id));
    } catch (error) {
      console.error('Error al eliminar el estudiante', error);
    }
  };

  return (
    <div>
      <EstudianteForm
        setEstudiantes={setEstudiantes}
        estudianteEditar={estudianteEditar}
        setEstudianteEditar={setEstudianteEditar}
        estudiantes={estudiantes}
      />

      <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center mt-8">
        Lista de Estudiantes
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow text-sm">
          <thead>
            <tr className="bg-purple-100 text-purple-700">
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Apellido</th>
              <th className="py-2 px-4 text-left">Edad</th>
              <th className="py-2 px-4 text-left">Semestre</th>
              <th className="py-2 px-4 text-left">Está Estudiando</th>
              <th className="py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante, idx) => (
              <tr
                key={estudiante.id}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4">{estudiante.nombre}</td>
                <td className="py-2 px-4">{estudiante.apellido}</td>
                <td className="py-2 px-4">{estudiante.edad}</td>
                <td className="py-2 px-4">{estudiante.semestre}</td>
                <td className="py-2 px-4">
                  {estudiante.estudia ? (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Sí</span>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">No</span>
                  )}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => setEstudianteEditar(estudiante)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow transition-colors duration-200 font-semibold"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteEstudiante(estudiante.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition-colors duration-200 font-semibold"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {estudiantes.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-400">
                  No hay estudiantes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstudiantesList;