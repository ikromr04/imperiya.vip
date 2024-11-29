import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AppRoute, AuthorizationStatus } from '../const';
import LoginPage from './pages/auth/login-page';
import JournalPage from './pages/journal-page';
import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/auth-slice/auth-selector';
import Spinner from './ui/spinner';
import ForgotPasswordPage from './pages/auth/forgot-password-page';
import ResetPasswordPage from './pages/auth/reset-password-page';

export default function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Unknown) return <Spinner className="m-auto w-12 h-12" />;

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path={AppRoute.Auth.Login} element={<LoginPage />} />
        {/* <Route path={AppRoute.Auth.ForgotPassword} element={<ForgotPasswordPage />} /> */}
        {/* <Route path={AppRoute.Auth.ResetPassword} element={<ResetPasswordPage />} /> */}
        {/* <Route path={AppRoute.Auth.Profile} element={<>Profile</>} /> */}

        <Route path={AppRoute.Journal} element={<JournalPage />} />

        <Route path={AppRoute.NotFound} element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}
