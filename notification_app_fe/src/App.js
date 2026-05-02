import { useEffect, useState } from "react";
import "./App.css"; // IMPORTANT

import { getToken } from "./auth";
import { setToken, Log } from "./logging_middleware/log";
import { fetchNotifications } from "./api";
import { calculatePriority } from "./priority";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [viewed, setViewed] = useState(new Set());

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    async function load() {
      try {
        const token = await getToken();
        setToken(token);

        await Log("frontend", "info", "component", "App initialized");

        const data = await fetchNotifications(token, page, 10, filter);

        const sorted = data.sort(
          (a, b) => calculatePriority(b) - calculatePriority(a)
        );

        setNotifications(sorted);
      } catch {
        await Log("frontend", "error", "component", "Load failed");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filter, page]);

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter(n => n.Type === filter);

  return (
    <div className="container">
      <h1 className="title">Notification Center</h1>

      <div className="controls">
        <label>Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Event</option>
          <option>Result</option>
          <option>Placement</option>
        </select>

        <label>Top N:</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        />
      </div>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No notifications available (API returned empty)</p>
      ) : (
        filtered.slice(0, limit).map(n => {
          const isViewed = viewed.has(n.ID);

          const typeClass =
            n.Type === "Placement"
              ? "placement"
              : n.Type === "Result"
              ? "result"
              : "event";

          return (
            <div
              key={n.ID}
              className={`card ${typeClass} ${isViewed ? "viewed" : ""}`}
              onClick={() => {
                setViewed(prev => new Set(prev).add(n.ID));
                Log("frontend", "info", "component", "Viewed " + n.ID);
              }}
            >
              <strong>{n.Type}</strong>
              <p>{n.Message}</p>
              <small>{n.Timestamp}</small>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;