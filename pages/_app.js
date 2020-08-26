// Importar Librerías
import React from 'react';
import AuthState from '../context/auth/authState';
import AppState from '../context/app/appState';

// Definir Función
const MyApp = ({ Component, pageProps }) => {
    // Renderizar
    return (
        <AuthState>
            <AppState>
                <Component {...pageProps} />
            </AppState>
        </AuthState>
    );
};

export default MyApp;
