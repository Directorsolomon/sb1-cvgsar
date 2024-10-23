import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';

// Default messages for internationalization
const messages = {
  'home.welcome': 'Welcome to NigeriaInfraWatch',
  'home.description': 'Empowering citizens to report and track infrastructure issues across Nigeria. Together, we can build a better future for our communities.',
  'issue.report': 'Report an Issue',
  'issue.view': 'View Issues'
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntlProvider messages={messages} locale="en" defaultLocale="en">
      <AuthProvider>
        <App />
      </AuthProvider>
    </IntlProvider>
  </React.StrictMode>
);