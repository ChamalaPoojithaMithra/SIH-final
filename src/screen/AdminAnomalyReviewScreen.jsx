import React, { useState } from "react";
import "./AdminAnomalyReviewScreen.css";

function AdminAnomalyReviewScreen({ onBack }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [anomalies, setAnomalies] = useState([
    {
      id: "ANM-3001",
      transaction: "TXN-7003",
      collector: "COL-1002",
      recycler: "Eco Metal Recyclers",
      issue: "Unusual price difference",
      detected: "₹650/kg",
      reference: "₹380/kg",
      status: "Review",
    },
    {
      id: "ANM-3002",
      transaction: "TXN-7012",
      collector: "COL-1010",
      recycler: "Green Earth Recycling",
      issue: "Weight variation",
      detected: "32 kg",
      reference: "20 kg",
      status: "Review",
    },
    {
      id: "ANM-3003",
      transaction: "TXN-7021",
      collector: "COL-1022",
      recycler: "Clean Cycle Solutions",
      issue: "Repeated transaction pattern",
      detected: "5 transactions",
      reference: "2 transactions",
      status: "Needs Investigation",
    },
    {
      id: "ANM-3004",
      transaction: "TXN-7030",
      collector: "COL-1031",
      recycler: "Safe E-Waste Center",
      issue: "Location mismatch",
      detected: "18 km",
      reference: "5 km",
      status: "Reviewed",
    },
    {
      id: "ANM-3005",
      transaction: "TXN-7038",
      collector: "COL-1042",
      recycler: "Future Recycling Hub",
      issue: "Unusual transaction frequency",
      detected: "9 lots/day",
      reference: "4 lots/day",
      status: "Review",
    },
  ]);

  const filteredAnomalies = anomalies.filter((anomaly) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      anomaly.id.toLowerCase().includes(searchText) ||
      anomaly.transaction.toLowerCase().includes(searchText) ||
      anomaly.collector.toLowerCase().includes(searchText) ||
      anomaly.recycler.toLowerCase().includes(searchText) ||
      anomaly.issue.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      anomaly.status.toLowerCase().replace(" ", "-") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function updateStatus(id, newStatus) {
    setAnomalies((previous) =>
      previous.map((anomaly) =>
        anomaly.id === id
          ? { ...anomaly, status: newStatus }
          : anomaly
      )
    );
  }

  function handleReview(anomaly) {
    alert(
      `Anomaly Review\n\n` +
        `Anomaly ID: ${anomaly.id}\n` +
        `Transaction: ${anomaly.transaction}\n` +
        `Collector: ${anomaly.collector}\n` +
        `Recycler: ${anomaly.recycler}\n` +
        `Issue: ${anomaly.issue}\n` +
        `Detected Value: ${anomaly.detected}\n` +
        `Reference Value: ${anomaly.reference}\n` +
        `Status: ${anomaly.status}\n\n` +
        `This activity requires admin review.`
    );
  }

  return (
    <div className="admin-anomaly-screen">

      {/* TOP NAVIGATION */}

      <div className="admin-anomaly-top">

        <button
          type="button"
          className="admin-anomaly-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="admin-anomaly-top-title">
          Anomaly Review
        </div>

      </div>

      <main className="admin-anomaly-container">

        {/* HEADER */}

        <div className="admin-anomaly-header">

          <div className="admin-anomaly-heading">

            <div className="admin-anomaly-logo">
              ⚠️
            </div>

            <div>
              <h1>Anomaly Review</h1>

              <p>
                Review unusual activity and transaction patterns
              </p>
            </div>

          </div>

          <div className="admin-anomaly-total-box">

            <span>⚠️</span>

            <div>
              <strong>24</strong>
              <small>Open Reviews</small>
            </div>

          </div>

        </div>

        {/* IMPORTANT NOTE */}

        <div className="admin-anomaly-note">

          <span>ℹ️</span>

          <div>
            <strong>Review required</strong>

            <p>
              An anomaly is only a signal for review. It does not
              automatically mean fraud or wrongdoing.
            </p>
          </div>

        </div>

        {/* SUMMARY */}

        <div className="admin-anomaly-summary-grid">

          <div className="admin-anomaly-summary-card">

            <div className="admin-anomaly-summary-icon">
              ⚠️
            </div>

            <div>
              <span>Open Reviews</span>
              <strong>24</strong>
            </div>

          </div>

          <div className="admin-anomaly-summary-card">

            <div className="admin-anomaly-summary-icon">
              🔎
            </div>

            <div>
              <span>Needs Investigation</span>
              <strong>7</strong>
            </div>

          </div>

          <div className="admin-anomaly-summary-card">

            <div className="admin-anomaly-summary-icon">
              ✓
            </div>

            <div>
              <span>Reviewed</span>
              <strong>86</strong>
            </div>

          </div>

          <div className="admin-anomaly-summary-card">

            <div className="admin-anomaly-summary-icon">
              📊
            </div>

            <div>
              <span>Total Signals</span>
              <strong>110</strong>
            </div>

          </div>

        </div>

        {/* FILTERS */}

        <div className="admin-anomaly-filters">

          <div className="admin-anomaly-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search anomaly, transaction, collector or issue"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="review">Review</option>
            <option value="needs-investigation">
              Needs Investigation
            </option>
            <option value="reviewed">Reviewed</option>
          </select>

        </div>

        {/* TABLE */}

        <div className="admin-anomaly-table-card">

          <div className="admin-anomaly-table-heading">

            <div>
              <h2>Activity Signals</h2>

              <p>
                {filteredAnomalies.length} signals displayed
              </p>
            </div>

          </div>

          <div className="admin-anomaly-table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Anomaly ID</th>
                  <th>Transaction</th>
                  <th>Collector</th>
                  <th>Recycler</th>
                  <th>Issue</th>
                  <th>Detected</th>
                  <th>Reference</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredAnomalies.length > 0 ? (

                  filteredAnomalies.map((anomaly) => (

                    <tr key={anomaly.id}>

                      <td>
                        <strong className="admin-anomaly-id">
                          {anomaly.id}
                        </strong>
                      </td>

                      <td>
                        <strong>
                          {anomaly.transaction}
                        </strong>
                      </td>

                      <td>
                        {anomaly.collector}
                      </td>

                      <td>
                        {anomaly.recycler}
                      </td>

                      <td>

                        <div className="admin-anomaly-issue">

                          <span>⚠️</span>

                          <span>
                            {anomaly.issue}
                          </span>

                        </div>

                      </td>

                      <td>
                        <strong>
                          {anomaly.detected}
                        </strong>
                      </td>

                      <td>
                        {anomaly.reference}
                      </td>

                      <td>

                        <span
                          className={`admin-anomaly-status ${anomaly.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {anomaly.status}
                        </span>

                      </td>

                      <td>

                        <div className="admin-anomaly-actions">

                          <button
                            type="button"
                            className="admin-anomaly-view-button"
                            onClick={() =>
                              handleReview(anomaly)
                            }
                          >
                            Review
                          </button>

                          {anomaly.status !== "Reviewed" && (

                            <button
                              type="button"
                              className="admin-anomaly-reviewed-button"
                              onClick={() =>
                                updateStatus(
                                  anomaly.id,
                                  "Reviewed"
                                )
                              }
                            >
                              Mark Reviewed
                            </button>

                          )}

                          {anomaly.status === "Review" && (

                            <button
                              type="button"
                              className="admin-anomaly-investigate-button"
                              onClick={() =>
                                updateStatus(
                                  anomaly.id,
                                  "Needs Investigation"
                                )
                              }
                            >
                              Investigate
                            </button>

                          )}

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="9"
                      className="admin-anomaly-empty"
                    >

                      <div>

                        <span>🔍</span>

                        <strong>
                          No anomaly signals found
                        </strong>

                        <p>
                          Try changing your search or filter.
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

export default AdminAnomalyReviewScreen;