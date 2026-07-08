// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
    const isAdmin = true; // Replace with your authentication logic
    if (isAdmin) {
        return <Component />;
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;
