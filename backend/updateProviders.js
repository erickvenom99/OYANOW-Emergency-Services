"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ServiceProvider_1 = __importDefault(require("./ServiceProvider/ServiceProvider")); // Adjust the path as necessary
const uri = "mongodb://localhost:27017/oyanow"; // Your MongoDB URI
function resetProviders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(uri);
            console.log("Connected to MongoDB");
            // Clear the providers collection
            yield ServiceProvider_1.default.deleteMany({});
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
            yield ServiceProvider_1.default.insertMany(providers);
            console.log("New providers inserted successfully.");
        }
        catch (error) {
            console.error("Error during reset:", error);
        }
        finally {
            mongoose_1.default.connection.close(); // Close the connection
        }
    });
}
// Run the reset function
resetProviders();
