import { useState } from "react";
import { X } from "lucide-react";
const adminsData = [
  {
    id: "ADM001",
    name: "Yogesh Patil",
    email: "yogesh@unipay.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "21 Sep 2026, 10:32 AM",
  },
  {
    id: "ADM002",
    name: "Ananya Sharma",
    email: "ananya@unipay.com",
    role: "Payment Manager",
    status: "Active",
    lastLogin: "21 Sep 2026, 09:15 AM",
  },
  {
    id: "ADM003",
    name: "Rohan Mehta",
    email: "rohan@unipay.com",
    role: "Support Admin",
    status: "Active",
    lastLogin: "20 Sep 2026, 06:42 PM",
  },
  {
    id: "ADM004",
    name: "Sneha Joshi",
    email: "sneha@unipay.com",
    role: "Finance Admin",
    status: "Inactive",
    lastLogin: "18 Sep 2026, 04:20 PM",
  },
];

function Admins() {
  const [search, setSearch] = useState("");
const [selectedAdmin, setSelectedAdmin] = useState(null);
  const filteredAdmins = adminsData.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase()) ||
      admin.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage UniPay administrators and system access.
          </p>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold">
          + Add Admin
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Total Admins
          </p>

          <h2 className="text-3xl font-bold mt-2">
            4
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Active
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            3
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Inactive
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            1
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Roles
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            4
          </h2>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">

        <input
          type="text"
          placeholder="Search admin by name, email or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* Admin Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>
              <th className="p-4 text-left">Admin</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Last Login</th>
              <th className="p-4 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredAdmins.map((admin) => (

              <tr
                key={admin.id}
                className="border-t hover:bg-slate-50"
              >

                {/* Admin */}
                <td className="p-4">

                  <p className="font-semibold">
                    {admin.name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {admin.email}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {admin.id}
                  </p>

                </td>

                {/* Role */}
                <td className="p-4">

                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                    {admin.role}
                  </span>

                </td>

                {/* Status */}
                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      admin.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {admin.status}
                  </span>

                </td>

                {/* Last Login */}
                <td className="p-4 text-sm text-slate-500">
                  {admin.lastLogin}
                </td>

                {/* Action */}
                <td className="p-4">

                  <button
  onClick={() => setSelectedAdmin(admin)}
  className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
>
  Manage
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

{selectedAdmin && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

      {/* Popup Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Admin Details
          </h2>
          <p className="text-sm text-slate-400">
            {selectedAdmin.id}
          </p>
        </div>

        <button
          onClick={() => setSelectedAdmin(null)}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Admin Information */}
      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-400">Name</p>
          <p className="font-semibold text-slate-800">
            {selectedAdmin.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Email</p>
          <p className="font-semibold text-slate-800">
            {selectedAdmin.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">Role</p>
          <span className="inline-block mt-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
            {selectedAdmin.role}
          </span>
        </div>

        <div>
          <p className="text-sm text-slate-400">Status</p>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
              selectedAdmin.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {selectedAdmin.status}
          </span>
        </div>

        <div>
          <p className="text-sm text-slate-400">Last Login</p>
          <p className="font-semibold text-slate-800">
            {selectedAdmin.lastLogin}
          </p>
        </div>

      </div>

      {/* Close Button */}
      <button
        onClick={() => setSelectedAdmin(null)}
        className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
    
  );
}

export default Admins;