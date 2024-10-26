import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  return (
    <header className="bg-green-700 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">NigeriaInfraWatch</Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-200">Home</Link>
            <Link to="/issues" className="hover:text-green-200">View Issues</Link>
            {isAuthenticated ? (
              <>
                <Link to="/report" className="hover:text-green-200">Report Issue</Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-green-200">
                    <User size={20} />
                    <span>{userName}</span>
                  </button>
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl hidden group-hover:block">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-100"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/" className="block hover:text-green-200">Home</Link>
            <Link to="/issues" className="block hover:text-green-200">View Issues</Link>
            {isAuthenticated ? (
              <>
                <Link to="/report" className="block hover:text-green-200">Report Issue</Link>
                <div className="pt-4 border-t border-green-600">
                  <div className="flex items-center space-x-2 mb-4">
                    <User size={20} />
                    <span>{userName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left hover:text-green-200"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login"
                className="block bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 text-center"
              >
                Sign in
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
