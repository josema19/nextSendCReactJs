// Importar Librerías
import React, { useReducer } from 'react';
import AppContext from './appContext';
import AppReducer from './appReducer';
import clienteAxios from '../../config/axios';
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
} from '../../types';

const appState = ({ children }) => {
    // Definir State Inicial
    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    };

    // Definir Reducer
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Definir Funciones
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    };

    const subirArchivo = async (formData, nombreArchivo) => {
        dispatch({
            type: SUBIR_ARCHIVO
        });

        // Intentar enviar petición al servidor
        try {
            const res = await clienteAxios.post('/api/archivos', formData);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: res.data.archivo,
                    nombre_original: nombreArchivo
                }
            });
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            });
        };
    };

    const crearEnlace = async () => {
        // Definir Objeto que será enviado al servidor
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        };

        // Intentar enviar al servidor
        try {
            const res = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: res.data.msg
            });
        } catch (error) {
            dispatch({
                type: CREAR_ENLACE_ERROR,
                payload: error.response.data.msg
            });
        };
    };

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        });
    };

    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        });
    };

    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        });
    };

    // Renderizar
    return (
        <AppContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default appState;