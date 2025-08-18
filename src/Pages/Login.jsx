import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
import {Helmet} from 'react-helmet';

const Login = () => {
    const { googleAuth, loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {

            await loginUser(email, password);
            toast.success('Logged in successfully!', { autoClose: 2000 });
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Invalid email or password', { autoClose: 2000 });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        setLoading(true);
        try {
            await googleAuth();
            toast.success('Logged in with Google successfully!', { autoClose: 2000 });
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Google login failed', { autoClose: 2000 });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen flex items-center justify-center px-4 py-12 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-md p-8 space-y-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            >
                <div className="text-center">
                    <motion.h3
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                    >
                        Welcome Back
                    </motion.h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Sign in to continue with FindMyStuff.
                    </p>
                </div>

                <form onSubmit={formLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full mt-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                id="remember-me-checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                            />
                            <label
                                htmlFor="remember-me-checkbox"
                                className="text-gray-700 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            to="/forgot-password"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
                            loading
                                ? 'bg-blue-400 dark:bg-blue-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                        }`}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </motion.button>
                </form>

                <div className="flex items-center justify-between">
                    <span className="w-1/4 border-b border-gray-300 dark:border-gray-600"></span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        or login with
                    </span>
                    <span className="w-1/4 border-b border-gray-300 dark:border-gray-600"></span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={googleLogin}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-x-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm transition-all duration-200 ${
                        loading
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_17_40)">
                            <path
                                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                                fill="#34A853"
                            />
                            <path
                                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                                fill="#FBBC04"
                            />
                            <path
                                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                                fill="#EA4335"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {loading ? 'Processing...' : 'Continue with Google'}
                </motion.button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </main>
    );
};

export default Login;