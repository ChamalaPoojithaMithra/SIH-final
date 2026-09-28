import React, { useState } from "react";
import "./AdminPaymentsScreen.css";

function AdminPaymentsScreen({ onBack }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const payments = [
    {
      id: "PAY-8001",
      transactionId: "TXN-7001",
      collector: "COL-1001",
      method: "UPI",
      amount: "₹4,800",
      date: "15 Sep 2026",
      status: "Paid",
    },
    {
      id: "PAY-8002",
      transactionId: "TXN-7002",
      collector: "COL-1003",
      method: "UPI",
      amount: "₹5,600",
      date: "15 Sep 2026",
      status: "Paid",
    },
    {
      id: "PAY-8003",
      transactionId: "TXN-7003",
      collector: "COL-1002",
      method: "Bank Transfer",
      amount: "₹3,900",
      date: "14 Sep 2026",
      status: "Pending",
    },
    {
      id: "PAY-8004",
      transactionId: "TXN-7004",
      collector: "COL-1005",
      method: "UPI",
      amount: "₹6,500",
      date: "14 Sep 2026",
      status: "Pending",
    },
    {
      id: "PAY-8005",
      transactionId: "TXN-7005",
      collector: "COL-1004",
      method: "Cash",
      amount: "₹2,520",
      date: "13 Sep 2026",
      status: "Paid",
    },
    {
      id: "PAY-8006",
      transactionId: "TXN-7006",
      collector: "COL-1001",
      method: "UPI",
      amount: "₹3,000",
      date: "13 Sep 2026",
      status: "Failed",
    },
  ];

  const filteredPayments = payments.filter((payment) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      payment.id.toLowerCase().includes(searchText) ||
      payment.transactionId.toLowerCase().includes(searchText) ||
      payment.collector.toLowerCase().includes(searchText) ||
      payment.method.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      payment.status.toLowerCase() === statusFilter;

    const matchesMethod =
      methodFilter === "all" ||
      payment.method.toLowerCase().replace(" ", "-") === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  function handleView(payment) {
    alert(
      `Payment Details\n\n` +
        `Payment ID: ${payment.id}\n` +
        `Transaction ID: ${payment.transactionId}\n` +
        `Collector ID: ${payment.collector}\n` +
        `Payment Method: ${payment.method}\n` +
        `Amount: ${payment.amount}\n` +
        `Date: ${payment.date}\n` +
        `Status: ${payment.status}`
    );
  }

  return (
    <div className="admin-payments-screen">

      {/* TOP NAVIGATION */}
      <div className="admin-payments-top">

        <button
          type="button"
          className="admin-payments-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="admin-payments-top-title">
          Payments
        </div>

      </div>

      <main className="admin-payments-container">

        {/* HEADER */}
        <div className="admin-payments-header">

          <div className="admin-payments-heading">

            <div className="admin-payments-logo">
              💳
            </div>

            <div>
              <h1>Payments</h1>

              <p>
                Monitor collector payments and payment status
              </p>
            </div>

          </div>

          <div className="admin-payments-total-box">

            <span>💳</span>

            <div>
              <strong>₹18.6L</strong>
              <small>Total Payment Value</small>
            </div>

          </div>

        </div>

        {/* SUMMARY */}
        <div className="admin-payments-summary-grid">

          <div className="admin-payments-summary-card">

            <div className="admin-payments-summary-icon">
              ✓
            </div>

            <div>
              <span>Paid</span>
              <strong>₹17.2L</strong>
            </div>

          </div>

          <div className="admin-payments-summary-card">

            <div className="admin-payments-summary-icon">
              ⏳
            </div>

            <div>
              <span>Pending</span>
              <strong>₹1.4L</strong>
            </div>

          </div>

          <div className="admin-payments-summary-card">

            <div className="admin-payments-summary-icon">
              🔄
            </div>

            <div>
              <span>Total Payments</span>
              <strong>4,920</strong>
            </div>

          </div>

          <div className="admin-payments-summary-card">

            <div className="admin-payments-summary-icon">
              ⚠️
            </div>

            <div>
              <span>Failed</span>
              <strong>18</strong>
            </div>

          </div>

        </div>

        {/* FILTERS */}
        <div className="admin-payments-filters">

          <div className="admin-payments-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search payment, transaction or collector"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            className="admin-payments-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            className="admin-payments-method-filter"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            <option value="all">All Methods</option>
            <option value="upi">UPI</option>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="admin-payments-table-card">

          <div className="admin-payments-table-heading">

            <div>
              <h2>Payment Records</h2>

              <p>
                {filteredPayments.length} payments displayed
              </p>
            </div>

          </div>

          <div className="admin-payments-table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Transaction ID</th>
                  <th>Collector ID</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredPayments.length > 0 ? (

                  filteredPayments.map((payment) => (

                    <tr key={payment.id}>

                      <td>
                        <strong className="admin-payment-id">
                          {payment.id}
                        </strong>
                      </td>

                      <td>
                        <strong className="admin-payment-transaction-id">
                          {payment.transactionId}
                        </strong>
                      </td>

                      <td>
                        <strong className="admin-payment-collector-id">
                          {payment.collector}
                        </strong>
                      </td>

                      <td>

                        <div className="admin-payment-method">

                          <span>
                            {payment.method === "UPI"
                              ? "📱"
                              : payment.method === "Cash"
                              ? "💵"
                              : "🏦"}
                          </span>

                          {payment.method}

                        </div>

                      </td>

                      <td>
                        <strong className="admin-payment-amount">
                          {payment.amount}
                        </strong>
                      </td>

                      <td>
                        {payment.date}
                      </td>

                      <td>

                        <span
                          className={`admin-payment-record-status ${payment.status.toLowerCase()}`}
                        >
                          {payment.status}
                        </span>

                      </td>

                      <td>

                        <button
                          type="button"
                          className="admin-payment-view-button"
                          onClick={() => handleView(payment)}
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="admin-payments-empty"
                    >

                      <div>

                        <span>🔍</span>

                        <strong>
                          No payment records found
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

export default AdminPaymentsScreen;