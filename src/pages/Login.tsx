import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser, clearError } from '../store/authSlice';
import { RootState } from '../store';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: { username: string; password: string }) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
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
              <label htmlFor="password" className="block mb-1">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded"
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
            </div>
            {error && <p className="text-red-500">{error.message}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
      </p>
    </div>
  );
};

export default Login;