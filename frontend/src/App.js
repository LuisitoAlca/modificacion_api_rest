import React from 'react';
import EstudiantesList from './components/EstudiantesList';
import EstudianteForm from './components/EstudianteForm';

function App() {
  return (
    <div>
      <h1>Gestión de Estudiantes</h1>
      <EstudiantesList />
      <button className="bg-purple-500 hover:bg-green-600 px-4 py-2 rounded">
        Botón de prueba
      </button>
    </div>
  );
}

export default App;