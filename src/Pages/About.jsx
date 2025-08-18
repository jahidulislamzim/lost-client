import React from 'react';
import {
    SearchOutlined,
    SafetyOutlined,
    TeamOutlined,
    HeartOutlined,
    CheckCircleOutlined,
    UserOutlined
} from '@ant-design/icons';

const About = () => {
    const features = [
        {
            icon: <SearchOutlined className="text-2xl text-blue-500" />,
            title: 'Easy Search',
            description: 'Quickly find lost items with our advanced search and filter system.'
        },
        {
            icon: <SafetyOutlined className="text-2xl text-blue-500" />,
            title: 'Secure Platform',
            description: 'Your data is protected with secure authentication and privacy measures.'
        },
        {
            icon: <TeamOutlined className="text-2xl text-blue-500" />,
            title: 'Community Driven',
            description: 'Connect with others in your community to help reunite lost items with their owners.'
        },
        {
            icon: <HeartOutlined className="text-2xl text-blue-500" />,
            title: 'Made with Care',
            description: 'Built with love to help people reconnect with their precious belongings.'
        }
    ];

    const stats = [
        { number: '1000+', label: 'Items Reported' },
        { number: '750+', label: 'Items Recovered' },
        { number: '500+', label: 'Happy Users' },
        { number: '95%', label: 'Success Rate' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-5">
            <div className="max-w-6xl mx-auto">

                {/* Hero Section */}
                <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-100 to-white dark:from-blue-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-10 text-center">
                    <h1 className="text-5xl font-bold mb-5 text-gray-900 dark:text-white">
                        About Lost & Found
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
                        Our Lost & Found platform helps people find their lost belongings and reconnect with their precious items.
                        We believe that every lost item has a story, and we want to help those stories end happily by reuniting people with their belongings.
                    </p>
                </div>

                {/* Features Section */}
                <div className="mb-10 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-8">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                        Our Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 text-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="mb-4 p-5 bg-blue-100 dark:bg-blue-900 rounded-full inline-block">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mb-10 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-8">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                        Our Success Statistics
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="p-8 text-center rounded-2xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                <h1 className="text-5xl font-bold text-blue-500 mb-2">
                                    {stat.number}
                                </h1>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">
                                Our Mission
                            </h2>
                            <p className="text-lg leading-relaxed mb-8 text-gray-600 dark:text-gray-300">
                                Our main goal is to create a safe and effective platform where people can easily report their lost
                                items and find them with the help of others in the community.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Easy and quick item reporting',
                                    'Advanced search and filter system',
                                    'Safe and privacy protected',
                                    'Community-based assistance'
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 hover:translate-x-2 hover:opacity-90 transition-all duration-300 cursor-pointer"
                                    >
                                        <CheckCircleOutlined className="text-xl text-green-500" />
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center p-12 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer">
                            <UserOutlined className="text-9xl mb-5" />
                            <h3 className="text-2xl font-bold mb-4">
                                Join Our Community
                            </h3>
                            <p className="text-lg opacity-95 leading-relaxed">
                                Join our community today to find your lost items or help others by participating
                                in reuniting lost belongings with their owners.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;