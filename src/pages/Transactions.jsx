import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
} from "lucide-react";


// ------------------------------------
// MOCK TRANSACTION DATA
// ------------------------------------

const transactionData = [
  {
    id: "TXN100245",
    user: "Rahul Sharma",
    email: "rahul@gmail.com",
    merchant: "FashionHub",
    gateway: "Razorpay",
    method: "UPI",
    amount: 4500,
    status: "Success",
    date: "20 Sep 2026",
    time: "10:42 AM",
  },

  {
    id: "TXN100244",
    user: "Priya Shah",
    email: "priya@gmail.com",
    merchant: "TechMart",
    gateway: "PayU",
    method: "Card",
    amount: 2800,
    status: "Success",
    date: "20 Sep 2026",
    time: "10:21 AM",
  },

  {
    id: "TXN100243",
    user: "Aarav Patel",
    email: "aarav@gmail.com",
    merchant: "FoodExpress",
    gateway: "Stripe",
    method: "UPI",
    amount: 1250,
    status: "Pending",
    date: "20 Sep 2026",
    time: "09:58 AM",
  },

  {
    id: "TXN100242",
    user: "Ananya Mehta",
    email: "ananya@gmail.com",
    merchant: "ShopKart",
    gateway: "Razorpay",
    method: "Card",
    amount: 6700,
    status: "Failed",
    date: "19 Sep 2026",
    time: "06:32 PM",
  },

  {
    id: "TXN100241",
    user: "Rohan Joshi",
    email: "rohan@gmail.com",
    merchant: "FashionHub",
    gateway: "PayU",
    method: "Bank Account",
    amount: 3200,
    status: "Success",
    date: "19 Sep 2026",
    time: "05:45 PM",
  },

  {
    id: "TXN100240",
    user: "Sneha Patil",
    email: "sneha@gmail.com",
    merchant: "TravelWorld",
    gateway: "Stripe",
    method: "Card",
    amount: 8200,
    status: "Refunded",
    date: "19 Sep 2026",
    time: "04:20 PM",
  },

  {
    id: "TXN100239",
    user: "Karan Shah",
    email: "karan@gmail.com",
    merchant: "FoodExpress",
    gateway: "Razorpay",
    method: "UPI",
    amount: 950,
    status: "Success",
    date: "19 Sep 2026",
    time: "03:11 PM",
  },

  {
    id: "TXN100238",
    user: "Neha Kulkarni",
    email: "neha@gmail.com",
    merchant: "ShopKart",
    gateway: "PayU",
    method: "Card",
    amount: 5400,
    status: "Pending",
    date: "19 Sep 2026",
    time: "02:34 PM",
  },
];


