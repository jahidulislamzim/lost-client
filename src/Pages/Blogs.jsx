import React, { useState } from 'react';
import {
    CalendarOutlined,
    UserOutlined,
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    ReadOutlined,
    BookOutlined,
    BulbOutlined,
    SafetyOutlined, CheckCircleOutlined
} from '@ant-design/icons';

const Blogs = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { key: 'all', label: 'All Posts', color: 'blue' },
        { key: 'tips', label: 'Tips & Tricks', color: 'green' },
        { key: 'stories', label: 'Success Stories', color: 'purple' },
        { key: 'safety', label: 'Safety Guide', color: 'pink' },
        { key: 'updates', label: 'Platform Updates', color: 'orange' }
    ];

    const blogPosts = [
        {
            id: 1,
            title: "10 Essential Tips for Finding Your Lost Items Faster",
            excerpt: "Discover proven strategies and techniques that can significantly increase your chances of recovering lost belongings quickly and efficiently.",
            category: 'tips',
            author: "Sarah Johnson",
            date: "2024-01-15",
            readTime: "5 min read",
            views: 1250,
            likes: 89,
            comments: 23,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
            tags: ['Tips', 'Recovery', 'Guide']
        },
        {
            id: 2,
            title: "Amazing Recovery: How Community Helped Reunite a Family Heirloom",
            excerpt: "Read the heartwarming story of how our Lost & Found community came together to help recover a precious family heirloom with sentimental value.",
            category: 'stories',
            author: "Mike Chen",
            date: "2024-01-12",
            readTime: "7 min read",
            views: 2100,
            likes: 156,
            comments: 45,
            image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=250&fit=crop",
            tags: ['Success Story', 'Community', 'Heirloom']
        },
        {
            id: 3,
            title: "Protecting Your Personal Information When Reporting Lost Items",
            excerpt: "Learn essential safety measures and privacy tips to protect yourself while using lost and found platforms effectively and securely.",
            category: 'safety',
            author: "Dr. Emily Rodriguez",
            date: "2024-01-10",
            readTime: "6 min read",
            views: 890,
            likes: 67,
            comments: 18,
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
            tags: ['Safety', 'Privacy', 'Security']
        },
        {
            id: 4,
            title: "New Feature Alert: Advanced Search Filters Now Available",
            excerpt: "Explore our latest platform updates including enhanced search capabilities, improved user interface, and new notification features.",
            category: 'updates',
            author: "Lost & Found Team",
            date: "2024-01-08",
            readTime: "4 min read",
            views: 1680,
            likes: 124,
            comments: 31,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
            tags: ['Update', 'Features', 'Search']
        },
        {
            id: 5,
            title: "The Psychology of Losing Things: Why We Misplace Items",
            excerpt: "Understand the common psychological and behavioral patterns behind why we lose things and how to develop better habits to prevent loss.",
            category: 'tips',
            author: "Dr. James Wilson",
            date: "2024-01-05",
            readTime: "8 min read",
            views: 1420,
            likes: 98,
            comments: 27,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
            tags: ['Psychology', 'Prevention', 'Habits']
        },
        {
            id: 6,
            title: "Student Recovers Lost Laptop Thanks to Quick Community Response",
            excerpt: "A university student's quick thinking and our community's rapid response helped recover a stolen laptop within 48 hours.",
            category: 'stories',
            author: "Jennifer Lee",
            date: "2024-01-03",
            readTime: "5 min read",
            views: 1890,
            likes: 142,
            comments: 38,
            image: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?w=400&h=250&fit=crop",
            tags: ['Success Story', 'Student', 'Technology']
        }
    ];

    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'tips': return <BulbOutlined className="text-xl" />;
            case 'stories': return <BookOutlined className="text-xl" />;
            case 'safety': return <SafetyOutlined className="text-xl" />;
            case 'updates': return <ReadOutlined className="text-xl" />;
            default: return <ReadOutlined className="text-xl" />;
        }
    };

    const getCategoryColor = (category) => {
        const colorMap = {
            tips: 'green',
            stories: 'purple',
            safety: 'pink',
            updates: 'orange',
            all: 'blue'
        };
        return colorMap[category] || 'blue';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-5">
            <div className="max-w-6xl mx-auto">

                {/* Hero Section */}
                <div className="mb-10 rounded-2xl bg-gradient-to-r from-blue-100 to-white dark:from-blue-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-10 text-center">
                    <h1 className="text-5xl font-bold mb-5 text-gray-900 dark:text-white">
                        Our Blog
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
                        Stay updated with the latest tips, success stories, and insights from our Lost & Found community.
                        Discover helpful guides, read inspiring recovery stories, and learn how to make the most of our platform.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-10 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-8">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                        Browse by Category
                    </h2>
                    <div className="flex justify-center flex-wrap gap-4">
                        {categories.map(category => (
                            <button
                                key={category.key}
                                onClick={() => setSelectedCategory(category.key)}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
                                    selectedCategory === category.key
                                        ? `bg-${category.color}-500 text-white`
                                        : `border border-${category.color}-500 text-${category.color}-500 hover:bg-${category.color}-100 dark:hover:bg-${category.color}-900`
                                }`}
                            >
                                {getCategoryIcon(category.key)}
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            <div className={`h-48 bg-gradient-to-br from-${getCategoryColor(post.category)}-500 to-${getCategoryColor(post.category)}-300 dark:from-${getCategoryColor(post.category)}-900 dark:to-${getCategoryColor(post.category)}-700 flex items-center justify-center relative`}>
                                <div className="absolute top-3 right-3 bg-white/20 dark:bg-black/20 px-2 py-1 rounded-full text-white text-sm flex items-center gap-1">
                                    {getCategoryIcon(post.category)} {categories.find(c => c.key === post.category)?.label}
                                </div>
                                <ReadOutlined className="text-5xl text-white opacity-80" />
                            </div>
                            <div className="p-6 flex-grow">
                                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
                                    {post.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="px-6 pb-6">
                                <hr className="mb-4 border-gray-200 dark:border-gray-700" />
                                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <UserOutlined />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                                            <p className="flex items-center gap-1">
                                                <CalendarOutlined /> {new Date(post.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p>{post.readTime}</p>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <EyeOutlined /> {post.views}
                                </span>
                                <span className="flex items-center gap-1">
                                    <LikeOutlined /> {post.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                    <CommentOutlined /> {post.comments}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter Subscription */}
                <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">
                                Stay Updated
                            </h2>
                            <p className="text-lg leading-relaxed mb-8 text-gray-600 dark:text-gray-300">
                                Subscribe to our newsletter to get the latest blog posts, success stories, and platform updates
                                delivered directly to your inbox.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Latest tips and tricks',
                                    'Inspiring success stories',
                                    'Important safety guides',
                                    'Platform updates and features'
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 hover:translate-x-2 transition-all duration-300 cursor-pointer"
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
                            <ReadOutlined className="text-9xl mb-5" />
                            <h3 className="text-2xl font-bold mb-4">
                                Subscribe to Our Newsletter
                            </h3>
                            <p className="text-lg opacity-95 leading-relaxed">
                                Get the latest updates directly in your inbox. Join thousands of satisfied subscribers today!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;