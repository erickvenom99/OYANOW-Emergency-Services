import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProvidersList from "./ProvidersList";
import { fetchProviders } from "./api";
import axios from "axios";

interface Provider {
    id: string;
    name: string;
    location: {
        coordinates: [number, number]; // [longitude, latitude]
    };
}

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // State Variables
    const [userId, setUserId] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [uniqueUsername, setUniqueUsername] = useState<string>("");
    const [userCoordinates, setUserCoordinates] = useState<[number, number]>([0, 0]);
    const [activeService, setActiveService] = useState<string | null>(null);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Effect to handle location state
    useEffect(() => {
        if (location.state) {
            const { userId, coordinates, username, uniqueUsername } = location.state;
            setUserId(userId);
            setUserCoordinates(coordinates);
            setUsername(username);
            setUniqueUsername(uniqueUsername);
        }
    }, [location.state]);

    // Effect to fetch providers when the service is selected
    const handleServiceClick = async (service: string) => {
        setActiveService((prev) => (prev === service ? null : service));
        setError(null);

        if (!userCoordinates) {
            setError("Invalid coordinates provided.");
            return;
        }

        setLoading(true);
        try {
            const providersData = await fetchProviders({ serviceType: service, coordinates: userCoordinates });
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
                    coordinates: userCoordinates,
                },
            });

            if (response.status !== 201) throw new Error("Failed to create order");

            console.log("Order created:", response.data);
            const { orderId, coordinates } = response.data;
            
            // Find the selected provider from the providers list
            const selectedProvider = providers.find(provider => provider.id === providerId);
            console.log("selectedProvider: ", selectedProvider);
            const providerCoordinates = selectedProvider?.location.coordinates; // Access the provider's coordinates

            navigate(`/orders/${orderId}/map`, { state: { userCoordinates, orderId, providerCoordinates } });
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
                                    userCoordinates={userCoordinates} 
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