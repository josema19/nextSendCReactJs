// Importar Librerías
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    OCULTAR_ALERTA,
    CERRAR_SESION,
} from '../../types';

// Exportar Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload
            };
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true
            };
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            };
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje: null
            };
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null,
                token: null,
                autenticado: null
            };
        default:
            return state;
    };
};

export default authReducer;