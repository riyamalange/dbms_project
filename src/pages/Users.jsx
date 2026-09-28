import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Get users from Java backend
  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  // Search users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Users
        </h1>

        <p className="text-slate-500 mt-1">
          Manage all registered users
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-400">Total Users</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-400">Active Users</p>
          <h2 className="text-2xl font-bold text-green-600 mt-1">
            {users.filter((user) => user.status === "Active").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-400">Blocked Users</p>
          <h2 className="text-2xl font-bold text-red-600 mt-1">
            {users.filter((user) => user.status === "Blocked").length}
          </h2>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">

        <input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No users found.
          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    ID
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Phone
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>
                </tr>

              </thead>

              <tbody>

                {filteredUsers.map((user) => (

                  <tr
                    key={user.userId}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 text-sm text-slate-600">
                      USR{String(user.userId).padStart(3, "0")}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.phone || "-"}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Users;