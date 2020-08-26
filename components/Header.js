// Importar Librerías
import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
    // Definir Router
    const router = useRouter();

    // Definir Context
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    const appContext = useContext(AppContext);
    const { limpiarState } = appContext;

    // Definir useEffect
    useEffect(() => {
        // Ejecutar función sólo si hay token
        const token = localStorage.getItem('token');
        if (token) {
            usuarioAutenticado();
        };
    }, []);

    // Definir Funciones
    const redireccionar = () => {
        router.push('/');
        limpiarState();
    };

    // Renderizar
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img
                onClick={() => redireccionar()}
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg"
            />
            <div>
                {usuario ? (
                    <div className="flex items-center ">
                        <p className="mr-2">Hola: {usuario.nombre}</p>
                        <button
                            className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
                            onClick={cerrarSesion}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                        <>
                            <Link href="/login" >
                                <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">
                                    Iniciar Sesión
                                </a>
                            </Link>
                            <Link href="/crearcuenta" >
                                <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase">
                                    Crear Cuenta
                                </a>
                            </Link>
                        </>
                    )
                }
            </div>
        </header>
    );
}

export default Header;