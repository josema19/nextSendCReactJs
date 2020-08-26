// Importar Librerías
import React, { useState, useContext } from 'react';
import AppContext from '../context/app/appContext';

const Formulario = () => {
    // Definir State Local
    const [tienePassword, setTienePassword] = useState(false);

    // Definir Context
    const appContext = useContext(AppContext);
    const { agregarPassword, agregarDescargas } = appContext;

    // Renderizar
    return (
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select
                    onChange={e => agregarDescargas(Number(e.target.value))}
                    defaultValue=""
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black px-4
                    py-3 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                >
                    <option value="" disabled>-- Seleccione --</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
                </select>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Proteger con Contraseña</label>
                    <input
                        type="checkbox"
                        onChange={() => setTienePassword(!tienePassword)}
                    />
                </div>
                {tienePassword && (
                    <input
                        type="password"
                        onChange={e => agregarPassword(e.target.value)}
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black px-4
                        py-2 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    />
                )}
            </div>
        </div>
    );
}

export default Formulario;