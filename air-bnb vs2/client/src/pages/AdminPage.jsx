import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("0");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }


  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const startEdit = (userId, currentName, currentRole) => {
    setEditingUserId(userId);
    setNewName(currentName);
    setNewRole(currentRole.toString());
  };

  const saveEdit = async (userId) => {
    try {
      await axios.put(`/admin/update/${userId}`, {
        name: newName,
        role: parseInt(newRole),
      });
      fetchUsers();
      setEditingUserId(null);
      setNewName("");
      setNewRole("0");
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setNewName("");
    setNewRole("0");
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-10 text-center">Admin Page</h2>
      <h2 className="text-2xl font-semibold mb-10 text-center">Users Table</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-3 border">Name</th>
            <th className="py-2 px-3 border">Email</th>
            <th className="py-2 px-3 border">Role</th>
            <th className="py-2 px-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-3 border">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border p-1 w-full"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="py-2 px-3 border">{user.email}</td>
              <td className="py-2 px-3 border">
                {editingUserId === user._id ? (
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="border p-1"
                  >
                    <option value="0">User</option>
                    <option value="1">Admin</option>
                  </select>
                ) : user.role === 1 ? (
                  "Admin"
                ) : (
                  "User"
                )}
              </td>
              <td className="py-2 px-3 border space-x-2">
                {editingUserId === user._id ? (
                  <>
                    <button
                      onClick={() => saveEdit(user._id)}
                      className="primary mb-1 max-w-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="primary mb-1 max-w-xs"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="primary mb-1 max-w-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => startEdit(user._id, user.name, user.role)}
                      className="primary max-w-xs"
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
