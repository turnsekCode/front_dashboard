/* eslint-disable */
import { Suspense } from 'react';
import {Outlet, Navigate} from "react-router-dom";

import DashboardLayout from 'src/layouts/dashboard';

import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
    const {loading, isAuthenticated } = useAuth();
    if (loading) return <h1>Loading...</h1>;
    if (!loading && !isAuthenticated) return <Navigate to="/login" replace/>

  return ( <DashboardLayout>
          <Suspense>
           <Outlet />
          </Suspense>
        </DashboardLayout>)
  
}

export default ProtectedRoute