// Importar Librerías
import React, { useState, useContext } from 'react';
import Layout from '../../components/Layout';
import Alerta from '../../components/Alerta';
import clienteAxios from '../../config/axios';
import AppContext from '../../context/app/appContext';

// Definir funciones externas
export async function getServerSideProps({ params }) {
    // Aplicar Destructuración
    const { enlace } = params;

    // Obtener información de la url específica
    const res = await clienteAxios.get(`/api/enlaces/${enlace}`);

    // Devolver valor
    return {
        props: {
            enlace: res.data
        }
    }
};

export async function getServerSidePaths() {
    // Obtener todos lo enlaces
    const enlaces = await clienteAxios.get('/api/enlaces');

    // Devolver respuesta
    return {
        paths: enlaces.data.enlaces.map(enlace => ({
            params: {
                enlace: enlace.url
            }
        })),
        fallback: false
    };
};

const Enlaces = ({ enlace }) => {
    const appContext = useContext(AppContext);
    const { mostrarAlerta, mensaje_archivo } = appContext;

    // Definir State Inicial
    const [tienePassword, setTienePassword] = useState(enlace.password);
    const [password, setPassword] = useState('');

    // Definir Funciones
    const verificarPassword = async e => {
        // Aplicar prevent default
        e.preventDefault();

        // Definir datos
        const data = {
            password
        };

        // Hacer consulta a la BD
        try {
            const res = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setTienePassword(res.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        };
    };

    // Renderizar
    return (
        <Layout>
            {tienePassword ? (
                <>
                    <p className="font-bold text-gray-800 text-center my-4">
                        Este enlace está protegido por un password, colócalo a continuación
                    </p>
                    {mensaje_archivo && <Alerta />}
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                onSubmit={e => verificarPassword(e)}
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            >
                                <div className="mb-4">
                                    <label
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                                        leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Password Descarga"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white font-bold uppercase"
                                    value="Validar Password..."
                                />
                            </form>
                        </div>
                    </div>

                </>
            ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                        <div className="flex items justify-center mt-10">
                            <a
                                href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                                download
                            >Aquí</a>
                        </div>

                    </>

                )
            }
        </Layout>
    );
}

export default Enlaces;