import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spinner from './ui/spinner';
import { useAppSelector } from '@/hooks';
import { getAuthStatus } from '@/store/auth-slice/auth-selector';
import { AppRoute } from '@/const/routes';
import { AuthorizationStatus } from '@/const/store';
import SuperadminRoute from './superadmin-route';
import AppLayout from './layouts/app-layout';
import { ToastContainer } from 'react-toastify';

const UsersRatingsPage = lazy(() => import('@/pages/users-show-page/users-ratings-page'));
const ProfileRatingsPage = lazy(() => import('@/pages/auth/profile-page/profile-ratings-page'));
const LoginPage = lazy(() => import('@/pages/auth/login-page'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password-page'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password-page'));
const RegisterPage = lazy(() => import('@/pages/auth/register-page/register-page'));
const ProfilePage = lazy(() => import('@/pages/auth/profile-page/profile-page'));
const ProfileLessonsPage = lazy(() => import('@/pages/auth/profile-page/profile-lessons-page'));
const ProfileDiaryPage = lazy(() => import('@/pages/auth/profile-page/profile-diary-page'));
const UsersPage = lazy(() => import('@/pages/users-page/users-page'));
const UsersShowPage = lazy(() => import('@/pages/users-show-page/users-show-page'));
const UsersLessonsPage = lazy(() => import('@/pages/users-show-page/users-lessons-page'));
const UsersDiaryPage = lazy(() => import('@/pages/users-show-page/users-diary-page'));
const UsersLeadershipPage= lazy(() => import('@/pages/users-show-page/users-leadership-page'));
const UsersCreatePage = lazy(() => import('@/pages/users-create-page/users-create-page'));
const LessonsPage = lazy(() => import('@/pages/lessons-page/lessons-page'));
const JournalPage = lazy(() => import('@/pages/journal-page/journal-page'));
const DiaryPage = lazy(() => import('@/pages/diary-page/diary-page'));
const GradesPage = lazy(() => import('@/pages/grades-page/grades-page'));
const GradesShowPage = lazy(() => import('@/pages/grades-show-page/grades-show-page'));
const SubjectsPage = lazy(() => import('@/pages/subjects-page'));
const NationalitiesPage = lazy(() => import('@/pages/nationalities-page'));
const ProfessionsPage = lazy(() => import('@/pages/professions-page'));
const LessonsTypesPage = lazy(() => import('@/pages/lessons-types-page'));
const RegisterLinksPage = lazy(() => import('@/pages/auth/register-links-page/register-links-page'));
const RatingDatesPage = lazy(() => import('@/pages/rating-dates-page'));
const ReportsPage = lazy(() => import('@/pages/reports-page'));
const ReportsGradePage = lazy(() => import('@/pages/reports-grade-page'));
const ReportsGradesPage = lazy(() => import('@/pages/reports-grades-page'));
const ReasonsPage = lazy(() => import('@/pages/reasons-page'));
const BookCategoriesPage = lazy(() => import('@/pages/books/book-categories-page'));
const BooksPage = lazy(() => import('@/pages/books/books-page/books-page'));
const LeadershipPage = lazy(() => import('@/pages/leadership-page/leadership-page'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page'));

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
      <Suspense
        fallback={
          <div className="flex w-screen h-screen justify-center items-center">
            <Spinner className="w-16 h-16" />
          </div>
        }
      >
        <Routes>
          <Route path={AppRoute.Auth.Login} element={<LoginPage />} />
          <Route path={AppRoute.Auth.ForgotPassword} element={<ForgotPasswordPage />} />
          <Route path={AppRoute.Auth.ResetPassword} element={<ResetPasswordPage />} />
          <Route path={AppRoute.Auth.Register} element={<RegisterPage />} />

          <Route element={<AppLayout />}>
            <Route path={AppRoute.Auth.Profile} element={<ProfilePage />} />
            <Route path={AppRoute.Auth.Lessons} element={<ProfileLessonsPage />} />
            <Route path={AppRoute.Auth.Diary} element={<ProfileDiaryPage />} />
            <Route path={AppRoute.Auth.Diary} element={<ProfileDiaryPage />} />
            <Route path={AppRoute.Auth.Ratings} element={<ProfileRatingsPage />} />
            <Route path={AppRoute.Auth.MyClass} element={<LeadershipPage />} />

            <Route path={AppRoute.Lessons.Index} element={<LessonsPage />} />
            <Route path={AppRoute.Journal} element={<JournalPage />} />
            <Route path={AppRoute.Diary.Index} element={<DiaryPage />} />

            <Route path={AppRoute.Users.Index} element={<UsersPage />} />
            <Route path={AppRoute.Users.Show} element={<UsersShowPage />} />
            <Route path={AppRoute.Users.Lessons} element={<UsersLessonsPage />} />
            <Route path={AppRoute.Users.Diary} element={<UsersDiaryPage />} />
            <Route path={AppRoute.Users.Ratings} element={<UsersRatingsPage />} />
            <Route path={AppRoute.Users.Leadership} element={<UsersLeadershipPage />} />

            <Route path={AppRoute.Classes.Index} element={<GradesPage />} />
            <Route path={AppRoute.Classes.Show} element={<GradesShowPage />} />

            <Route path={AppRoute.Books.Index} element={<BooksPage />} />

            <Route element={<SuperadminRoute />}>
              <Route path={AppRoute.Users.Create} element={<UsersCreatePage />} />
              <Route path={AppRoute.Subjects.Index} element={<SubjectsPage />} />
              <Route path={AppRoute.Nationalities.Index} element={<NationalitiesPage />} />
              <Route path={AppRoute.Professions.Index} element={<ProfessionsPage />} />
              <Route path={AppRoute.Lessons.Types} element={<LessonsTypesPage />} />
              <Route path={AppRoute.Auth.RegisterLinks} element={<RegisterLinksPage />} />
              <Route path={AppRoute.Ratings.Dates} element={<RatingDatesPage />} />
              <Route path={AppRoute.Reports.Index} element={<ReportsPage />} />
              <Route path={AppRoute.Reports.Grade} element={<ReportsGradePage />} />
              <Route path={AppRoute.Reports.Grades} element={<ReportsGradesPage />} />
              <Route path={AppRoute.Reasons.Index} element={<ReasonsPage />} />
              <Route path={AppRoute.Books.Categories} element={<BookCategoriesPage />} />
              <Route path={AppRoute.Leadership.Index} element={<LeadershipPage />} />
            </Route>
          </Route>

          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
