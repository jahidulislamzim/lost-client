import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/Authprovider.jsx";
import { useNavigate, Link } from "react-router";
import Loading from "../Components/Loading.jsx";
import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import axios from 'axios';
import {Helmet} from 'react-helmet';

const MyItems = () => {
    const { saveUser } = useContext(AuthContext);
    const [myItems, setMyItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchMyItems = async () => {
            if (!saveUser?.email) {
                setLoading(false);
                Swal.fire("Error", "Please login to view your items", "error");
                navigate("/login");
                return;
            }

            try {
                //console.log("Fetching items for email:", saveUser.email)

                const response = await axiosSecure.get(`/allItems?email=${saveUser.email}`);
                //console.log("API Response:", response.data);
                setMyItems(response.data);
            } catch (error) {
                console.error("Failed to fetch items:", error.response?.data || error.message);
                if (error.response?.status === 401) {
                    Swal.fire("Session Expired", "Please login again", "error");
                    navigate("/login");
                } else {
                    Swal.fire("Error", "Failed to fetch your items", "error");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMyItems();
    }, [saveUser?.email, navigate, axiosSecure]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!confirm.isConfirmed) return;

        try {
            //console.log("Deleting item with ID:", id);
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/items/${id}`);
            //console.log("Delete Response:", response.data);

            if (response.data.deletedCount > 0) {
                Swal.fire("Deleted!", "Your item has been deleted.", "success");
                setMyItems(myItems.filter((item) => item._id !== id));
            } else {
                Swal.fire("Not Found", "Item not found or already deleted", "info");
            }
        } catch (error) {
            console.error("Delete failed:", error.response?.data || error.message);
            if (error.response?.status === 401) {
                Swal.fire("Session Expired", "Please login again", "error");
                navigate("/login");
            } else {
                Swal.fire("Error", "Something went wrong!", "error");
            }
        }
    };

    if (loading) return <Loading />;

    return (
        <section className="max-w-6xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Helmet>
                <title>My Items</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
                Manage My Items
            </h2>

            {myItems.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-300 space-y-4">
                    <p className="text-lg">You haven't posted any item yet.</p>
                    <Link to="/addItems">
                        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200">
                            Add Item
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Thumbnail
                            </th>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Title
                            </th>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Category
                            </th>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Post Type
                            </th>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {myItems.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <td className="px-4 py-3">
                                    {item.thumbnail ? (
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title || "No Title"}
                                            className="w-12 h-12 object-cover rounded"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = "";
                                                e.target.className = "w-12 h-12 object-contain rounded p-1";
                                            }}
                                        />
                                    ) : (
                                        <span className="text-gray-500 dark:text-gray-400">No Image</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100 truncate max-w-xs">
                                    {item.title || "No Title"}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {item.category || "N/A"}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    <span
                        className={`inline-block mb-2 px-3 py-1 text-sm font SEK-semibold rounded-full ${
                            item.status === "Recovered"
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                                : item.postType === "Lost"
                                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                                    : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                        }`}
                    >
                      {item.status === "Recovered" ? "Recovered" : item.postType || "N/A"}
                    </span>
                                </td>
                                <td className="px-4 py-3 space-x-2">
                                    <Link to={`/updateItems/${item._id}`}>
                                        <button className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1 rounded-lg font-medium transition duration-200">
                                            Update
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-medium transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default MyItems;