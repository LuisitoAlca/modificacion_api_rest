import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import { toast } from 'react-hot-toast';

const EstudianteForm = ({ setEstudiantes, estudianteEditar, setEstudianteEditar, estudiantes }) => {  
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [semestre, setSemestre] = useState('');
  const [estudia, setEstudia] = useState(true);  

  useEffect(()=>{
    if (estudianteEditar){
      setNombre(estudianteEditar.nombre);
      setApellido(estudianteEditar.apellido);
      setEdad(estudianteEditar.edad);
      setSemestre(estudianteEditar.semestre);
      setEstudia(estudianteEditar.estudia);
    } else{
      setNombre('');
      setApellido('');
      setEdad('');
      setSemestre('');
      setEstudia(true);
    }
  }, [estudianteEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();  

    const newEstudiante = {
      nombre,
      apellido,
      edad: parseInt(edad),
      semestre,
      estudia,
    };

    try {
      if(estudianteEditar){
        const response=await axiosInstance.put(`estudiantes/${estudianteEditar.id}/`,newEstudiante);
        setEstudiantes(estudiantes.map (est =>
          est.id === estudianteEditar.id ? response.data : est
        ));
        setEstudianteEditar(null);
        toast.success('Estudiante Actualizado');
      }else{
        const response = await axiosInstance.post('estudiantes/', newEstudiante);
        setEstudiantes(prevState => [...prevState, response.data]);
        toast.success('Estudiante Registrado');
      }
      setNombre('');
      setApellido('');
      setEdad('');
      setSemestre('');
      setEstudia(true);
    } catch (error) {
      console.error('Error al agregar estudiante', error.response || error.message);
      toast.error("Hubo un error al agregar el estudiante. Intenta nuevamente.");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
        {estudianteEditar ? 'Editar Estudiante' : 'Agregar Estudiante'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semestre:</label>
          <input
            type="text"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className="flex items-center col-span-1 md:col-span-2 mt-2">
          <input
            type="checkbox"
            checked={estudia}
            onChange={() => setEstudia(!estudia)}
            className="mr-2 accent-purple-500"
            id="estudia"
          />
          <label htmlFor="estudia" className="text-sm font-medium text-gray-700 select-none">
            Está Estudiando
          </label>
        </div>
        <div className="col-span-1 md:col-span-2 flex gap-3 mt-2">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition-colors duration-200 font-semibold"
          >
            {estudianteEditar ? 'Guardar cambios' : 'Agregar Estudiante'}
          </button>
          {estudianteEditar && (
            <button
              type="button"
              onClick={() => setEstudianteEditar(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow transition-colors duration-200 font-semibold"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EstudianteForm;