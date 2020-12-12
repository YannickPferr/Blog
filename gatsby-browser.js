// gatsby-browser.js
import React from 'react';
import { ToastProvider } from 'react-toast-notifications'

export const wrapRootElement = ({ element }) => {
    return (
        <ToastProvider
            autoDismiss
            autoDismissTimeout={3000}
            placement="top-center">
            { element}
        </ToastProvider >
    );
}