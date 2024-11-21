import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AppRoute } from '../const';
import LoginPage from './pages/auth/login-page';
import HomePage from './pages/home';

export default function App(): JSX.Element {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} />

        <Route path={AppRoute.Auth.Login} element={<LoginPage />} />

        <Route path={AppRoute.NotFound} element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}
