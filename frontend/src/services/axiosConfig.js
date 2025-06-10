import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // URL base del backend Django
  headers: {
    'Content-Type': 'application/json',  // Asegura que todo se envíe como JSON
    'Accept': 'application/json',        // Espera respuestas en formato JSON
    'format': 'json',                    // Encabezado personalizado 'format'
  },
});

export default axiosInstance;
