import { useState } from "react";

const gatewaysData = [
  {
    id: "GW001",
    name: "Razorpay",
    type: "Payment Gateway",
    transactions: 8450,
    revenue: 2456800,
    status: "Active",
  },
  {
    id: "GW002",
    name: "PayU",
    type: "Payment Gateway",
    transactions: 6230,
    revenue: 1874500,
    status: "Active",
  },
  {
    id: "GW003",
    name: "Stripe",
    type: "Payment Gateway",
    transactions: 4125,
    revenue: 1298700,
    status: "Active",
  },
];

function Gateways() {
  const [search, setSearch] = useState("");

  const filteredGateways = gatewaysData.filter((gateway) =>
    gateway.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Payment Gateways
          </h1>
          <p className="text-slate-500 mt-2">
            Manage connected payment gateways in UniPay.
          </p>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold">
          + Add Gateway
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">Total Gateways</p>
          <h2 className="text-3xl font-bold mt-2">3</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">Active</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">3</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">Transactions</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            18,805
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2">₹56.36L</h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">
        <input
          type="text"
          placeholder="Search payment gateway..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Gateway Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Gateway</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Transactions</th>
              <th className="p-4 text-left">Revenue</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredGateways.map((gateway) => (
              <tr
                key={gateway.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">
                  <p className="font-semibold">{gateway.name}</p>
                  <p className="text-sm text-slate-400">
                    {gateway.id}
                  </p>
                </td>

                <td className="p-4">{gateway.type}</td>

                <td className="p-4">
                  {gateway.transactions.toLocaleString()}
                </td>

                <td className="p-4 font-semibold">
                  ₹{gateway.revenue.toLocaleString()}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    {gateway.status}
                  </span>
                </td>

                <td className="p-4">
                  <button className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Gateways;