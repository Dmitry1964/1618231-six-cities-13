import { AppRoute } from '../const';
import Logo from '../ui/logo/logo';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';

type HeaderProps = {
  isAuthorization?: boolean;
}

const Header = ({ isAuthorization }: HeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleSignOutLink = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorization &&
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>}
              <li className="header__nav-item">
                {isAuthorization ?
                  <Link onClick={handleSignOutLink} className="header__nav-link" to="#">
                    <span className="header__signout">
                      Sign out
                    </span>
                  </Link> :
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">
                      Sign in
                    </span>
                  </Link>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
