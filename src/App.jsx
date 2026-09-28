import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Merchants from "./pages/Merchants";
import Refunds from "./pages/Refunds";
import Settlements from "./pages/Settlements";
import PaymentMethods from "./pages/PaymentMethods";
import Admins from "./pages/Admins";
import Gateways from "./pages/Gateways";
import Users from "./pages/Users";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
         path="/transactions"
         element={<Transactions />}
        />
      <Route
         path="/merchants"
        element={<Merchants />}
      />
      <Route
        path="/refunds"
      element={<Refunds />}
      />
      <Route
        path="/settlements"
       element={<Settlements />}
      />
      <Route
        path="/payment-methods"
        element={<PaymentMethods />}
      />
      <Route
         path="/admins"
         element={<Admins />}
      />
      <Route 
        path="/gateways" 
        element={<Gateways />}
       />
       <Route
        path="/users" 
        element={<Users />} 
      />
      </Routes>
    </BrowserRouter>

  );
}

export default App;