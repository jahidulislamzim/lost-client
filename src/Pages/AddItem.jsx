import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import useAxiosSecure from '../Hooks/useAxiosSecure.jsx';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import {Helmet} from 'react-helmet';

const AddItem = () => {
    const { saveUser, loading } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault()

        if (!saveUser?.email) {
            Swal.fire('Error', 'Please login to add an item', 'error');
            navigate('/login');
            return;
        }

        const formData = {
            postType: e.target.postType.value,
            thumbnail: e.target.thumbnail.value,
            title: e.target.title.value,
            description: e.target.description.value,
            category: e.target.category.value,
            location: e.target.location.value,
            date: date.toISOString(),
            contactName: saveUser?.displayName,
            email: saveUser?.email,
        };

        try {
            const res = await axiosSecure.post('/addItems', formData);

            if (res.data.insertedId) {
                Swal.fire('Success', 'Item added successfully!', 'success');
                e.target.reset();
                setDate(new Date());
            } else {
                Swal.fire('Error', 'Failed to add item.', 'error');
            }
        } catch (error) {
            console.error('Error adding item:', error);
            if (error.response?.status === 401) {
                Swal.fire('Session Expired', 'Please login again', 'error');
                navigate('/login');
            } else {
                Swal.fire('Error', 'Could not add item. Please try again.', 'error');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-10">
            <Helmet>
                <title>Add Item</title>
            </Helmet>
            <div className="max-w-2xl w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                    Add Lost or Found Item
                </h2>

                <form onSubmit={formSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Post Type
                        </label>
                        <select
                            name="postType"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Thumbnail (Image URL)
                        </label>
                        <input
                            type="url"
                            name="thumbnail"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Pets">Pets</option>
                            <option value="Documents">Documents</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date Lost/Found
                        </label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contact Name
                        </label>
                        <input
                            type="text"
                            value={saveUser?.displayName || 'Loading...'}
                            readOnly
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-200 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={saveUser?.email || 'Loading...'}
                            readOnly
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-200 cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition ${
                            loading
                                ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
                                : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600'
                        }`}
                    >
                        {loading ? 'Submitting...' : 'Add Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;