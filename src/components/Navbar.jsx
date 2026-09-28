import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

function Navbar() {

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* SEARCH */}

      <div className="relative">

        <Search
          size={19}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search transactions, merchants..."
          className="
            pl-10
            pr-4
            py-2.5
            w-80
            bg-slate-100
            rounded-xl
            text-sm
            outline-none
            focus:ring-2
            focus:ring-purple-500
          "
        />

      </div>


      {/* RIGHT SIDE */}

      <div className="flex items-center gap-6">

        {/* NOTIFICATION */}

        <button className="relative text-slate-600 hover:text-purple-600">

          <Bell size={21} />

          <span className="
            absolute
            -top-1
            -right-1
            w-2
            h-2
            bg-red-500
            rounded-full
          " />

        </button>


        {/* ADMIN */}

        <div className="flex items-center gap-3">

          <div className="
            w-10
            h-10
            rounded-full
            bg-purple-600
            text-white
            flex
            items-center
            justify-center
            font-bold
          ">
            A
          </div>

          <div>

            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-slate-400">
              Super Admin
            </p>

          </div>

          <ChevronDown
            size={17}
            className="text-slate-400"
          />

        </div>

      </div>

    </header>
  );
}

export default Navbar;