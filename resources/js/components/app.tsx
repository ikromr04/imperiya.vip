import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/auth/login-page';
import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/auth-slice/auth-selector';
import Spinner from './ui/spinner';
import ForgotPasswordPage from '../pages/auth/forgot-password-page';
import ResetPasswordPage from '../pages/auth/reset-password-page';
import ProfilePage from '../pages/auth/profile-page/profile-page';
import UsersPage from '../pages/users/users-page';
import { AuthorizationStatus } from '@/const/store';
import { AppRoute } from '@/const/routes';
import UsersShowPage from '../pages/users/users-show-page/users-show-page';
import NotFoundPage from '@/pages/not-found-page';
import RegisterLinksPage from '@/pages/auth/register-links-page/register-links-page';
import RegisterPage from '../pages/auth/register-page/register-page';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Unknown) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Spinner className="w-16 h-16" />
      </div>
    );
  }

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
        <Route path={AppRoute.Auth.Register} element={<RegisterPage />} />
        <Route path={AppRoute.Auth.RegisterLinks} element={<RegisterLinksPage />} />

        {/* <Route path={AppRoute.Journal} element={<JournalPage />} /> */}

        {/* <Route path={AppRoute.Schedules.Index} element={<SchedulesPage />} /> */}

        <Route path={AppRoute.Users.Index} element={<UsersPage />} />
        <Route path={AppRoute.Users.Show} element={<UsersShowPage />} />
        <Route path={AppRoute.Users.Create} element={<NotFoundPage />} />
        {/* <Route path={AppRoute.Users.Lessons} element={<UsersShowPage />} /> */}

        {/* <Route path={AppRoute.Classes.Index} element={<GradesPage />} /> */}
        {/* <Route path={AppRoute.Classes.Show} element={<GradesShowPage />} /> */}

        {/* <Route path={AppRoute.Lessons.Index} element={<LessonsPage />} /> */}

        {/* <Route path={AppRoute.Monitoring.Index} element={<JournalPage />} /> */}
        {/* <Route path={AppRoute.Settings.Index} element={<JournalPage />} /> */}

        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
