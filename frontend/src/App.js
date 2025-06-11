import EstudiantesList from './components/EstudiantesList';
import MarcaAgua from './components/MarcaAgua';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-green-100 flex flex-col items-center py-10 relative">
      <Toaster position="top-center" reverseOrder={false} />
      <MarcaAgua />
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Gestión de Estudiantes
        </h1>
        <EstudiantesList />
        <div className="flex justify-center mt-8">
        </div>
      </div>
    </div>
  );
}

export default App;