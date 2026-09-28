import React, { useState } from "react";
import "./CollectorManagementScreen.css";

function CollectorManagementScreen({ onBack }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const collectors = [
    {
      id: "COL-1001",
      name: "Ravi Kumar",
      phone: "9876543210",
      location: "Vijayawada",
      lots: 12,
      weight: "86 kg",
      status: "Active"
    },
    {
      id: "COL-1002",
      name: "Suresh",
      phone: "9123456780",
      location: "Guntur",
      lots: 8,
      weight: "54 kg",
      status: "Active"
    },
    {
      id: "COL-1003",
      name: "Anitha",
      phone: "9988776655",
      location: "Nuzvid",
      lots: 15,
      weight: "102 kg",
      status: "Active"
    },
    {
      id: "COL-1004",
      name: "Ramesh",
      phone: "9012345678",
      location: "Tenali",
      lots: 5,
      weight: "31 kg",
      status: "Inactive"
    },
    {
      id: "COL-1005",
      name: "Lakshmi",
      phone: "9345678123",
      location: "Vijayawada",
      lots: 10,
      weight: "72 kg",
      status: "Active"
    }
  ];

  const filteredCollectors = collectors.filter((collector) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      collector.name.toLowerCase().includes(searchText) ||
      collector.id.toLowerCase().includes(searchText) ||
      collector.phone.includes(search) ||
      collector.location.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      collector.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleView(collector) {
    alert(
      `Collector Details\n\n` +
      `ID: ${collector.id}\n` +
      `Name: ${collector.name}\n` +
      `Phone: ${collector.phone}\n` +
      `Location: ${collector.location}\n` +
      `E-Waste Lots: ${collector.lots}\n` +
      `Total Weight: ${collector.weight}\n` +
      `Status: ${collector.status}`
    );
  }

  return (
    <div className="collector-management-screen">

      {/* TOP NAVIGATION */}

      <div className="collector-management-top">

        <button
          type="button"
          className="collector-management-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="collector-management-top-title">
          Collector Management
        </div>

      </div>

      {/* MAIN CONTENT */}

      <main className="collector-management-container">

        {/* HEADER */}

        <div className="collector-management-header">

          <div className="collector-management-heading">

            <div className="collector-management-logo">
              👥
            </div>

            <div>
              <h1>
                Collector Management
              </h1>

              <p>
                View and manage registered e-waste collectors
              </p>
            </div>

          </div>

          <div className="collector-management-total">

            <span>
              👥
            </span>

            <div>
              <strong>
                1,284
              </strong>

              <small>
                Total Collectors
              </small>
            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="collector-summary-grid">

          <div className="collector-summary-card">

            <div className="collector-summary-icon">
              👥
            </div>

            <div>
              <span>
                Total Collectors
              </span>

              <strong>
                1,284
              </strong>
            </div>

          </div>

          <div className="collector-summary-card">

            <div className="collector-summary-icon">
              ✓
            </div>

            <div>
              <span>
                Active Collectors
              </span>

              <strong>
                1,156
              </strong>
            </div>

          </div>

          <div className="collector-summary-card">

            <div className="collector-summary-icon">
              📦
            </div>

            <div>
              <span>
                Active Lots
              </span>

              <strong>
                342
              </strong>
            </div>

          </div>

          <div className="collector-summary-card">

            <div className="collector-summary-icon">
              ⚖️
            </div>

            <div>
              <span>
                Collected Weight
              </span>

              <strong>
                18.4 T
              </strong>
            </div>

          </div>

        </div>

        {/* FILTERS */}

        <div className="collector-filters">

          <div className="collector-search-box">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by name, ID, phone or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="collector-status-filter"
          >
            <option value="all">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

        </div>

        {/* TABLE */}

        <div className="collector-table-card">

          <div className="collector-table-title">

            <div>
              <h2>
                Registered Collectors
              </h2>

              <p>
                {filteredCollectors.length} collectors displayed
              </p>
            </div>

          </div>

          <div className="collector-table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Collector ID</th>
                  <th>Collector</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Lots</th>
                  <th>Weight</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredCollectors.length > 0 ? (

                  filteredCollectors.map((collector) => (

                    <tr key={collector.id}>

                      <td>
                        <strong className="collector-id">
                          {collector.id}
                        </strong>
                      </td>

                      <td>

                        <div className="collector-name-cell">

                          <div className="collector-avatar">
                            {collector.name.charAt(0)}
                          </div>

                          <span>
                            {collector.name}
                          </span>

                        </div>

                      </td>

                      <td>
                        {collector.phone}
                      </td>

                      <td>
                        📍 {collector.location}
                      </td>

                      <td>
                        {collector.lots}
                      </td>

                      <td>
                        <strong>
                          {collector.weight}
                        </strong>
                      </td>

                      <td>

                        <span
                          className={
                            collector.status === "Active"
                              ? "collector-status active"
                              : "collector-status inactive"
                          }
                        >
                          {collector.status}
                        </span>

                      </td>

                      <td>

                        <button
                          type="button"
                          className="collector-view-button"
                          onClick={() => handleView(collector)}
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
                      className="collector-empty"
                    >

                      <div>

                        <span>
                          🔍
                        </span>

                        <strong>
                          No collectors found
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

export default CollectorManagementScreen;