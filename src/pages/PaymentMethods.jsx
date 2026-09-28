import { useState } from "react";

const paymentMethodsData = [
  {
    id: "PM001",
    user: "Aarav Sharma",
    type: "UPI",
    details: "aarav@upi",
    provider: "Google Pay",
    status: "Active",
    date: "20 Sep 2026",
  },
  {
    id: "PM002",
    user: "Priya Patil",
    type: "Card",
    details: "•••• 4582",
    provider: "Visa",
    status: "Active",
    date: "19 Sep 2026",
  },
  {
    id: "PM003",
    user: "Rahul Joshi",
    type: "Bank Account",
    details: "•••• 7821",
    provider: "HDFC Bank",
    status: "Active",
    date: "18 Sep 2026",
  },
  {
    id: "PM004",
    user: "Sneha Kulkarni",
    type: "Wallet",
    details: "•••• 9021",
    provider: "Paytm",
    status: "Active",
    date: "18 Sep 2026",
  },
  {
    id: "PM005",
    user: "Aditya Mehta",
    type: "Card",
    details: "•••• 3167",
    provider: "Mastercard",
    status: "Blocked",
    date: "17 Sep 2026",
  },
  {
    id: "PM006",
    user: "Neha Singh",
    type: "UPI",
    details: "neha@upi",
    provider: "PhonePe",
    status: "Active",
    date: "16 Sep 2026",
  },
];

function PaymentMethods() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredMethods = paymentMethodsData.filter((method) => {
    const matchesSearch =
      method.user.toLowerCase().includes(search.toLowerCase()) ||
      method.details.toLowerCase().includes(search.toLowerCase()) ||
      method.provider.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All" || method.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Payment Methods
          </h1>

          <p className="text-slate-500 mt-2">
            Manage user payment methods connected to UniPay.
          </p>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold">
          + Add Payment Method
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">Total Methods</p>
          <h2 className="text-3xl font-bold mt-2">6</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">Cards</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            2
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">UPI</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            2
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">Bank Accounts</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            1
          </h2>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search user, provider or payment details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Types</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
            <option value="Bank Account">Bank Account</option>
            <option value="Wallet">Wallet</option>
          </select>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Details</th>
              <th className="p-4 text-left">Provider</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Added On</th>
            </tr>
          </thead>

          <tbody>
            {filteredMethods.map((method) => (
              <tr
                key={method.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  <p className="font-semibold">{method.user}</p>
                  <p className="text-xs text-slate-400">
                    {method.id}
                  </p>
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                    {method.type}
                  </span>
                </td>

                <td className="p-4 font-medium">
                  {method.details}
                </td>

                <td className="p-4">
                  {method.provider}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      method.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {method.status}
                  </span>
                </td>

                <td className="p-4 text-sm text-slate-500">
                  {method.date}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PaymentMethods;