import { useState } from "react";

const refundsData = [
  {
    id: "REF001",
    transaction: "TXN10005",
    user: "Aditya Mehta",
    merchant: "TravelWorld",
    amount: 18500,
    reason: "Cancelled Order",
    status: "Completed",
    date: "19 Sep 2026",
  },
  {
    id: "REF002",
    transaction: "TXN10007",
    user: "Sneha Kulkarni",
    merchant: "ShopKart",
    amount: 2499,
    reason: "Product Return",
    status: "Processing",
    date: "19 Sep 2026",
  },
  {
    id: "REF003",
    transaction: "TXN10009",
    user: "Rahul Joshi",
    merchant: "FoodExpress",
    amount: 899,
    reason: "Order Cancelled",
    status: "Completed",
    date: "18 Sep 2026",
  },
  {
    id: "REF004",
    transaction: "TXN10012",
    user: "Priya Patil",
    merchant: "TechMart",
    amount: 5499,
    reason: "Damaged Product",
    status: "Pending",
    date: "18 Sep 2026",
  },
  {
    id: "REF005",
    transaction: "TXN10015",
    user: "Aarav Sharma",
    merchant: "FashionHub",
    amount: 1299,
    reason: "Product Return",
    status: "Failed",
    date: "17 Sep 2026",
  },
];

function Refunds() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRefunds = refundsData.filter((refund) => {
    const matchesSearch =
      refund.id.toLowerCase().includes(search.toLowerCase()) ||
      refund.transaction.toLowerCase().includes(search.toLowerCase()) ||
      refund.user.toLowerCase().includes(search.toLowerCase()) ||
      refund.merchant.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      refund.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Refunds
          </h1>

          <p className="text-slate-500 mt-2">
            Track and manage customer refunds across all merchants.
          </p>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold">
          + Create Refund
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Total Refunds
          </p>

          <h2 className="text-3xl font-bold mt-2">
            5
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Completed
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            2
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Processing
          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">
            1
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Total Refunded
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            ₹28,696
          </h2>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search refund, transaction, user or merchant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

        </div>

      </div>

      {/* Refund Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>
              <th className="p-4 text-left">Refund ID</th>
              <th className="p-4 text-left">Transaction</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Merchant</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>

          </thead>

          <tbody>

            {filteredRefunds.map((refund) => (

              <tr
                key={refund.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  <p className="font-semibold text-purple-600">
                    {refund.id}
                  </p>
                </td>

                <td className="p-4 font-medium">
                  {refund.transaction}
                </td>

                <td className="p-4">
                  {refund.user}
                </td>

                <td className="p-4">
                  {refund.merchant}
                </td>

                <td className="p-4 font-semibold">
                  ₹{refund.amount.toLocaleString()}
                </td>

                <td className="p-4">
                  {refund.reason}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      refund.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : refund.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : refund.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {refund.status}
                  </span>

                </td>

                <td className="p-4 text-sm text-slate-500">
                  {refund.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Refunds;