import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProvidersList from "./ProvidersList";
import { fetchProviders } from "./api";
import axios from "axios";

const UserDashboard = () => {
    const location = useLocation();

    // State Variables
    const [userId, setUserId] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [uniqueUsername, setUniqueUsername] = useState<string>("");
    const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
    const [activeService, setActiveService] = useState<string | null>(null);
    const [providers, setProviders] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Effect to handle location state
    useEffect(() => {
        if (location.state) {
            const { userId, coordinates, username, uniqueUsername } = location.state;
            setUserId(userId);
            setCoordinates(coordinates);
            setUsername(username);
            setUniqueUsername(uniqueUsername);
        }
    }, [location.state]);

    // Effect to fetch providers when the service is selected
    const handleServiceClick = async (service: string) => {
        setActiveService((prev) => (prev === service ? null : service));
        setError(null);

        if (!coordinates) {
            setError("Invalid coordinates provided.");
            return;
        }

        setLoading(true);
        try {
            const providersData = await fetchProviders({ serviceType: service, coordinates });
            setProviders(providersData);
        } catch (err) {
            setError((err as Error).message || "Failed to fetch providers. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle provider selection
    const handleSelectProvider = async (providerId: string) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/orders/create-order", {
                userId: userId,
                providerId: providerId,
                location: {
                    type: "Point",
                    coordinates: coordinates,
                },
            });

            if (response.status !== 200) throw new Error("Failed to create order");

            console.log("Order created:", response.data);
        } catch (err) {
            setError((err as Error).message || "Failed to create order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto p-3">
                <h2 className="text-2xl font-semibold mb-4">Welcome, {username}!</h2>

                {loading && <div>Loading...</div>}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {["Mechanic", "Plumber", "Electrician"].map((service) => (
                        <div key={service}>
                            <button
                                className={`p-3 rounded shadow-lg w-full hover:opacity-80 ${
                                    service === "Mechanic" ? "bg-blue-500 text-white" :
                                    service === "Plumber" ? "bg-green-500 text-white" :
                                    service === "Electrician" ? "bg-yellow-500 text-white" : ""
                                }`}
                                onClick={() => handleServiceClick(service)}
                            >
                                Request {service}
                            </button>
                            {activeService === service && (
                                <ProvidersList 
                                    providers={providers} 
                                    userCoordinates={coordinates} 
                                    uniqueUsername={uniqueUsername} 
                                    onSelectProvider={handleSelectProvider}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {error && <div className="text-red-500">{error}</div>}
            </main>
        </div>
    );
};

export default UserDashboard;