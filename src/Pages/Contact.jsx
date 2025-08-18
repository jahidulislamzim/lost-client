import React, { useState } from 'react';
import {
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    SendOutlined,
    UserOutlined,
    MessageOutlined,
    GlobalOutlined
} from '@ant-design/icons';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(false);

    const contactInfo = [
        {
            icon: <MailOutlined className="text-2xl text-blue-500" />,
            title: 'Email Us',
            description: 'Send us an email anytime',
            details: 'support@lostandfound.com'
        },
        {
            icon: <PhoneOutlined className="text-2xl text-green-500" />,
            title: 'Call Us',
            description: 'Available 24/7 for urgent matters',
            details: '+880 1234-567890'
        },
        {
            icon: <EnvironmentOutlined className="text-2xl text-purple-500" />,
            title: 'Visit Us',
            description: 'Come to our office',
            details: 'Dhaka, Bangladesh'
        },
        {
            icon: <ClockCircleOutlined className="text-2xl text-pink-500" />,
            title: 'Working Hours',
            description: 'We are here to help',
            details: 'Mon - Fri: 9AM - 6PM'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !subject || !messageText) {
            alert('Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('Your message has been sent successfully! We will get back to you soon.');
            setName('');
            setEmail('');
            setSubject('');
            setMessageText('');
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-5">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-100 to-white dark:from-blue-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-10 text-center">
                    <h1 className="text-5xl font-bold mb-5 text-gray-900 dark:text-white">
                        Contact Us
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
                        Have questions about our Lost & Found platform? Need help finding your lost items?
                        We're here to help! Get in touch with us through any of the methods below, and our team will respond as quickly as possible.
                    </p>
                </div>

                {/* Contact Info Section */}
                <div className="mb-10 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-8">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                        Get In Touch
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="p-6 text-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="mb-4">
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    {info.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {info.description}
                                </p>
                                <p className="text-blue-500 font-semibold">
                                    {info.details}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-8">
                        <h2 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">
                            Send Us a Message
                        </h2>
                        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                            Fill out the form below and we'll get back to you as soon as possible.
                            We typically respond within 24 hours.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <div className="relative">
                                    <UserOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <div className="relative">
                                    <MailOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                                <div className="relative">
                                    <MessageOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="What is this about?"
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Tell us how we can help you..."
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
                            >
                                {loading ? 'Sending...' : <>Send Message <SendOutlined className="ml-2" /></>}
                            </button>
                        </form>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-8">
                        <h2 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">
                            Why Contact Us?
                        </h2>
                        <div className="space-y-6 mb-10">
                            <div>
                                <h4 className="text-xl font-semibold text-blue-500 mb-2">Quick Support</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Our dedicated support team is ready to help you with any questions or issues
                                    you might have with our platform.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-green-500 mb-2">Technical Help</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Having trouble using our features? We provide technical assistance to ensure
                                    you can make the most of our Lost & Found platform.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-purple-500 mb-2">Feedback & Suggestions</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We value your feedback! Share your ideas and suggestions to help us improve
                                    our platform and better serve the community.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-pink-500 mb-2">Partnership Opportunities</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Interested in partnering with us? Contact us to explore collaboration
                                    opportunities and help expand our reach.
                                </p>
                            </div>
                        </div>
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
                            <GlobalOutlined className="text-6xl mb-4" />
                            <h3 className="text-2xl font-bold mb-3">
                                Join Our Community
                            </h3>
                            <p className="text-lg opacity-95">
                                Connect with us on social media and stay updated with the latest news and features.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;