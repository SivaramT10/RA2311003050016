import { Log } from "./logging_middleware/log";

const BASE_URL = "http://20.207.122.201/evaluation-service/notifications";

export async function fetchNotifications(token, page, limit, type) {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(type !== "All" && { notification_type: type }),
    });

    await Log("frontend", "info", "api", "Fetching notifications");

    const res = await fetch(`${BASE_URL}?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await Log("frontend", "info", "api", "API status: " + res.status);

    const data = await res.json();

    if (data?.notifications) return data.notifications;
    if (data?.data) return data.data;
    if (Array.isArray(data)) return data;

    return [];
  } catch {
    await Log("frontend", "error", "api", "API request failed");
    return [];
  }
}