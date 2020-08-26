// Importar Librerías
import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    OCULTAR_ALERTA,
    CERRAR_SESION
} from '../../types';
import { useRouter } from 'next/router';

const authState = ({ children }) => {
    // Definir State Inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    };

    // Definir Router
    const router = useRouter();

    // Definir Reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Definir Funciones
    const registrarUsuario = async datos => {
        // Definir bandera
        let esExito = false;

        // Hacer petición y cambiar el state
        try {
            const res = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: res.data.msg
            });
            esExito = true;
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        };

        // Remover alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
            if (esExito) router.push('/login');
        }, 3000);
    };

    const iniciarSesion = async datos => {
        // Hacer petición y cambiar el state
        try {
            const res = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: res.data.token
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        };

        // Remover alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    };

    const usuarioAutenticado = async () => {
        // Obtener token y llamar a la función tokenAuth según sea el caso
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        };

        // Intentar obtener usuario desde la BD
        try {
            const res = await clienteAxios.get('/api/auth');
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: res.data.usuario
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });

            // Remover alerta
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALERTA
                });
            }, 3000);
        };
    };

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    };

    // Renderizar
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default authState;