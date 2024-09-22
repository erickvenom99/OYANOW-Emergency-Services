import { Link } from 'react-router-dom';

interface Location {
  coordinates: [number, number]; // Assuming this is the structure
}

interface Provider {
  _id: string;
  name: string;
  location: Location;
}

interface ProvidersListProps {
  providers: Provider[];
  userCoordinates: [number, number];
  uniqueUsername: string; 
  onSelectProvider: (providerId: string) => void; 
}

const ProvidersList: React.FC<ProvidersListProps> = ({ providers, userCoordinates, uniqueUsername, onSelectProvider }) => {
  const calculateDistance = (coordinates: [number, number]) => {
    const [providerLongitude, providerLatitude] = coordinates;
    const userLat = userCoordinates[1];
    const userLng = userCoordinates[0];

    // Haversine formula to calculate distance
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (providerLatitude - userLat) * (Math.PI / 180);
    const dLng = (providerLongitude - userLng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(userLat * (Math.PI / 180)) * Math.cos(providerLatitude * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };
  return (
    <div className="mt-2 bg-white rounded shadow-md p-2">
      <h3 className="text-xl font-semibold mb-2">Available Providers:</h3>
      <ul>
        {providers.map((provider) => {
         console.log(provider.location.coordinates); // Log the coordinates
        return (
          <li key={provider._id} className="border-b py-2 flex justify-between">
            <Link to='#' className="text-blue-500 hover:underline" onClick={() => onSelectProvider(provider._id)}>
              {provider.name} - {calculateDistance(provider.location.coordinates).toFixed(2)} km
            </Link>
          </li>
        );
        })}
      </ul>
    </div>
  );
};

export default ProvidersList;