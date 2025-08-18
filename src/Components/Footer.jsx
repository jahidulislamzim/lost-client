import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState('');

    const newsletterForm = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter a valid email address');
            return;
        }
        toast.success(`Subscribed with ${email}!`);
        setEmail('');
    };

    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-gradient-to-b from-gray-700 to-gray-900 dark:from-gray-950 dark:to-gray-900 text-gray-200"
        >
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-center md:text-left"
                    >
                        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                            FindMyStuff
                        </h3>
                        <p className="mt-3 text-gray-400 dark:text-gray-300 text-sm leading-relaxed">
                            Your trusted platform to report lost and found items, helping reunite
                            people with their cherished belongings.
                        </p>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                            © {new Date().getFullYear()} FindMyStuff. All rights reserved.
                        </p>
                    </motion.div>


                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {[
                                { to: '/about', label: 'About Us' },
                                { to: '/contact', label: 'Contact' },
                                { to: '/privacy', label: 'Privacy Policy' },
                                { to: '/terms', label: 'Terms of Service' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                                        aria-label={link.label}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold text-white dark:text-gray-100 mb-4">
                            Stay Updated
                        </h4>
                        <form
                            onSubmit={newsletterForm}
                            className="flex flex-col sm:flex-row justify-center md:justify-start gap-3"
                            aria-label="Newsletter Subscription"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 w-full sm:w-64 transition-colors duration-200"
                                aria-label="Email for newsletter"
                            />
                            <motion.button
                                whileHover={{ scale: 1 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg text-white font-semibold shadow-md transition-all duration-300"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 flex justify-center gap-6">
                    {[
                        { Icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
                        { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
                        { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
                        { Icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                    ].map(({ Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, rotate: 2 }}
                            className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                            aria-label={label}
                        >
                            <Icon className="w-6 h-6" />
                        </motion.a>
                    ))}
                </div>

                <div className="mt-10 border-t border-gray-700 pt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Designed with Shanto by the FindMyStuff Team
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;