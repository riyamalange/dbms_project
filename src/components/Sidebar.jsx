import {
  LayoutDashboard,
  CreditCard,
  Store,
  Users,
  WalletCards,
  RotateCcw,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: CreditCard,
    },
    {
      name: "Merchants",
      path: "/merchants",
      icon: Store,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
    },
    {
      name: "Payment Gateways",
      path: "/gateways",
      icon: WalletCards,
    },
    {
      name: "Payment Methods",
      path: "/payment-methods",
      icon: CreditCard,
    },
    {
      name: "Refunds",
      path: "/refunds",
      icon: RotateCcw,
    },
    {
      name: "Settlements",
      path: "/settlements",
      icon: Landmark,
    },
    {
      name: "Admins",
      path: "/admins",
      icon: ShieldCheck,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-5 flex flex-col overflow-y-auto">

      {/* LOGO */}

      <div className="mb-10 px-2">

        <h1 className="text-3xl font-bold">
          Uni<span className="text-purple-400">Pay</span>
        </h1>

        <p className="text-xs text-slate-500 mt-1">
          Payment Management
        </p>

      </div>


      {/* MENU */}

      <nav className="space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <Icon size={19} />

              <span className="text-sm">
                {item.name}
              </span>

            </NavLink>
          );

        })}

      </nav>


      {/* BOTTOM */}

     <div className="mt-auto pt-6">

  <div className="bg-slate-900 rounded-xl p-4">

    <p className="text-xs text-slate-400">
      System Status
    </p>

    <div className="flex items-center gap-2 mt-2">

      <div className="w-2 h-2 rounded-full bg-green-400" />

      <span className="text-xs text-green-400">
        All systems operational
      </span>

    </div>

  </div>

</div>

    </aside>
  );
}

export default Sidebar;