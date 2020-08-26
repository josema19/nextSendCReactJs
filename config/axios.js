// Importar Librerías
import axios from 'axios';

// Crear Cliente Axios
const clienteAxios = axios.create({
    baseURL: process.env.backendURL
});

export default clienteAxios;