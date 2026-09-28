import React, { useState } from "react";
import "./AdminTransactionsScreen.css";

function AdminTransactionsScreen({ onBack }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const transactions = [
    {
      id: "TXN-7001",
      collector: "COL-1001",
      recycler: "Green Earth Recycling",
      material: "Mobile Phones",
      weight: "12 kg",
      amount: "₹4,800",
      date: "15 Sep 2026",
      status: "Completed",
      payment: "Paid",
    },
    {
      id: "TXN-7002",
      collector: "COL-1003",
      recycler: "Clean Cycle Solutions",
      material: "Laptops",
      weight: "8 kg",
      amount: "₹5,600",
      date: "15 Sep 2026",
      status: "Completed",
      payment: "Paid",
    },
    {
      id: "TXN-7003",
      collector: "COL-1002",
      recycler: "Eco Metal Recyclers",
      material: "Computer Parts",
      weight: "18 kg",
      amount: "₹3,900",
      date: "14 Sep 2026",
      status: "Completed",
      payment: "Pending",
    },
    {
      id: "TXN-7004",
      collector: "COL-1005",
      recycler: "Green Earth Recycling",
      material: "TV / Monitors",
      weight: "25 kg",
      amount: "₹6,500",
      date: "14 Sep 2026",
      status: "Pickup",
      payment: "Pending",
    },
    {
      id: "TXN-7005",
      collector: "COL-1004",
      recycler: "Safe E-Waste Center",
      material: "Batteries",
      weight: "6 kg",
      amount: "₹2,520",
      date: "13 Sep 2026",
      status: "Completed",
      payment: "Paid",
    },
    {
      id: "TXN-7006",
      collector: "COL-1001",
      recycler: "Future Recycling Hub",
      material: "Cables",
      weight: "10 kg",
      amount: "₹3,000",
      date: "13 Sep 2026",
      status: "Cancelled",
      payment: "Not Paid",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      transaction.id.toLowerCase().includes(searchText) ||
      transaction.collector.toLowerCase().includes(searchText) ||
      transaction.recycler.toLowerCase().includes(searchText) ||
      transaction.material.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      transaction.status.toLowerCase() === statusFilter;

    const matchesPayment =
      paymentFilter === "all" ||
      transaction.payment.toLowerCase().replace(" ", "-") === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  function handleView(transaction) {
    alert(
      `Transaction Details\n\n` +
        `Transaction ID: ${transaction.id}\n` +
        `Collector ID: ${transaction.collector}\n` +
        `Recycler: ${transaction.recycler}\n` +
        `Material: ${transaction.material}\n` +
        `Weight: ${transaction.weight}\n` +
        `Amount: ${transaction.amount}\n` +
        `Date: ${transaction.date}\n` +
        `Transaction Status: ${transaction.status}\n` +
        `Payment Status: ${transaction.payment}`
    );
  }

  return (
    <div className="admin-transactions-screen">

      {/* TOP NAVIGATION */}
      <div className="admin-transactions-top">

        <button
          type="button"
          className="admin-transactions-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="admin-transactions-top-title">
          Transactions
        </div>

      </div>

      <main className="admin-transactions-container">

        {/* HEADER */}
        <div className="admin-transactions-header">

          <div className="admin-transactions-heading">

            <div className="admin-transactions-logo">
              🔄
            </div>

            <div>
              <h1>Transactions</h1>

              <p>
                Monitor e-waste transactions and payment activity
              </p>
            </div>

          </div>

          <div className="admin-transactions-total-box">

            <span>🔄</span>

            <div>
              <strong>4,920</strong>
              <small>Total Transactions</small>
            </div>

          </div>

        </div>

        {/* SUMMARY */}
        <div className="admin-transactions-summary-grid">

          <div className="admin-transactions-summary-card">

            <div className="admin-transactions-summary-icon">
              ✓
            </div>

            <div>
              <span>Completed</span>
              <strong>4,720</strong>
            </div>

          </div>

          <div className="admin-transactions-summary-card">

            <div className="admin-transactions-summary-icon">
              ⏳
            </div>

            <div>
              <span>Pending</span>
              <strong>182</strong>
            </div>

          </div>

          <div className="admin-transactions-summary-card">

            <div className="admin-transactions-summary-icon">
              💰
            </div>

            <div>
              <span>Total Value</span>
              <strong>₹18.6L</strong>
            </div>

          </div>

          <div className="admin-transactions-summary-card">

            <div className="admin-transactions-summary-icon">
              💳
            </div>

            <div>
              <span>Pending Payments</span>
              <strong>18</strong>
            </div>

          </div>

        </div>

        {/* FILTERS */}
        <div className="admin-transactions-filters">

          <div className="admin-transactions-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search transaction, collector, recycler or material"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            className="admin-transactions-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="completed">Completed</option>
            <option value="pickup">Pickup</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            className="admin-transactions-payment-filter"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="not-paid">Not Paid</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="admin-transactions-table-card">

          <div className="admin-transactions-table-heading">

            <div>
              <h2>Transaction Records</h2>

              <p>
                {filteredTransactions.length} transactions displayed
              </p>
            </div>

          </div>

          <div className="admin-transactions-table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Collector</th>
                  <th>Recycler</th>
                  <th>Material</th>
                  <th>Weight</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredTransactions.length > 0 ? (

                  filteredTransactions.map((transaction) => (

                    <tr key={transaction.id}>

                      <td>
                        <strong className="admin-transaction-id">
                          {transaction.id}
                        </strong>
                      </td>

                      <td>
                        <strong className="admin-collector-id">
                          {transaction.collector}
                        </strong>
                      </td>

                      <td>
                        {transaction.recycler}
                      </td>

                      <td>
                        <div className="admin-transaction-material">
                          <span>♻️</span>
                          {transaction.material}
                        </div>
                      </td>

                      <td>
                        <strong>
                          {transaction.weight}
                        </strong>
                      </td>

                      <td>
                        <strong className="admin-transaction-amount">
                          {transaction.amount}
                        </strong>
                      </td>

                      <td>
                        {transaction.date}
                      </td>

                      <td>
                        <span
                          className={`admin-transaction-status ${transaction.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {transaction.status}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`admin-payment-status ${transaction.payment
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {transaction.payment}
                        </span>
                      </td>

                      <td>

                        <button
                          type="button"
                          className="admin-transaction-view-button"
                          onClick={() => handleView(transaction)}
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="10"
                      className="admin-transactions-empty"
                    >

                      <div>

                        <span>🔍</span>

                        <strong>
                          No transactions found
                        </strong>

                        <p>
                          Try changing your search or filters.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminTransactionsScreen;