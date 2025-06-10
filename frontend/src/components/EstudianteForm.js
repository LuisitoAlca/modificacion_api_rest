import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
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
      edad: parseInt(edad),  // Convertimos edad a número
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

      }else{
        const response = await axiosInstance.post('estudiantes/', newEstudiante);  // Realiza el POST a la API
      console.log('Estudiante agregado:', response.data);  // Verifica la respuesta
      setEstudiantes(prevState => [...prevState, response.data]);  // Actualiza la lista de estudiantes


      }
      
      // Limpiar los campos después de enviar
      setNombre('');
      setApellido('');
      setEdad('');
      setSemestre('');
      setEstudia(true);  // Restablecer la casilla de "Está Estudiando"
    } catch (error) {
      console.error('Error al agregar estudiante', error.response || error.message);
      alert("Hubo un error al agregar el estudiante. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <h2>Agregar Estudiante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}  // Actualiza el estado de 'nombre'
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}  // Actualiza el estado de 'apellido'
            required
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}  // Actualiza el estado de 'edad'
            required
          />
        </div>
        <div>
          <label>Semestre:</label>
          <input
            type="text"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}  // Actualiza el estado de 'semestre'
            required
          />
        </div>
        <div>
          <label>Está Estudiando?</label>
          <input
            type="checkbox"
            checked={estudia}
            onChange={() => setEstudia(!estudia)}  // Cambia el valor de 'estudia' al hacer clic
          />
        </div>
        <button type="submit">{estudianteEditar ? 'Guardar cambios' : 'Agregar Estudiante'}</button>
        {estudianteEditar &&(
          <button type='button' onClick={()=> setEstudianteEditar(null)}style={{marginLeft:'10px'}}>cancelar</button>
        )}
      </form>
    </div>
  );
};

export default EstudianteForm;
