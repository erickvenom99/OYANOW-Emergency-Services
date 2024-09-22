import axios from 'axios';

const API_URL = 'http://localhost:5000/api/providers'; // Update with your backend URL

interface FetchProvidersParams {
  serviceType: string;
  coordinates: [number, number]; // Tuple for [longitude, latitude]
}

// Function to fetch providers based on service type and user's coordinates
export const fetchProviders = async ({ serviceType, coordinates }: FetchProvidersParams): Promise<any> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        service: serviceType,
        longitude: coordinates[0], // Longitude
        latitude: coordinates[1],   // Latitude
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error; // Re-throw the error for handling in the component
  }
};