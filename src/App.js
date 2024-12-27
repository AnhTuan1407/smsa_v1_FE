import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminLayout from './routers/admin/AdminLayout';
import { authRouter, siteRouter } from './routers/index';
import adminRoutes from './routers/admin/admin.js';
import clientRoutes from './routers/client/client.js';
import RequiredRoleRoute from './routers/guard/RequiredRoleRoute';
import NotFound404 from './components/NotFound404.js';
import StaffLayout from './layouts/staff/StaffLayout.js';
import staffRoutes from './routers/staff/index.js';

function App() {
  return (
    <div>
      <Routes>
        {/* Site routes - these will use the Header and Footer */}
        {siteRouter.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <>
                <Header />
                <main>{route.element}</main>
                <Footer />
              </>
            }
          />
        ))}

        {/* Auth routes - these will use the Header and Footer */}
        {authRouter.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <>
                <Header />
                <main>{route.element}</main>
                <Footer />
              </>
            }
          />
        ))}

        {/* Admin routes - these will only use AdminLayout without Header/Footer */}
        <Route path="/admin" element={
          <RequiredRoleRoute requiredRole="Admin">
            <AdminLayout />
          </RequiredRoleRoute>
        }>
          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

        {/* Staff routes */}
        <Route path="/staff" element={
          <RequiredRoleRoute requiredRole="Staff">
            <StaffLayout />
          </RequiredRoleRoute>
        }>
          {staffRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>

        <Route path="/client">
          {clientRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <Header />
                  <main>{route.element}</main>
                  <Footer />
                </>
              }
            />
          ))}
        </Route>

        {/* Catch-all route for invalid paths */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
