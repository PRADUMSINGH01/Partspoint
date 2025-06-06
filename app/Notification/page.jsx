"use client";
import { FiBell, FiCheck, FiTrash2, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
export default function NotificationsPage() {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "New message received",
      message: "You have a new message from Sarah about your recent order.",
      time: "2 hours ago",
      read: false,
      type: "message",
    },
    {
      id: 2,
      title: "Order shipped",
      message: "Your order #12345 has been shipped and will arrive soon.",
      time: "1 day ago",
      read: true,
      type: "order",
    },
    {
      id: 3,
      title: "Payment successful",
      message: "Your payment of $29.99 for Premium plan was received.",
      time: "3 days ago",
      read: true,
      type: "payment",
    },
    {
      id: 4,
      title: "Account security",
      message: "New login detected from Chrome on Windows.",
      time: "1 week ago",
      read: false,
      type: "security",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const filteredNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter((n) => !n.read);

  const markAsRead = (id) => {
    // Implement mark as read logic
  };

  const deleteNotification = (id) => {
    // Implement delete logic
  };

  return (
    <div className="min-h-screen bg-light p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">
            <FiBell className="inline mr-3" />
            Notifications
          </h1>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 rounded-md font-body text-sm ${
                activeFilter === "all"
                  ? "bg-accent text-light"
                  : "bg-white text-neutral border border-border"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("unread")}
              className={`px-3 py-1 rounded-md font-body text-sm ${
                activeFilter === "unread"
                  ? "bg-accent text-light"
                  : "bg-white text-neutral border border-border"
              }`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-neutral font-body">
              No notifications found
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filteredNotifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 ${!notification.read ? "bg-light" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            !notification.read ? "bg-accent" : "bg-transparent"
                          }`}
                        />
                        <h3 className="font-heading font-medium text-neutral">
                          {notification.title}
                        </h3>
                      </div>
                      <p className="font-body text-neutral mt-1">
                        {notification.message}
                      </p>
                      <p className="font-body text-sm text-neutral mt-2">
                        {notification.time}
                      </p>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-accent hover:text-secondary"
                          title="Mark as read"
                        >
                          <FiCheck size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-neutral hover:text-primary"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === notification.id
                              ? null
                              : notification.id
                          )
                        }
                        className="text-neutral hover:text-primary"
                      >
                        <FiChevronDown
                          size={18}
                          className={`transition-transform ${
                            expandedId === notification.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {expandedId === notification.id && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="font-body text-sm text-neutral">
                        {notification.type === "order" && (
                          <button className="text-accent hover:text-secondary font-medium">
                            Track Order
                          </button>
                        )}
                        {notification.type === "message" && (
                          <button className="text-accent hover:text-secondary font-medium">
                            View Message
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-4 flex justify-between">
          <button
            className="font-body text-accent hover:text-secondary"
            onClick={() => markAsRead("all")}
          >
            Mark all as read
          </button>
          <button
            className="font-body text-neutral hover:text-primary"
            onClick={() => deleteNotification("all")}
          >
            Clear all notifications
          </button>
        </div>
      </div>
    </div>
  );
}
