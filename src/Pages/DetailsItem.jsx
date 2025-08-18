import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/Authprovider.jsx";
import Loading from "../Components/Loading.jsx";
import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import {Helmet} from 'react-helmet';

const DetailsItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { saveUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [recoveredLocation, setRecoveredLocation] = useState("");
    const [recoveredDate, setRecoveredDate] = useState(new Date());


    useEffect(() => {
    const userEmail = saveUser?.email;
    if (!userEmail) {
        setLoading(false);
        Swal.fire("Error", "Please login to view item details", "error");
        navigate("/login");
        return;
    }

    let isCancelled = false;

    const fetchItemDetails = async () => {
        try {
            console.log("Fetching item with ID:", id);
            const response = await axiosSecure.get(`/items/${id}`);
            console.log("Item Response:", response.data);
            if (!isCancelled) setItem(response.data);
        } catch (error) {
            if (!isCancelled) {
                console.error("Failed to fetch item:", error.response?.data || error.message);
                if (error.response?.status === 401) {
                    Swal.fire("Session Expired", "Please login again", "error");
                    navigate("/login");
                } else {
                    Swal.fire("Error", "Failed to fetch item details", "error");
                }
            }
        } finally {
            if (!isCancelled) setLoading(false);
        }
    };

    fetchItemDetails();

    return () => {
        isCancelled = true; // cleanup
    };
}, [id, navigate, saveUser, axiosSecure]);




    

    const clickRecovery = () => {
        if (item?.status === "Recovered") return;
        setModalOpen(true);
    };

    const submitRecovery = async () => {
        if (!recoveredLocation.trim()) {
            Swal.fire("Error", "Please enter a recovered location", "error");
            return;
        }

        const recoveredData = {
            originalItemId: item._id,
            originalItem: {
                title: item.title || "No Title",
                description: item.description || "No Description",
                category: item.category || "N/A",
                location: item.location || "N/A",
                date: item.date || new Date().toISOString(),
            },
            recoveredBy: {
                email: saveUser.email,
                name: saveUser.displayName || "Unknown",
                photoURL: saveUser.photoURL || "",
            },
            recoveredLocation,
            recoveredDate: recoveredDate.toISOString(),
            status: "Recovered",
        };

        try {
            console.log("Submitting recovery data:", recoveredData); // ডিবাগিং
            const response = await axiosSecure.post("/recoveredItems", recoveredData);
            console.log("Recovery Response:", response.data); // ডিবাগিং

            if (response.data.insertedId) {
                await axiosSecure.patch(`/items/${item._id}`, { status: "Recovered" });
                setItem((prev) => ({ ...prev, status: "Recovered" }));
                Swal.fire("Success", "Item marked as recovered!", "success");
                setModalOpen(false);
                setRecoveredLocation("");
                setRecoveredDate(new Date());
            } else {
                Swal.fire("Error", "Failed to mark item as recovered", "error");
            }
        } catch (error) {
            console.error("Recovery failed:", error.response?.data || error.message);
            if (error.response?.status === 401) {
                Swal.fire("Session Expired", "Please login again", "error");
                navigate("/login");
            } else {
                Swal.fire("Error", "Failed to submit recovery", "error");
            }
        }
    };

    if (loading) return <Loading />;
    if (!item) return <p className="text-center py-10 text-gray-600 dark:text-gray-300 text-lg">Item not found.</p>;

    return (
        <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Details Item</title>
            </Helmet>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 dark:bg-gray-700">
                        {item.thumbnail ? (
                            <img
                                src={item.thumbnail}
                                alt={item.title || "No Title"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = "";
                                    e.target.className = "w-full h-full object-contain p-4";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="p-6 flex flex-col w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                            {item.title || "No Title"}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                            <span className="font-semibold">Description:</span> {item.description || "No Description"}
                        </p>
                        <p className="text-gray-600 dark:text-groupby-300 mb-2">
                            <span className="font-semibold">Category:</span> {item.category || "N/A"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                            <span className="font-semibold">Location:</span> {item.location || "N/A"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                            <span className="font-semibold">Date & Time:</span>{" "}
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                {item.date
                    ? new Date(item.date).toLocaleString("en-BN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                    : "N/A"}
              </span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                                className={`font-semibold ${
                                    item.status === "Recovered"
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                }`}
                            >
                {item.status === "Recovered" ? "Recovered" : item.postType || "N/A"}
              </span>
                        </p>

                        {item.status !== "Recovered" && (
                            <button
                                onClick={clickRecovery}
                                className="mt-4 px-5 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition duration-200 font-medium"
                                disabled={!saveUser}
                            >
                                {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                            Recover Item
                        </h3>

                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                            Recovered Location:
                        </label>
                        <input
                            type="text"
                            value={recoveredLocation}
                            onChange={(e) => setRecoveredLocation(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-full mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            placeholder="Enter recovered location"
                            autoFocus
                        />

                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                            Recovered Date:
                        </label>
                        <DatePicker
                            selected={recoveredDate}
                            onChange={(date) => setRecoveredDate(date)}
                            className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-full mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                        />

                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
                            Recovered By:
                        </label>
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={saveUser.photoURL || "/placeholder-user.jpg"}
                                alt={saveUser.displayName || "User"}
                                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                            />
                            <div>
                                <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    {saveUser.displayName || "Unknown"}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{saveUser.email}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitRecovery}
                                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition duration-200 font-medium"
                                disabled={!recoveredLocation.trim()}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default DetailsItem;