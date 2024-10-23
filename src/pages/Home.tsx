import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, BarChart2, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const intl = useIntl();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleReportIssue = () => {
    if (isAuthenticated) {
      navigate('/report');
    } else {
      navigate('/register', { state: { from: '/report' } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-24 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          <FormattedMessage id="home.welcome" defaultMessage="Welcome to NigeriaInfraWatch" />
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          <FormattedMessage 
            id="home.description" 
            defaultMessage="Empowering citizens to report and track infrastructure issues across Nigeria. Together, we can build a better future for our communities."
          />
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleReportIssue}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 flex items-center"
          >
            <AlertTriangle className="mr-2" size={20} />
            <FormattedMessage id="issue.report" defaultMessage="Report an Issue" />
          </button>
          <Link
            to="/dashboard"
            className="bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 flex items-center"
          >
            <BarChart2 className="mr-2" size={20} />
            <FormattedMessage id="issue.view" defaultMessage="View Issues" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Report Issues</h3>
              <p className="text-gray-600">Easily report infrastructure problems in your area with detailed descriptions and photos.</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-gray-600">Join forces with your community to highlight and track important infrastructure needs.</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart2 className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-gray-600">Monitor the status of reported issues and see real improvements in your community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of citizens working together to improve Nigeria's infrastructure. Your voice matters.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Link>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1,234+</div>
              <div className="text-gray-600">Issues Reported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">567+</div>
              <div className="text-gray-600">Issues Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">890+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;