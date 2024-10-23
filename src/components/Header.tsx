import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AlertTriangle } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { RootState } from '../store';
import { logout } from '../store/authSlice';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <AlertTriangle size={24} />
          <span className="text-xl font-bold">
            <FormattedMessage id="app.title" />
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-green-200">
              <FormattedMessage id="nav.home" />
            </Link></li>
            <li><Link to="/dashboard" className="hover:text-green-200">
              <FormattedMessage id="nav.viewIssues" />
            </Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/report" className="hover:text-green-200">
                  <FormattedMessage id="nav.reportIssue" />
                </Link></li>
                <li><button onClick={handleLogout} className="hover:text-green-200">
                  <FormattedMessage id="nav.logout" />
                </button></li>
              </>
            ) : (
              <li><Link to="/login" className="hover:text-green-200">
                <FormattedMessage id="nav.login" />
              </Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};