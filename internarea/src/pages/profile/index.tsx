import { selectuser } from "@/Feature/Userslice";
import { ExternalLink, Mail, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

interface User {
  name: string;
  email: string;
  photo: string;
}

const index = () => {
  const user = useSelector(selectuser);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Get auth token (adjust if stored elsewhere, e.g., in Redux as user.token)
      const token = localStorage.getItem('token');
      
      // Switch URL based on environment
      const backendURL = process.env.NODE_ENV === 'production'
        ? "https://internshala-clone-y2p2.onrender.com/api/application"
        : "http://localhost:5000/api/application";
      
      const res = await axios.get(backendURL, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined, // Fixed syntax error
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10-second timeout
      });
      
      console.log("Fetched applications for profile:", res.data); // Debug log
      setApplications(res.data);
    } catch (error: any) {
      console.error("Error fetching applications:", error);
      setError("Failed to load application stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  // Filter applications for the current user
  const userApplications = applications.filter((app: any) => {
    if (!user) return false;
    return app.user?._id === user._id || app.user?.name === user.name;
  });

  // Debug: Log statuses to check what the backend is setting
  console.log("User applications:", userApplications.map(app => ({ id: app._id, status: app.status })));

  // Calculate stats (changed "approved" to "accepted" to match your admin code)
  const activeApplications = userApplications.filter((app: any) => app.status?.toLowerCase() === "pending").length;
  const acceptedApplications = userApplications.filter((app: any) => app.status?.toLowerCase() === "accepted").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              {user?.photo ? (
                <img
                  src={user?.photo}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-8 px-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <div className="mt-2 flex items-center justify-center text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user?.email}</span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <span className="text-blue-600 font-semibold text-2xl">
                    {activeApplications}
                  </span>
                  <p className="text-blue-600 text-sm mt-1">
                    Active Applications
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <span className="text-green-600 font-semibold text-2xl">
                    {acceptedApplications}
                  </span>
                  <p className="text-green-600 text-sm mt-1">
                    Accepted Applications
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={fetchApplications}
                  className="mr-4 inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Refresh Stats
                </button>
                <Link
                  href="/userapplication"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View Applications
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
