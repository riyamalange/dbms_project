import { useState } from "react";

const settlementsData = [
  {
    id: "SET001",
    merchant: "FashionHub",
    gateway: "Razorpay",
    amount: 842500,
    fees: 16850,
    netAmount: 825650,
    status: "Settled",
    date: "20 Sep 2026",
  },
  {
    id: "SET002",
    merchant: "TechMart",
    gateway: "PayU",
    amount: 672800,
    fees: 13456,
    netAmount: 659344,
    status: "Settled",
    date: "19 Sep 2026",
  },
  {
    id: "SET003",
    merchant: "ShopKart",
    gateway: "Razorpay",
    amount: 1245600,
    fees: 24912,
    netAmount: 1220688,
    status: "Processing",
    date: "19 Sep 2026",
  },
  {
    id: "SET004",
    merchant: "TravelWorld",
    gateway: "Stripe",
    amount: 458900,
    fees: 9178,
    netAmount: 449722,
    status: "Pending",
    date: "18 Sep 2026",
  },
  {
    id: "SET005",
    merchant: "FoodExpress",
    gateway: "Stripe",
    amount: 326400,
    fees: 6528,
    netAmount: 319872,
    status: "Settled",
    date: "18 Sep 2026",
  },
];

function Settlements() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredSettlements = settlementsData.filter((settlement) => {
    const matchesSearch =
      settlement.id.toLowerCase().includes(search.toLowerCase()) ||
      settlement.merchant.toLowerCase().includes(search.toLowerCase()) ||
      settlement.gateway.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      settlement.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Settlements
          </h1>

          <p className="text-slate-500 mt-2">
            Track merchant payouts and settlement status across payment gateways.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Total Settlements
          </p>

          <h2 className="text-3xl font-bold mt-2">
            5
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Settled
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            3
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Processing
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            1
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-slate-500">
            Total Settlement Value
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            ₹35.46L
          </h2>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search settlement, merchant or gateway..."
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
            <option value="Settled">Settled</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
          </select>

        </div>

      </div>

      {/* Settlement Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>
              <th className="p-4 text-left">Settlement ID</th>
              <th className="p-4 text-left">Merchant</th>
              <th className="p-4 text-left">Gateway</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Fees</th>
              <th className="p-4 text-left">Net Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>

          </thead>

          <tbody>

            {filteredSettlements.map((settlement) => (

              <tr
                key={settlement.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">
                  <p className="font-semibold text-purple-600">
                    {settlement.id}
                  </p>
                </td>

                <td className="p-4 font-medium">
                  {settlement.merchant}
                </td>

                <td className="p-4">
                  {settlement.gateway}
                </td>

                <td className="p-4 font-semibold">
                  ₹{settlement.amount.toLocaleString()}
                </td>

                <td className="p-4 text-red-500">
                  ₹{settlement.fees.toLocaleString()}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  ₹{settlement.netAmount.toLocaleString()}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      settlement.status === "Settled"
                        ? "bg-green-100 text-green-700"
                        : settlement.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {settlement.status}
                  </span>

                </td>

                <td className="p-4 text-sm text-slate-500">
                  {settlement.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Settlements;