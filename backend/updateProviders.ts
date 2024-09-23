import mongoose from "mongoose";
import Provider from "./ServiceProvider/ServiceProvider"; // Adjust the path as necessary

const uri = "mongodb://127.0.0.1:27017/oyanow"; // Your MongoDB URI

async function resetProviders() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    // Clear the providers collection
    await Provider.deleteMany({});
    console.log("All providers deleted.");

    // Sample providers to insert
    const providers = [
      {
        username: 'jefunds',
        name: 'Jeffrey Funds',
        email: 'example@mail.com',
        passwordHash: '$2a$10$28T0Xl23ol4ig9ALWYT5.e2EP8wWnbgJ9htPJ8QR9L73JD07nh8w.',
        location: {
          type: "Point",
          coordinates: [-1.6501233, 37.9433486]
        },
        services: ['Mechanic'],
        status: 'available'
      },
      // Add more sample providers as needed

      {
        username: 'Trifle',
        name: 'Trifle Don',
        email: 'example1@mail.com',
        passwordHash: '$2a$10$28T0Xl23ol4ig9ALWYT5.e2EP8wWnbgJ9htPJ8QR9L73JD07nh8w.',
        location: {
          type: "Point",
          coordinates: [-1.5601233, 36.2433486]
        },
        services: ['Plumber'],
        status: 'available'
      },

      {
        username: 'Captain',
        name: 'Captain Marvel',
        email: 'example2@mail.com',
        passwordHash: '$2a$10$28T0Xl23ol4ig9ALWYT5.e2EP8wWnbgJ9htPJ8QR9L73JD07nh8w.',
        location: {
          type: "Point",
          coordinates: [-1.6501243, 36.9433476]
        },
        services: ['Mechanic'],
        status: 'available'
      },

      {
        username: 'Amora',
        name: 'Amora Winston',
        email: 'example3@gmail.com',
        passwordHash: '$2a$10$28T0Xl23ol4ig9ALWYT5.e2EP8wWnbgJ9htPJ8QR9L73JD07nh8w.',
        location: {
          type: "Point",
          coordinates: [-1.4501236, 37.9433487]
        },
        services: ['Plumber'],
        status: 'available'
      },
    ];

    // Insert new providers into the collection
    await Provider.insertMany(providers);
    console.log("New providers inserted successfully.");
  } catch (error) {
    console.error("Error during reset:", error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
}

// Run the reset function
resetProviders();