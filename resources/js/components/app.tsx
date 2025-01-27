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
import ProfilePage from './pages/auth/profile-page';
import NotFoundPage from './pages/not-found-page';
import UsersPage from './pages/users/users-page';
import UsersShowPage from './pages/users/users-show-page';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Unknown)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner className="w-12 h-12" />
      </div>
    );

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path={AppRoute.Auth.Login} element={<LoginPage />} />
        <Route path={AppRoute.Auth.ForgotPassword} element={<ForgotPasswordPage />} />
        <Route path={AppRoute.Auth.ResetPassword} element={<ResetPasswordPage />} />
        <Route path={AppRoute.Auth.Profile} element={<ProfilePage />} />

        <Route path={AppRoute.Journal} element={<JournalPage />} />
        <Route path={AppRoute.Users.Index} element={<UsersPage />} />
        <Route path={AppRoute.Users.Show} element={<UsersShowPage />} />
        <Route path={AppRoute.Schedule.Index} element={<JournalPage />} />
        <Route path={AppRoute.Class.Index} element={<JournalPage />} />
        <Route path={AppRoute.Monitoring.Index} element={<JournalPage />} />
        <Route path={AppRoute.Settings.Index} element={<JournalPage />} />

        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
