import { useEffect, useState, useContext } from "react";
import { FaCheckCircle, FaThLarge, FaTable } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/Authprovider.jsx";
import Loading from "../Components/Loading.jsx";
import { useNavigate } from "react-router";
import useAxiosSecure from '../Hooks/useAxiosSecure.jsx';
import {Helmet} from 'react-helmet';

const RecoveryItems = () => {
    const axiosSecure = useAxiosSecure();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { saveUser } = useContext(AuthContext);
    const [isGridLayout, setIsGridLayout] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!saveUser?.email) {
            setLoading(false);
            return;
        }

        const fetchRecoveredItems = async () => {
            setLoading(true);
            try {
                const res = await axiosSecure.get(`/recoveredItems?email=${saveUser.email}`);

                if (res.status === 200) {
                    setItems(res.data);
                } else {
                    throw new Error("Failed to fetch");
                }
            } catch (err) {
                console.error("Failed to fetch recovered items", err);
                if (err.response?.status === 401) {
                    Swal.fire("Session Expired", "Please login again", "error");
                    navigate("/login");
                } else {
                    Swal.fire("Error", "Could not fetch recovered items.", "error");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecoveredItems();
    }, [saveUser?.email, navigate, axiosSecure]);

    if (loading) return <Loading />;

    return (
        <section className="max-w-6xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Helmet>
                <title>Recovery Items</title>
            </Helmet>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center flex-grow">
                    My Recovered Items
                </h2>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsGridLayout(true)}
                        aria-label="Grid View"
                        title="Grid View"
                        className={`p-2 rounded-lg transition-colors ${
                            isGridLayout
                                ? "bg-violet-600 text-white shadow-md"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                    >
                        <FaThLarge size={24} />
                    </button>
                    <button
                        onClick={() => setIsGridLayout(false)}
                        aria-label="Table View"
                        title="Table View"
                        className={`p-2 rounded-lg transition-colors ${
                            !isGridLayout
                                ? "bg-violet-600 text-white shadow-md"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                    >
                        <FaTable size={24} />
                    </button>
                </div>
            </div>

            {items.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
                    You haven't recovered any items yet.
                </p>
            ) : isGridLayout ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-200"
                        >
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate">
                                    {item.originalItem?.title || "No Title"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-1">
                                    <span className="font-semibold">Recovered Location:</span>{" "}
                                    {item.recoveredLocation || "N/A"}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    <span className="font-semibold">Recovered Date:</span>{" "}
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                    {item.recoveredDate
                        ? new Date(item.recoveredDate).toLocaleString("en-BN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                        : "N/A"}
                  </span>
                                </p>
                                <p className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                    <FaCheckCircle /> Recovered
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Item
                            </th>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Recovered Location
                            </th>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Recovered Date
                            </th>
                            <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100 font-semibold">
                                Status
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <td className="px-4 py-3 text-gray-800 dark:text-gray-100 truncate max-w-xs">
                                    {item.originalItem?.title || "No Title"}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {item.recoveredLocation || "N/A"}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.recoveredDate
                          ? new Date(item.recoveredDate).toLocaleString("en-BN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                          })
                          : "N/A"}
                    </span>
                                </td>
                                <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                                    <FaCheckCircle /> Recovered
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

export default RecoveryItems;