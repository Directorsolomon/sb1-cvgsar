import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser, clearError } from '../store/authSlice';
import { RootState } from '../store';
import { ReCaptcha } from '../components/ReCaptcha';

const registerSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  phoneNumber: Yup.string().matches(/^\d{11}$/, 'Phone number must be 11 digits').required('Phone number is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (values: { username: string; phoneNumber: string; password: string }) => {
    if (!captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }
    const resultAction = await dispatch(registerUser({ ...values, captchaToken }));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Register</h2>
      <Formik
        initialValues={{ username: '', phoneNumber: '', password: '', confirmPassword: '' }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
              <Field
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="phoneNumber" component="p" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
            </div>
            <div className="mt-4">
              <ReCaptcha
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={setCaptchaToken}
              />
            </div>
            {error && <p className="text-red-500">{error.message}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
      </p>
    </div>
  );
};

export default Register;