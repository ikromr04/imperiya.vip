import React, { BaseSyntheticEvent } from 'react';
import { AppRoute } from '@/const/routes';
import { Icons } from '../../icons';
import MainLogo from '../../app-logo';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '@/store/auth-slice/auth-api-actions';
import { useAppDispatch } from '@/hooks';

function SuperadminSidebar(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLinksClick = (evt: BaseSyntheticEvent) => evt.target.closest('aside').classList.remove('sidebar--shown');

  return (
    <>
      <aside
        className="sidebar fixed left-0 top-0 z-[100] flex flex-row-reverse h-screen transition-all duration-150 transform"
        onMouseEnter={(evt: BaseSyntheticEvent) => evt.currentTarget.classList.add('sidebar--shown')}
        onMouseLeave={(evt: BaseSyntheticEvent) => evt.currentTarget.classList.remove('sidebar--shown')}
      >
        <button
          className="sidebar__toggler text-gray-500 cursor-context-menu transition-all duration-150"
          type="button"
        >
          <Icons.menuArrowOpen width={10} />
        </button>

        <nav className="flex flex-col min-w-52 h-full bg-white border-r shadow">
          <MainLogo className="m-1 p-2" imgClass="h-9 w-auto" />

          <hr />

          <ul className="flex flex-col p-1 gap-1">
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Auth.Profile}
                onClick={handleLinksClick}
              >
                <Icons.accountCircle className="navlink__icon" width={16} height={16} />
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Lessons.Index}
                onClick={handleLinksClick}
              >
                <Icons.schedule className="navlink__icon" width={16} height={16} />
                Расписание
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Journal}
                onClick={handleLinksClick}
              >
                <Icons.journal className="navlink__icon" width={16} height={16} />
                Журнал
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Users.Index}
                onClick={handleLinksClick}
              >
                <Icons.users className="navlink__icon" width={16} height={16} />
                Пользователи
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Classes.Index}
                onClick={handleLinksClick}
              >
                <Icons.class className="navlink__icon" width={16} height={16} />
                Классы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Subjects.Index}
                onClick={handleLinksClick}
              >
                <Icons.subject className="navlink__icon" width={16} height={16} />
                Предметы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Nationalities.Index}
                onClick={handleLinksClick}
              >
                <Icons.nationality className="navlink__icon" width={16} height={16} />
                Национальности
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Professions.Index}
                onClick={handleLinksClick}
              >
                <Icons.professions className="navlink__icon" width={16} height={16} />
                Сфера деятельности
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Lessons.Types}
                onClick={handleLinksClick}
              >
                <Icons.types className="navlink__icon" width={16} height={16} />
                Типы экзаменов
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Auth.RegisterLinks}
                onClick={handleLinksClick}
              >
                <Icons.link className="navlink__icon" width={16} height={16} />
                Ссылки для регистрации
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Ratings.Dates}
                onClick={handleLinksClick}
              >
                <Icons.ratingDates className="navlink__icon" width={16} height={16} />
                Даты рейтингов
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Reasons.Index}
                onClick={handleLinksClick}
              >
                <Icons.reason className="navlink__icon" width={16} height={16} />
                Причины удаления
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Books.Categories}
                onClick={handleLinksClick}
              >
                <Icons.categories className="navlink__icon" width={16} height={16} />
                Категории книг
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Books.Index}
                onClick={handleLinksClick}
              >
                <Icons.books className="navlink__icon" width={16} height={16} />
                Библиотека
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Reports.Index}
                onClick={handleLinksClick}
              >
                <Icons.reports className="navlink__icon" width={16} height={16} />
                Отчеты
              </NavLink>
            </li>
          </ul>

          <hr />

          <ul className="flex flex-col p-1 gap-1">
            <li>
              <button
                className="navlink"
                type="button"
                onClick={() => dispatch(logoutAction())}
              >
                <Icons.logout className="navlink__icon" width={16} height={16} />
                Выйти
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <button
        className="sidebar-close fixed left-0 top-0 z-[90] w-screen h-screen transition-all duration-150 bg-black/10 backdrop-blur-[2px] invisible opacity-0"
        type="button"
        onClick={(evt: BaseSyntheticEvent) => evt.currentTarget.previousElementSibling.classList.remove('sidebar--shown')}
      ></button>
    </>
  );
}

export default SuperadminSidebar;
