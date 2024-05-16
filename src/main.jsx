/* eslint-disable */
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TasksContext';
import { ProfileProvider } from './context/ProfileContext';
import { Toaster } from 'sonner';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <AuthProvider>
      <TaskProvider>
        <ProfileProvider>
          <BrowserRouter>
            <Suspense>
              <Toaster />
              <App />
            </Suspense>
          </BrowserRouter>
        </ProfileProvider>
      </TaskProvider>
    </AuthProvider>
  </HelmetProvider>
);
