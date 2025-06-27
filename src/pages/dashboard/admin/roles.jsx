import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRoles } from "src/hooks/fetch.data";
import { BACKEND_API_URL, getToken } from "src/utils/helper";

export const Roles = () => {
  const [title, setTitle] = useState("");
  const { roles, loading, fetchRoles } = useRoles();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.warning("Role title is required");
      return;
    }

    try {
      const token = getToken();
      await axios.post(
        `${BACKEND_API_URL}/roles`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Role created successfully");
      setTitle("");
      fetchRoles(); // reload roles
    } catch (err) {
      toast.error("Failed to create role");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = getToken();
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      await axios.delete(`${BACKEND_API_URL}/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Role deleted");
      fetchRoles();
    } catch (err) {
      toast.error("Failed to delete role");
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    const token = getToken();
    if (!editTitle.trim()) {
      toast.warning("Title cannot be empty");
      return;
    }

    try {
      await axios.put(
        `${BACKEND_API_URL}/roles/${id}`,
        { title: editTitle },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Role updated");
      setEditingId(null);
      fetchRoles();
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-darkblue text-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Manage Roles</h1>

      {/* Role Creation Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm mb-1">
            Role Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-md border"
            placeholder="e.g. Supervisor"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow text-darkblue font-semibold px-6 py-2 rounded-md hover:bg-yellow/80 transition"
        >
          Create Role
        </button>
      </form>

      {/* Role Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">All Roles</h2>
        {loading ? (
          <p>Loading roles...</p>
        ) : (
          <table className="w-full border border-white/30 text-left">
            <thead>
              <tr className="bg-darkblue border-b border-white/20">
                <th className="px-4 py-2">Role ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.ROLEID} className="border-t border-white/10">
                  <td className="px-4 py-2">{role.ROLEID}</td>
                  <td className="px-4 py-2">
                    {editingId === role.ROLEID ? (
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="px-2 py-1 rounded border w-full"
                      />
                    ) : (
                      role.TITLE
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {editingId === role.ROLEID ? (
                      <>
                        <button
                          onClick={() => handleUpdate(role.ROLEID)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditTitle("");
                          }}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(role.ROLEID);
                            setEditTitle(role.TITLE);
                          }}
                          className="bg-yellow text-darkblue px-3 py-1 rounded hover:bg-yellow/80"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(role.ROLEID)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
