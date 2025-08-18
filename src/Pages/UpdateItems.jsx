import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/Authprovider.jsx";
import { useNavigate, useParams } from "react-router";
import Loading from "../Components/Loading.jsx";
import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import {Helmet} from 'react-helmet';

const UpdateItems = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { saveUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [itemData, setItemData] = useState(null);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            if (!saveUser?.email) {
                setLoading(false);
                Swal.fire("Login Required", "Please login to update this item.", "warning");
                navigate("/login");
                return;
            }

            try {
                console.log("Fetching item with ID:", id); // ডিবাগিং
                const response = await axiosSecure.get(`/items/${id}`);
                console.log("Item Response:", response.data); // ডিবাগিং
                setItemData(response.data);
                if (response.data?.date) {
                    setDate(new Date(response.data.date));
                }
            } catch (err) {
                console.error("Failed to fetch item:", err.response?.data || err.message);
                if (err.response?.status === 401) {
                    Swal.fire("Session Expired", "Please login again", "error");
                    navigate("/login");
                } else {
                    Swal.fire("Error", "Failed to fetch item data.", "error");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id, navigate, saveUser?.email, axiosSecure]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!saveUser?.email) {
            Swal.fire("Error", "You must be logged in", "error");
            navigate("/login");
            return;
        }

        const form = e.target;

        const updatedItem = {
            postType: form.postType.value,
            thumbnail: form.thumbnail.value,
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            location: form.location.value,
            date: date.toISOString(), // ISO ফরম্যাটে ডেট সংরক্ষণ
            contactName: saveUser.displayName || "Unknown",
            email: saveUser.email,
        };

        try {
            console.log("Updating item with data:", updatedItem); // ডিবাগিং
            const response = await axiosSecure.put(`/updateItems/${id}`, updatedItem);
            console.log("Update Response:", response.data); // ডিবাগিং

            if (response.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Item updated successfully!", "success");
                navigate("/myItems");
            } else {
                Swal.fire("No Changes", "No changes were made to the item.", "info");
            }
        } catch (error) {
            console.error("Failed to update item:", error.response?.data || error.message);
            if (error.response?.status === 401) {
                Swal.fire("Session Expired", "Please login again", "error");
                navigate("/login");
            } else {
                Swal.fire("Error", "Failed to update item.", "error");
            }
        }
    };

    if (loading || !itemData) return <Loading />;

    return (
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Helmet>
                <title>Update Items</title>
            </Helmet>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                    Update Lost or Found Item
                </h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Post Type
                        </label>
                        <select
                            name="postType"
                            defaultValue={itemData.postType || ""}
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            required
                        >
                            <option value="">Select</option>
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Thumbnail (Image URL)
                        </label>
                        <input
                            type="url"
                            name="thumbnail"
                            defaultValue={itemData.thumbnail || ""}
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={itemData.title || ""}
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            defaultValue={itemData.description || ""}
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            defaultValue={itemData.category || ""}
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            required
                        >
                            <option value="">Select</option>
                            <option value="Pets">Pets</option>
                            <option value="Documents">Documents</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={itemData.location || ""}
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Date Lost/Found
                        </label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Contact Name
                        </label>
                        <input
                            type="text"
                            value={saveUser.displayName || "Unknown"}
                            readOnly
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={saveUser.email || "N/A"}
                            readOnly
                            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-200 font-medium"
                        disabled={!saveUser}
                    >
                        Update Item
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateItems;