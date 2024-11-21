import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AppRoute, AuthorizationStatus } from '../const';
import LoginPage from './pages/auth/login-page';
import JournalPage from './pages/journal-page';
import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/auth-slice/auth-selector';
import Spinner from './ui/spinner';

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
        <Route path={AppRoute.Journal} element={<JournalPage />} />

        <Route path={AppRoute.Auth.Login} element={<LoginPage />} />

        <Route path={AppRoute.NotFound} element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
}
