/* =========================================
   UNIFIED PAYMENT GATEWAY
   FRONTEND JAVASCRIPT
========================================= */

const API_BASE = "http://127.0.0.1:5000";


/* =========================================
   DEMO DATA
========================================= */

let transactions = [
    {
        id: "TXN1001",
        customer: "Riya",
        method: "UPI",
        gateway: "Razorpay",
        amount: 450,
        status: "Success"
    },

    {
        id: "TXN1002",
        customer: "Aarav",
        method: "Card",
        gateway: "Stripe",
        amount: 899,
        status: "Success"
    },

    {
        id: "TXN1003",
        customer: "Sneha",
        method: "UPI",
        gateway: "PayU",
        amount: 320,
        status: "Pending"
    },

    {
        id: "TXN1004",
        customer: "Karan",
        method: "Wallet",
        gateway: "Razorpay",
        amount: 650,
        status: "Success"
    },

    {
        id: "TXN1005",
        customer: "Ananya",
        method: "Card",
        gateway: "Stripe",
        amount: 1200,
        status: "Failed"
    }
];


let orders = [

    {
        id: "ORD1001",
        type: "FOOD",
        customer: "Riya",
        merchant: "Food Hub",
        amount: 450,
        status: "Delivered"
    },

    {
        id: "ORD1002",
        type: "RIDE",
        customer: "Aarav",
        merchant: "City Rides",
        amount: 320,
        status: "Completed"
    },

    {
        id: "ORD1003",
        type: "FOOD",
        customer: "Sneha",
        merchant: "Spice Kitchen",
        amount: 680,
        status: "Preparing"
    },

    {
        id: "ORD1004",
        type: "RIDE",
        customer: "Karan",
        merchant: "Urban Cabs",
        amount: 520,
        status: "Completed"
    }

];


let merchants = [

    {
        name: "Food Hub",
        type: "Restaurant",
        category: "Food Delivery"
    },

    {
        name: "Spice Kitchen",
        type: "Restaurant",
        category: "Food Delivery"
    },

    {
        name: "City Rides",
        type: "Driver",
        category: "Ride Service"
    },

    {
        name: "Urban Cabs",
        type: "Driver",
        category: "Ride Service"
    },

    {
        name: "Zesty Restaurant",
        type: "Restaurant",
        category: "Food Delivery"
    },

    {
        name: "Metro Rides",
        type: "Driver",
        category: "Ride Service"
    }

];


let refunds = [

    {
        id: "REF1001",
        transaction: "TXN1002",
        reason: "Customer request",
        amount: 899,
        status: "Processed"
    },

    {
        id: "REF1002",
        transaction: "TXN1005",
        reason: "Payment failed",
        amount: 1200,
        status: "Pending"
    }

];


let settlements = [

    {
        id: "SET1001",
        merchant: "Food Hub",
        amount: 15450,
        date: "2026-09-25",
        status: "Completed"
    },

    {
        id: "SET1002",
        merchant: "City Rides",
        amount: 12800,
        date: "2026-09-26",
        status: "Completed"
    },

    {
        id: "SET1003",
        merchant: "Spice Kitchen",
        amount: 9800,
        date: "2026-09-27",
        status: "Pending"
    }

];


/* =========================================
   PAGE NAVIGATION
========================================= */

function showSection(sectionId, button) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active-section");
    });

    const section = document.getElementById(sectionId);

    if (section) {
        section.classList.add("active-section");
    }


    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }


    const titles = {
        dashboard: "Dashboard",
        payments: "Payments",
        orders: "Orders",
        merchants: "Merchants",
        transactions: "Transactions",
        refunds: "Refunds",
        settlements: "Settlements"
    };

    document.getElementById("pageTitle").textContent =
        titles[sectionId] || "Dashboard";
}


function showSectionByName(sectionId) {

    const button = document.querySelector(
        `.nav-item[onclick*="'${sectionId}'"]`
    );

    showSection(sectionId, button);
}


/* =========================================
   STATUS BADGES
========================================= */

function statusClass(status) {

    const value = String(status).toLowerCase();

    if (
        value.includes("success") ||
        value.includes("complete") ||
        value.includes("deliver") ||
        value.includes("process")
    ) {
        return "success";
    }

    if (
        value.includes("pending") ||
        value.includes("preparing")
    ) {
        return "pending";
    }

    return "failed";
}


function statusBadge(status) {

    return `
        <span class="status ${statusClass(status)}">
            ${status}
        </span>
    `;
}


/* =========================================
   DASHBOARD
========================================= */

function renderDashboard() {

    const successful = transactions.filter(
        transaction => transaction.status === "Success"
    );

    const revenue = successful.reduce(
        (sum, transaction) =>
            sum + Number(transaction.amount),
        0
    );


    document.getElementById("totalRevenue").textContent =
        "₹" + revenue.toLocaleString("en-IN");


    document.getElementById("successfulPayments").textContent =
        successful.length;


    document.getElementById("totalOrders").textContent =
        orders.length;


    document.getElementById("activeMerchants").textContent =
        merchants.length;


    const recent = transactions.slice(-5).reverse();

    document.getElementById("recentTransactions").innerHTML =
        recent.map(transaction => {

            return `
                <tr>

                    <td>
                        <strong>${transaction.id}</strong>
                    </td>

                    <td>
                        ${transaction.customer}
                    </td>

                    <td>
                        ₹${Number(transaction.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${statusBadge(transaction.status)}
                    </td>

                </tr>
            `;

        }).join("");
}


