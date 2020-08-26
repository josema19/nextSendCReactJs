// Importar Librerías
import React, { useCallback, useContext } from 'react';
import AppContext from '../context/app/appContext';
import AuthContext from '../context/auth/authContext';
import { useDropzone } from 'react-dropzone';
import Formulario from './Formulario';

const Dropzone = () => {
    // Definir Context
    const appContext = useContext(AppContext);
    const { mostrarAlerta, cargando, subirArchivo, crearEnlace } = appContext;

    const authContext = useContext(AuthContext);
    const { autenticado } = authContext;

    // Definir Funciones
    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir el archivo porque el tamaño máximo permitido es de 1MB. Obtén una cuenta para subir archivos más grandes');
    };

    const onDropAccepted = useCallback(acceptedFiles => {
        // Definir Form-Data
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);

        // Llamar función del State
        subirArchivo(formData, acceptedFiles[0]['path']);
    }, []);

    // Extraer contenido de dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxSize: 1000000
    });

    // Definir pieza del render
    const archivos = acceptedFiles.map(archivo => (
        <li
            key={archivo.lastModified}
            className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
        >
            <p className="text-xl font-bold">{archivo.path}</p>
            <p className="text-sm text-gray-500 text-center">{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ))

    // Renderizar
    return (
        <div
            className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center
            border-dashed border-gray-400 border-2 bg-gray-100 px-4"
        >
            {acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>
                    {
                        autenticado ? <Formulario /> : null
                    }
                    {cargando ? (
                        <p className="my-10 text-center text-gray-600">Subiendo archivo...</p>
                    ) : (
                            <button
                                type="button"
                                className="bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800"
                                onClick={() => crearEnlace()}
                            >
                                Crear Enlace
                            </button>
                        )
                    }
                </div>
            ) : (
                    <div {...getRootProps({ className: "dropzone w-full py-32" })}>
                        <input className="h-100" {...getInputProps()} />
                        {isDragActive ? (
                            <p className="text-2xl text-center text-gray-600">Suelta el archivo</p>
                        ) : (
                                <div className="text-center">
                                    <p className="text-2xl text-center text-gray-600">
                                        Selecciona un archivo y arrástralo aquí
                                    </p>
                                    <button
                                        type="button"
                                        className="bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800"
                                    >
                                        Seleccionar archivos para subir
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )}
        </div>
    );
}

export default Dropzone;