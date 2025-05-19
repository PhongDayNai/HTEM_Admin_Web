"use client"

import { useEffect, useState } from "react"
import {
  Loader2,
  AlertCircle,
  Users,
  Search,
} from "lucide-react"
import "./Content.css"
import DashboardSection from "./Dashboard/DashboardSection"

const UserManagement = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    
    const loadUsers = async () => {
        try {
          setLoading(true)
          const data = await fetch("http://localhost:8080/api/users/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json())
          console.log(data)
          setUsers(data)
          setError(null)
        } catch (err) {
          setError("Failed to load users. Please try again later.")
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
      loadUsers()
    }, [])
  
    // Filter users based on search term
    const filteredUsers = users.filter(
      (user) =>
        user.FullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Phone?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  
    return (
      <div className="space-y-6">
        <DashboardSection title="Quản lý khách hàng" icon={<Users className="h-5 w-5" />}>
          {error && (
            <div className="error-alert">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}
  
          <div className="order-search-container">
            <Search className="order-search-icon h-4 w-4" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="order-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
  
          {loading ? (
            <div className="loading-container">
              <Loader2 className="h-8 w-8 loading-spinner" />
              <span className="ml-2 text-gray-600">Loading users...</span>
            </div>
          ) : (
            <>
              {filteredUsers.length === 0 ? (
                <div className="empty-state">
                  <p>No users found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto w-full">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.UserID}>
                          <td>{user.UserID}</td>
                          <td className="font-medium">{user.FullName}</td>
                          <td>
                            <div className="flex items-center">
                              <div className="h-4 w-4 mr-2 text-gray-500" />
                              {user.Phone || "N/A"}
                            </div>
                          </td>
                          <td>
                            <div className="flex space-x-2">
                              <button className="p-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </DashboardSection>
      </div>
    )
}

export default UserManagement;
