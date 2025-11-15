"use client";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">👥 Logged-In Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Photo</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">IP</th>
              <th className="px-4 py-3 text-left font-semibold">Login Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={u.photo}
                    alt={u.name}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-gray-700">{u.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.ip}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(u.loginTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
