import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee,
  CreditCard,
  RotateCcw,
  Store,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


// -----------------------------
// PAYMENT ANALYTICS DATA
// -----------------------------

const paymentData = [
  {
    day: "Mon",
    payments: 42000,
  },
  {
    day: "Tue",
    payments: 58000,
  },
  {
    day: "Wed",
    payments: 49000,
  },
  {
    day: "Thu",
    payments: 72000,
  },
  {
    day: "Fri",
    payments: 65000,
  },
  {
    day: "Sat",
    payments: 89000,
  },
  {
    day: "Sun",
    payments: 76000,
  },
];


// -----------------------------
// TRANSACTION DATA
// -----------------------------

const transactions = [
  {
    id: "TXN100245",
    user: "Rahul Sharma",
    merchant: "FashionHub",
    gateway: "Razorpay",
    amount: "₹4,500",
    status: "Success",
  },

  {
    id: "TXN100244",
    user: "Priya Shah",
    merchant: "TechMart",
    gateway: "PayU",
    amount: "₹2,800",
    status: "Success",
  },

  {
    id: "TXN100243",
    user: "Aarav Patel",
    merchant: "FoodExpress",
    gateway: "Stripe",
    amount: "₹1,250",
    status: "Pending",
  },

  {
    id: "TXN100242",
    user: "Ananya Mehta",
    merchant: "ShopKart",
    gateway: "Razorpay",
    amount: "₹6,700",
    status: "Failed",
  },

  {
    id: "TXN100241",
    user: "Rohan Joshi",
    merchant: "FashionHub",
    gateway: "PayU",
    amount: "₹3,200",
    status: "Success",
  },
];


// -----------------------------
// GATEWAY DATA
// -----------------------------

const gateways = [
  {
    name: "Razorpay",
    transactions: "5,420",
    success: "98.4%",
  },

  {
    name: "PayU",
    transactions: "4,821",
    success: "96.8%",
  },

  {
    name: "Stripe",
    transactions: "2,241",
    success: "97.9%",
  },
];


