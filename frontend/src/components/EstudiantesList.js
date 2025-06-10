import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig'; // Importamos la configuración de Axios
import EstudianteForm from './EstudianteForm'; // Importamos el formulario para agregar estudiantes

const EstudiantesList = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  // Cargar la lista de estudiantes al cargar el componente
  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axiosInstance.get('estudiantes/');
        setEstudiantes(response.data);  // Actualizamos el estado con los estudiantes
      } catch (error) {
        console.error('Error al obtener los estudiantes', error);
      }
    };

    fetchEstudiantes();
  }, []);

  // Función para eliminar un estudiante
  const deleteEstudiante = async (id) => {
    try {
      await axiosInstance.delete(`estudiantes/${id}/`);
      // Filtra el estudiante eliminado de la lista
      setEstudiantes(estudiantes.filter((est) => est.id !== id)); 
    } catch (error) {
      console.error('Error al eliminar el estudiante', error);
    }
  };

  return (
    <div>
      {/* Solo renderizamos el formulario una vez */}
     {<EstudianteForm setEstudiantes={setEstudiantes} /> }

      <h2>Lista de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Semestre</th>
            <th>Está Estudiando</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>{estudiante.edad}</td>
              <td>{estudiante.semestre}</td>
              <td>{estudiante.estudia ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => deleteEstudiante(estudiante.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudiantesList;