function Transactions() {

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [gatewayFilter, setGatewayFilter] = useState("All");

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);


  // ------------------------------------
  // FILTER TRANSACTIONS
  // ------------------------------------

  const filteredTransactions = transactionData.filter(
    (transaction) => {

      const searchMatch =
        transaction.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        transaction.user
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        transaction.merchant
          .toLowerCase()
          .includes(search.toLowerCase());


      const statusMatch =
        statusFilter === "All" ||
        transaction.status === statusFilter;


      const gatewayMatch =
        gatewayFilter === "All" ||
        transaction.gateway === gatewayFilter;


      return (
        searchMatch &&
        statusMatch &&
        gatewayMatch
      );

    }
  );


  return (

    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />


      <div className="flex-1 min-w-0">

        <Navbar />


        <main className="p-6 lg:p-8">


          {/* -------------------------------- */}
          {/* PAGE HEADER */}
          {/* -------------------------------- */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Transactions
              </h1>

              <p className="text-slate-500 mt-2">
                View and manage all payment transactions.
              </p>

            </div>


            <div className="bg-purple-50 text-purple-700 px-4 py-2.5 rounded-xl text-sm font-medium">

              {filteredTransactions.length} transactions

            </div>

          </div>


          {/* -------------------------------- */}
          {/* FILTER BAR */}
          {/* -------------------------------- */}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">

            <div className="flex flex-col xl:flex-row gap-4">


              {/* SEARCH */}

              <div className="relative flex-1">

                <Search
                  size={19}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search transaction, user or merchant..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    pl-10
                    pr-4
                    py-2.5
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-xl
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-purple-500
                  "
                />

              </div>


              {/* STATUS */}

              <div className="flex items-center gap-2">

                <Filter
                  size={18}
                  className="text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="
                    px-4
                    py-2.5
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-xl
                    text-sm
                    outline-none
                  "
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Success">
                    Success
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Failed">
                    Failed
                  </option>

                  <option value="Refunded">
                    Refunded
                  </option>

                </select>

              </div>


              {/* GATEWAY */}

              <select
                value={gatewayFilter}
                onChange={(e) =>
                  setGatewayFilter(e.target.value)
                }
                className="
                  px-4
                  py-2.5
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-xl
                  text-sm
                  outline-none
                "
              >

                <option value="All">
                  All Gateways
                </option>

                <option value="Razorpay">
                  Razorpay
                </option>

                <option value="PayU">
                  PayU
                </option>

                <option value="Stripe">
                  Stripe
                </option>

              </select>

            </div>

          </div>


          {/* -------------------------------- */}
          {/* TRANSACTION TABLE */}
          {/* -------------------------------- */}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-slate-50 border-b border-slate-100">

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
                      Method
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredTransactions.map(
                    (transaction) => (

                      <tr
                        key={transaction.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >

                        {/* TRANSACTION ID */}

                        <td className="px-6 py-4">

                          <p className="font-semibold text-sm text-slate-800">
                            {transaction.id}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {transaction.date}
                          </p>

                        </td>


                        {/* USER */}

                        <td className="px-6 py-4">

                          <p className="text-sm font-medium text-slate-700">
                            {transaction.user}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {transaction.email}
                          </p>

                        </td>


                        {/* MERCHANT */}

                        <td className="px-6 py-4">

                          <span className="text-sm text-slate-700">
                            {transaction.merchant}
                          </span>

                        </td>


                        {/* GATEWAY */}

                        <td className="px-6 py-4">

                          <span className="text-sm font-medium text-slate-600">
                            {transaction.gateway}
                          </span>

                        </td>


                        {/* METHOD */}

                        <td className="px-6 py-4">

                          <span className="text-sm text-slate-600">
                            {transaction.method}
                          </span>

                        </td>


                        {/* AMOUNT */}

                        <td className="px-6 py-4">

                          <span className="text-sm font-bold text-slate-900">
                            ₹{transaction.amount.toLocaleString()}
                          </span>

                        </td>


                        {/* STATUS */}

                        <td className="px-6 py-4">

                          <StatusBadge
                            status={transaction.status}
                          />

                        </td>


                        {/* ACTION */}

                        <td className="px-6 py-4">

                          <button
                            onClick={() =>
                              setSelectedTransaction(
                                transaction
                              )
                            }
                            className="
                              flex
                              items-center
                              gap-2
                              px-3
                              py-2
                              rounded-lg
                              text-sm
                              text-purple-600
                              hover:bg-purple-50
                              transition
                            "
                          >

                            <Eye size={17} />

                            View

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>


              {/* EMPTY STATE */}

              {filteredTransactions.length === 0 && (

                <div className="py-16 text-center">

                  <Search
                    size={35}
                    className="mx-auto text-slate-300"
                  />

                  <p className="text-slate-500 mt-3">
                    No transactions found.
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    Try changing your search or filters.
                  </p>

                </div>

              )}

            </div>


            {/* -------------------------------- */}
            {/* PAGINATION */}
            {/* -------------------------------- */}

            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">

              <p className="text-sm text-slate-500">

                Showing{" "}
                <span className="font-medium text-slate-700">
                  {filteredTransactions.length}
                </span>{" "}
                transactions

              </p>


              <div className="flex items-center gap-2">

                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">

                  <ChevronLeft size={17} />

                </button>

                <button className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm">
                  1
                </button>

                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
                  2
                </button>

                <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
                  3
                </button>

                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">

                  <ChevronRight size={17} />

                </button>

              </div>

            </div>

          </div>

        </main>

      </div>


      {/* -------------------------------- */}
      {/* TRANSACTION DETAIL MODAL */}
      {/* -------------------------------- */}

      {selectedTransaction && (

        <TransactionModal
          transaction={selectedTransaction}
          onClose={() =>
            setSelectedTransaction(null)
          }
        />

      )}

    </div>
  );
}


// ====================================
// STATUS BADGE
// ====================================

function StatusBadge({ status }) {

  const styles = {

    Success:
      "bg-green-100 text-green-700",

    Pending:
      "bg-yellow-100 text-yellow-700",

    Failed:
      "bg-red-100 text-red-700",

    Refunded:
      "bg-purple-100 text-purple-700",

  };


  return (

    <span
      className={`
        inline-flex
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


// ====================================
// TRANSACTION MODAL
// ====================================

function TransactionModal({
  transaction,
  onClose,
}) {

  return (

    <div className="
      fixed
      inset-0
      bg-slate-950/50
      backdrop-blur-sm
      flex
      justify-end
      z-50
    ">


      <div className="
        bg-white
        w-full
        max-w-lg
        h-full
        overflow-y-auto
        shadow-2xl
      ">


        {/* HEADER */}

        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between">

          <div>

            <p className="text-xs text-slate-400">
              Transaction Details
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {transaction.id}
            </h2>

          </div>


          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >

            <X size={21} />

          </button>

        </div>


        <div className="p-6">


          {/* STATUS */}

          <div className="bg-slate-50 rounded-2xl p-5">

            <p className="text-sm text-slate-500">
              Payment Amount
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-2">
              ₹{transaction.amount.toLocaleString()}
            </h1>

            <div className="mt-3">

              <StatusBadge
                status={transaction.status}
              />

            </div>

          </div>


          {/* DETAILS */}

          <div className="mt-7">

            <h3 className="font-bold text-slate-900 mb-4">
              Payment Information
            </h3>


            <div className="space-y-4">


              <DetailRow
                label="User"
                value={transaction.user}
              />

              <DetailRow
                label="Email"
                value={transaction.email}
              />

              <DetailRow
                label="Merchant"
                value={transaction.merchant}
              />

              <DetailRow
                label="Payment Gateway"
                value={transaction.gateway}
              />

              <DetailRow
                label="Payment Method"
                value={transaction.method}
              />

              <DetailRow
                label="Date"
                value={transaction.date}
              />

              <DetailRow
                label="Time"
                value={transaction.time}
              />

            </div>

          </div>


          {/* TIMELINE */}

          <div className="mt-8">

            <h3 className="font-bold text-slate-900 mb-5">
              Payment Timeline
            </h3>


            <div className="space-y-6">


              <TimelineItem
                icon={CheckCircle2}
                title="Payment Initiated"
                description="Transaction request received"
                color="green"
              />


              <TimelineItem
                icon={CheckCircle2}
                title="Gateway Processing"
                description={`${transaction.gateway} processed the payment`}
                color="green"
              />


              <TimelineItem
                icon={
                  transaction.status === "Failed"
                    ? XCircle
                    : transaction.status === "Pending"
                    ? Clock3
                    : CheckCircle2
                }
                title={
                  transaction.status === "Failed"
                    ? "Payment Failed"
                    : transaction.status === "Pending"
                    ? "Payment Pending"
                    : "Payment Successful"
                }
                description={
                  transaction.status === "Failed"
                    ? "Payment could not be completed"
                    : transaction.status === "Pending"
                    ? "Waiting for payment confirmation"
                    : "Payment successfully completed"
                }
                color={
                  transaction.status === "Failed"
                    ? "red"
                    : transaction.status === "Pending"
                    ? "yellow"
                    : "green"
                }
              />

            </div>

          </div>


          {/* REFUND BUTTON */}

          {transaction.status === "Success" && (

            <button className="
              w-full
              mt-8
              flex
              items-center
              justify-center
              gap-2
              py-3
              rounded-xl
              bg-purple-600
              hover:bg-purple-700
              text-white
              font-semibold
              transition
            ">

              <RotateCcw size={18} />

              Initiate Refund

            </button>

          )}

        </div>

      </div>

    </div>

  );

}


// ====================================
// DETAIL ROW
// ====================================

function DetailRow({
  label,
  value,
}) {

  return (

    <div className="flex items-center justify-between gap-4">

      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-sm font-medium text-slate-700 text-right">
        {value}
      </span>

    </div>

  );

}


// ====================================
// TIMELINE ITEM
// ====================================

function TimelineItem({
  icon: Icon,
  title,
  description,
  color,
}) {

  const colors = {

    green:
      "bg-green-100 text-green-600",

    yellow:
      "bg-yellow-100 text-yellow-600",

    red:
      "bg-red-100 text-red-600",

  };


  return (

    <div className="flex items-start gap-4">

      <div className={`p-2 rounded-full ${colors[color]}`}>

        <Icon size={17} />

      </div>

      <div>

        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          {description}
        </p>

      </div>

    </div>

  );

}


export default Transactions;