'use client';
import { Info, SealCheck, Warning, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { ToastContainer, Bounce } from 'react-toastify';

const ToastProvider = () => {
    return (
        <ToastContainer position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            icon={({ type }) => {
                switch (type) {
                    case 'info':
                        return <Info size={24} className="stroke-indigo-400" />;
                    case 'error':
                        return <WarningCircle size={24} className="stroke-red-500" />;
                    case 'success':
                        return <SealCheck size={24} className="stroke-green-500" />;
                    case 'warning':
                        return <Warning size={24} className="stroke-yellow-500" />;
                    default:
                        return null;
                }
            }}

            stacked />
    )
}

export default ToastProvider