/* =========================================
   TRANSACTIONS
========================================= */

function renderTransactions() {

    const search =
        document.getElementById("transactionSearch")
        ?.value
        .toLowerCase() || "";


    const filtered = transactions.filter(transaction => {

        return (
            transaction.id.toLowerCase().includes(search) ||
            transaction.customer.toLowerCase().includes(search) ||
            transaction.method.toLowerCase().includes(search) ||
            transaction.gateway.toLowerCase().includes(search)
        );

    });


    document.getElementById("transactionsTable").innerHTML =

        filtered.map(transaction => {

            return `
                <tr>

                    <td>
                        <strong>${transaction.id}</strong>
                    </td>

                    <td>
                        ${transaction.customer}
                    </td>

                    <td>
                        ${transaction.method}
                    </td>

                    <td>
                        ${transaction.gateway}
                    </td>

                    <td>
                        ₹${Number(transaction.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${statusBadge(transaction.status)}
                    </td>

                </tr>
            `;

        }).join("");
}


/* =========================================
   ORDERS
========================================= */

function renderOrders() {

    document.getElementById("ordersTable").innerHTML =

        orders.map(order => {

            const icon =
                order.type === "FOOD"
                    ? "🍔"
                    : "🚕";


            return `
                <tr>

                    <td>
                        <strong>${order.id}</strong>
                    </td>

                    <td>
                        ${icon} ${order.type}
                    </td>

                    <td>
                        ${order.customer}
                    </td>

                    <td>
                        ${order.merchant}
                    </td>

                    <td>
                        ₹${Number(order.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${statusBadge(order.status)}
                    </td>

                </tr>
            `;

        }).join("");
}


/* =========================================
   MERCHANTS
========================================= */

function renderMerchants() {

    document.getElementById("merchantGrid").innerHTML =

        merchants.map(merchant => {

            const icon =
                merchant.type === "Restaurant"
                    ? "🍴"
                    : "🚕";


            return `
                <div class="merchant-card">

                    <div class="merchant-icon">
                        ${icon}
                    </div>

                    <h3>
                        ${merchant.name}
                    </h3>

                    <p>
                        ${merchant.category}
                    </p>

                    <span class="merchant-type">
                        ${merchant.type}
                    </span>

                </div>
            `;

        }).join("");
}


/* =========================================
   REFUNDS
========================================= */

function renderRefunds() {

    document.getElementById("refundsTable").innerHTML =

        refunds.map(refund => {

            return `
                <tr>

                    <td>
                        <strong>${refund.id}</strong>
                    </td>

                    <td>
                        ${refund.transaction}
                    </td>

                    <td>
                        ${refund.reason}
                    </td>

                    <td>
                        ₹${Number(refund.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${statusBadge(refund.status)}
                    </td>

                </tr>
            `;

        }).join("");
}


/* =========================================
   SETTLEMENTS
========================================= */

function renderSettlements() {

    document.getElementById("settlementsTable").innerHTML =

        settlements.map(settlement => {

            return `
                <tr>

                    <td>
                        <strong>${settlement.id}</strong>
                    </td>

                    <td>
                        ${settlement.merchant}
                    </td>

                    <td>
                        ₹${Number(settlement.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${settlement.date}
                    </td>

                    <td>
                        ${statusBadge(settlement.status)}
                    </td>

                </tr>
            `;

        }).join("");
}


/* =========================================
   PAYMENT FORM
========================================= */

document
    .getElementById("paymentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const customer =
            document.getElementById("customerName").value.trim();


        const amount =
            Number(
                document.getElementById("paymentAmount").value
            );


        const method =
            document.getElementById("paymentMethod").value;


        const gateway =
            document.getElementById("gateway").value;


        if (!customer || amount <= 0) {

            showToast(
                "Please enter valid payment details."
            );

            return;
        }


        const newTransaction = {

            id:
                "TXN" +
                Math.floor(
                    1000 +
                    Math.random() * 9000
                ),

            customer: customer,

            method: method,

            gateway: gateway,

            amount: amount,

            status: "Success"

        };


        transactions.unshift(newTransaction);


        renderAll();


        this.reset();


        showToast(
            "Payment processed successfully!"
        );

    });


/* =========================================
   ADD DEMO ORDER
========================================= */

function addDemoOrder() {

    const number =
        orders.length + 1001;


    const foodOrder =
        orders.length % 2 === 0;


    const newOrder = {

        id:
            "ORD" +
            number,

        type:
            foodOrder
                ? "FOOD"
                : "RIDE",

        customer:
            foodOrder
                ? "Demo Customer"
                : "Demo Rider",

        merchant:
            foodOrder
                ? "New Restaurant"
                : "City Rides",

        amount:
            foodOrder
                ? 550
                : 280,

        status:
            foodOrder
                ? "Preparing"
                : "Completed"

    };


    orders.unshift(newOrder);


    renderAll();


    showToast(
        "New demo order created!"
    );
}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const text =
        document.getElementById("toastMessage");


    text.textContent = message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    showToast(
        "Logout action triggered."
    );
}


/* =========================================
   RENDER EVERYTHING
========================================= */

function renderAll() {

    renderDashboard();

    renderTransactions();

    renderOrders();

    renderMerchants();

    renderRefunds();

    renderSettlements();
}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderAll();

        console.log(
            "UnifiedPay frontend loaded."
        );

        console.log(
            "Backend:",
            API_BASE
        );

    }
);