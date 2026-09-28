import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  X,
  Store,
  CheckCircle2,
  Clock3,
  Ban,
  CreditCard,
  IndianRupee,
  Activity,
} from "lucide-react";

function Merchants() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/merchants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch merchants");
        }
        return response.json();
      })
      .then((data) => {
        setMerchants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const filteredMerchants = merchants.filter((merchant) => {
    const name = merchant.merchantName || "";
    const code = merchant.merchantCode || "";
    const email = merchant.email || "";

    const searchMatch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      code.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All" || merchant.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const changeMerchantStatus = async (merchantId, newStatus) => {
    const merchant = merchants.find((item) => item.merchantId === merchantId);

    if (!merchant) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/merchants/${merchantId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            merchantCode: merchant.merchantCode,
            merchantName: merchant.merchantName,
            email: merchant.email,
            category: merchant.category,
            defaultGatewayId: merchant.defaultGatewayId,
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update merchant status");
      }

      const updatedMerchant = await response.json();

      setMerchants((current) =>
        current.map((item) =>
          item.merchantId === merchantId ? updatedMerchant : item
        )
      );

      setSelectedMerchant(updatedMerchant);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addMerchant = async (formData) => {
    const merchantCode =
      "MER" + String(Math.floor(Math.random() * 900) + 100);

    try {
      const response = await fetch("http://localhost:8080/api/merchants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchantCode,
          merchantName: formData.name,
          email: formData.email,
          category: formData.category,
          defaultGatewayId: null,
          status: "Pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add merchant");
      }

      const newMerchant = await response.json();

      setMerchants((current) => [...current, newMerchant]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Could not add merchant. Please check the backend.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Merchants</h1>
              <p className="text-slate-500 mt-2">
                Manage businesses using the UniPay platform.
              </p>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-sm transition"
            >
              <Plus size={19} />
              Add Merchant
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <SummaryCard
              title="Total Merchants"
              value={merchants.length}
              icon={Store}
              iconStyle="bg-purple-100 text-purple-600"
            />

            <SummaryCard
              title="Active"
              value={merchants.filter((m) => m.status === "Active").length}
              icon={CheckCircle2}
              iconStyle="bg-green-100 text-green-600"
            />

            <SummaryCard
              title="Pending Approval"
              value={merchants.filter((m) => m.status === "Pending").length}
              icon={Clock3}
              iconStyle="bg-yellow-100 text-yellow-600"
            />

            <SummaryCard
              title="Suspended"
              value={merchants.filter((m) => m.status === "Suspended").length}
              icon={Ban}
              iconStyle="bg-red-100 text-red-600"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search merchant name, ID or email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
              >
                <option value="All">All Merchants</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <TableHeading>Merchant</TableHeading>
                    <TableHeading>Category</TableHeading>
                    <TableHeading>Gateway</TableHeading>
                    <TableHeading>Transactions</TableHeading>
                    <TableHeading>Revenue</TableHeading>
                    <TableHeading>Status</TableHeading>
                    <TableHeading>Action</TableHeading>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center text-slate-500">
                        Loading merchants...
                      </td>
                    </tr>
                  ) : (
                    filteredMerchants.map((merchant) => (
                      <tr
                        key={merchant.merchantId}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                              {(merchant.merchantName || "M")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {merchant.merchantName}
                              </p>

                              <p className="text-xs text-slate-400 mt-1">
                                {merchant.merchantCode}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">
                            {merchant.category || "-"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-700">
                            {merchant.defaultGatewayId
                              ? `Gateway #${merchant.defaultGatewayId}`
                              : "Not connected"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-700">
                            0
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-900">
                            ₹0
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <MerchantStatus status={merchant.status} />
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedMerchant(merchant)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-purple-600 hover:bg-purple-50 transition"
                          >
                            <Eye size={17} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {!loading && filteredMerchants.length === 0 && (
                <div className="py-16 text-center">
                  <Store size={38} className="mx-auto text-slate-300" />
                  <p className="text-slate-500 mt-3">No merchants found.</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredMerchants.length}
                </span>{" "}
                merchants
              </p>
            </div>
          </div>
        </main>
      </div>

      {selectedMerchant && (
        <MerchantDetails
          merchant={selectedMerchant}
          onClose={() => setSelectedMerchant(null)}
          onStatusChange={changeMerchantStatus}
        />
      )}

      {showAddForm && (
        <AddMerchantModal
          onClose={() => setShowAddForm(false)}
          onAdd={addMerchant}
        />
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, iconStyle }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">{value}</h2>
        </div>

        <div className={`p-3 rounded-xl ${iconStyle}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function TableHeading({ children }) {
  return (
    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
      {children}
    </th>
  );
}

function MerchantStatus({ status }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Suspended: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function MerchantDetails({ merchant, onClose, onStatusChange }) {
  const merchantName = merchant.merchantName || "-";
  const gatewayText = merchant.defaultGatewayId
    ? `Gateway #${merchant.defaultGatewayId}`
    : "Not connected";

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between z-10">
          <div>
            <p className="text-xs text-slate-400">Merchant Details</p>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {merchantName}
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
          <div className="bg-slate-50 rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
                {merchantName.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="font-bold text-slate-900">{merchantName}</h3>
                <p className="text-sm text-slate-400 mt-1">
                  {merchant.merchantCode || "-"}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <MerchantStatus status={merchant.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <MiniStat
              icon={CreditCard}
              title="Transactions"
              value="0"
            />

            <MiniStat
              icon={IndianRupee}
              title="Revenue"
              value="₹0"
            />

            <MiniStat
              icon={Activity}
              title="Gateway"
              value={gatewayText}
            />

            <MiniStat
              icon={Store}
              title="Category"
              value={merchant.category || "-"}
            />
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-slate-900 mb-4">
              Contact Information
            </h3>

            <div className="space-y-4">
              <InfoRow label="Email" value={merchant.email || "-"} />
              <InfoRow label="Phone" value="Not available in database" />
              <InfoRow label="Joined" value="Not available in database" />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-slate-900 mb-4">
              Connected Gateway
            </h3>

            <div className="flex items-center justify-between bg-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <CreditCard size={19} />
                </div>

                <span className="font-semibold text-slate-800">
                  {gatewayText}
                </span>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {merchant.defaultGatewayId ? "Connected" : "Not connected"}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {merchant.status === "Pending" && (
              <button
                onClick={() =>
                  onStatusChange(merchant.merchantId, "Active")
                }
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
              >
                Approve Merchant
              </button>
            )}

            {merchant.status === "Active" && (
              <button
                onClick={() =>
                  onStatusChange(merchant.merchantId, "Suspended")
                }
                className="w-full py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition"
              >
                Suspend Merchant
              </button>
            )}

            {merchant.status === "Suspended" && (
              <button
                onClick={() =>
                  onStatusChange(merchant.merchantId, "Active")
                }
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
              >
                Reactivate Merchant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, title, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <Icon size={19} className="text-purple-600" />

      <p className="text-xs text-slate-400 mt-2">{title}</p>

      <p className="text-sm font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-medium text-slate-700 text-right">
        {value}
      </span>
    </div>
  );
}

function AddMerchantModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.category) {
      return;
    }

    onAdd(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add New Merchant
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Register a new business on UniPay.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <FormInput
            label="Business Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. FashionHub"
          />

          <FormInput
            label="Business Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@business.com"
          />

          <FormInput
            label="Business Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. E-Commerce"
          />

          <div className="bg-purple-50 rounded-xl p-4 text-sm text-purple-700">
            Payment gateway connection will be added when the gateway module
            is connected to the backend.
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
          >
            Create Merchant
          </button>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

export default Merchants;
