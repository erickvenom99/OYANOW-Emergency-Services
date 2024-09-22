// Notifications.tsx
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import io from 'socket.io-client';

interface Notification {
  _id: string;
  providerId: string;
  message: string;
  orderId: string;
  createdAt: Date | string;
}

const socket = io('http://localhost:5000'); // Adjust the URL as needed

const Notifications: React.FC = () => {
  const { providerId } = useOutletContext<{ providerId: string }>(); // Access providerId from Outlet context
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/notifications/${providerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        setError((error as Error).message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Listen for new order notifications
    socket.on('newOrder', (data) => {
      if (data.providerId === providerId) {
        const newNotification: Notification = {
          _id: data.orderId,
          providerId: data.providerId,
          message: data.message,
          orderId: data.orderId,
          createdAt: new Date().toISOString(),
        };

        setNotifications((prev) => [...prev, newNotification]);
      }
    });

    return () => {
      socket.off('newOrder');
    };
  }, [providerId]);

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;