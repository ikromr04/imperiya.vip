import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/auth/login-page';
import { useAppSelector } from '../hooks';
import { getAuthStatus } from '../store/auth-slice/auth-selector';
import Spinner from './ui/spinner';
import ForgotPasswordPage from '../pages/auth/forgot-password-page';
import ResetPasswordPage from '../pages/auth/reset-password-page';
import ProfilePage from '../pages/auth/profile-page/profile-page';
import UsersPage from '../pages/users-page/users-page';
import { AuthorizationStatus } from '@/const/store';
import { AppRoute } from '@/const/routes';
import UsersShowPage from '../pages/users-show-page/users-show-page';
import NotFoundPage from '@/pages/not-found-page';
import RegisterLinksPage from '@/pages/auth/register-links-page/register-links-page';
import RegisterPage from '../pages/auth/register-page/register-page';
import UsersCreatePage from '@/pages/users-create-page/users-create-page';
import LessonsPage from '@/pages/lessons-page/lessons-page';
import JournalPage from '@/pages/journal-page/journal-page';
import GradesPage from '@/pages/grades-page/grades-page';
import GradesShowPage from '@/pages/grades-show-page/grades-show-page';
import ProfileLessonsPage from '@/pages/auth/profile-page/profile-lessons-page';
import ProfileDiaryPage from '@/pages/auth/profile-page/profile-diary-page';
import DiaryPage from '@/pages/diary-page/diary-page';
import SubjectsPage from '@/pages/subjects-page';
import NationalitiesPage from '@/pages/nationalities-page';
import ProfessionsPage from '@/pages/professions-page';
import LessonsTypesPage from '@/pages/lessons-types-page';
import SuperadminRoute from './superadmin-route';
import UsersLessonsPage from '@/pages/users-show-page/users-lessons-page';
import UsersDiaryPage from '@/pages/users-show-page/users-diary-page';
import RatingDatesPage from '@/pages/rating-dates-page';

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
        <Route path={AppRoute.Auth.Register} element={<RegisterPage />} />
        <Route path={AppRoute.Auth.Profile} element={<ProfilePage />} />
        <Route path={AppRoute.Auth.Lessons} element={<ProfileLessonsPage />} />
        <Route path={AppRoute.Auth.Diary} element={<ProfileDiaryPage />} />

        <Route path={AppRoute.Lessons.Index} element={<LessonsPage />} />

        <Route path={AppRoute.Diary.Index} element={<DiaryPage />} />

        <Route path={AppRoute.Journal} element={<JournalPage />} />

        <Route path={AppRoute.Users.Index} element={<UsersPage />} />
        <Route path={AppRoute.Users.Show} element={<UsersShowPage />} />
        <Route path={AppRoute.Users.Lessons} element={<UsersLessonsPage />} />
        <Route path={AppRoute.Users.Diary} element={<UsersDiaryPage />} />

        <Route path={AppRoute.Classes.Index} element={<GradesPage />} />
        <Route path={AppRoute.Classes.Show} element={<GradesShowPage />} />

        <Route element={<SuperadminRoute />}>
          <Route path={AppRoute.Subjects.Index} element={<SubjectsPage />} />
          <Route path={AppRoute.Nationalities.Index} element={<NationalitiesPage />} />
          <Route path={AppRoute.Professions.Index} element={<ProfessionsPage />} />
          <Route path={AppRoute.Lessons.Types} element={<LessonsTypesPage />} />
          <Route path={AppRoute.Auth.RegisterLinks} element={<RegisterLinksPage />} />
          <Route path={AppRoute.Users.Create} element={<UsersCreatePage />} />
          <Route path={AppRoute.Ratings.Dates} element={<RatingDatesPage />} />
        </Route>

        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