function Dashboard() {
const navigate = useNavigate();
  return (

    <div className="flex min-h-screen bg-slate-50">

      {/* SIDEBAR */}

      <Sidebar />


      {/* MAIN AREA */}

      <div className="flex-1 min-w-0">

        <Navbar />


        <main className="p-6 lg:p-8">


          {/* -------------------------------- */}
          {/* HEADER */}
          {/* -------------------------------- */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Welcome back, Admin. Here's your payment overview.
              </p>

            </div>


            <div>

              <select className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500">

                <option>
                  Last 7 days
                </option>

                <option>
                  Last 30 days
                </option>

                <option>
                  Last 3 months
                </option>

              </select>

            </div>

          </div>


          {/* -------------------------------- */}
          {/* STAT CARDS */}
          {/* -------------------------------- */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">


            <StatCard
              title="Total Revenue"
              value="₹24.8 L"
              change="12.5%"
              description="vs last month"
              icon={IndianRupee}
              iconBg="bg-purple-100 text-purple-600"
            />


            <StatCard
              title="Transactions"
              value="12,482"
              change="8.2%"
              description="vs last month"
              icon={CreditCard}
              iconBg="bg-blue-100 text-blue-600"
            />


            <StatCard
              title="Refunds"
              value="₹2.4 L"
              change="4.8%"
              description="vs last month"
              icon={RotateCcw}
              iconBg="bg-orange-100 text-orange-600"
            />


            <StatCard
              title="Active Merchants"
              value="348"
              change="6.4%"
              description="vs last month"
              icon={Store}
              iconBg="bg-green-100 text-green-600"
            />

          </div>


          {/* -------------------------------- */}
          {/* CHART + GATEWAYS */}
          {/* -------------------------------- */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">


            {/* PAYMENT CHART */}

            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Payment Analytics
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Payment volume over the selected period
                  </p>

                </div>

                <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                  View Report
                </button>

              </div>


              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <LineChart data={paymentData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />


                  <Line
                    type="monotone"
                    dataKey="payments"
                    stroke="#9333ea"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>


            {/* GATEWAY PERFORMANCE */}

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Gateway Performance
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Current gateway activity
                  </p>

                </div>

              </div>


              <div className="space-y-5">

                {gateways.map((gateway) => (

                  <div
                    key={gateway.name}
                    className="border-b border-slate-100 pb-4 last:border-none"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <p className="font-semibold text-slate-800">
                          {gateway.name}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {gateway.transactions} transactions
                        </p>

                      </div>

                      <span className="text-sm font-semibold text-green-600">
                        {gateway.success}
                      </span>

                    </div>


                    <div className="w-full h-2 bg-slate-100 rounded-full mt-3">

                      <div
                        className="h-2 bg-purple-500 rounded-full"
                        style={{
                          width: gateway.success,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>


              <button className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-purple-600 text-sm font-medium transition">

                Manage Gateways

              </button>

            </div>

          </div>


          {/* -------------------------------- */}
          {/* TRANSACTION STATUS */}
          {/* -------------------------------- */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">


            <div className="bg-white rounded-2xl border border-slate-100 p-5">

              <div className="flex items-center gap-3">

                <div className="p-3 rounded-xl bg-green-100 text-green-600">
                  <CheckCircle2 size={21} />
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Successful Payments
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    11,982
                  </h3>

                </div>

              </div>

            </div>


            <div className="bg-white rounded-2xl border border-slate-100 p-5">

              <div className="flex items-center gap-3">

                <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
                  <Clock3 size={21} />
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Pending Payments
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    284
                  </h3>

                </div>

              </div>

            </div>


            <div className="bg-white rounded-2xl border border-slate-100 p-5">

              <div className="flex items-center gap-3">

                <div className="p-3 rounded-xl bg-red-100 text-red-600">
                  <XCircle size={21} />
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Failed Payments
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    216
                  </h3>

                </div>

              </div>

            </div>

          </div>


          {/* -------------------------------- */}
          {/* RECENT TRANSACTIONS */}
          {/* -------------------------------- */}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mt-6 overflow-hidden">


            {/* HEADER */}

            <div className="p-6 flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Recent Transactions
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Latest payment activity across all gateways
                </p>

              </div>

              <button className="flex items-center gap-1 text-sm text-purple-600 font-medium hover:text-purple-700">

                View All

                <ArrowUpRight size={16} />

              </button>

            </div>


            {/* TABLE */}

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-slate-50 border-y border-slate-100">

                  <tr>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Transaction
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      User
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Merchant
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Gateway
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {transactions.map((transaction) => (

                    <tr
                      key={transaction.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                      <td className="px-6 py-4">

                        <p className="font-semibold text-sm text-slate-800">
                          {transaction.id}
                        </p>

                      </td>


                      <td className="px-6 py-4">

                        <p className="text-sm text-slate-700">
                          {transaction.user}
                        </p>

                      </td>


                      <td className="px-6 py-4">

                        <p className="text-sm text-slate-700">
                          {transaction.merchant}
                        </p>

                      </td>


                      <td className="px-6 py-4">

                        <span className="text-sm font-medium text-slate-600">
                          {transaction.gateway}
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <span className="text-sm font-semibold text-slate-900">
                          {transaction.amount}
                        </span>

                      </td>


                      <td className="px-6 py-4">

                        <StatusBadge
                          status={transaction.status}
                        />

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


        </main>

      </div>

    </div>

  );
}


// -----------------------------
// STATUS BADGE
// -----------------------------

function StatusBadge({ status }) {

  const styles = {

    Success:
      "bg-green-100 text-green-700",

    Pending:
      "bg-yellow-100 text-yellow-700",

    Failed:
      "bg-red-100 text-red-700",

  };


  return (

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      {status}
    </span>

  );

}


export default Dashboard;