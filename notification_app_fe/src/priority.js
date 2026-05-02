const weightMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function calculatePriority(notification) {
  const weight = weightMap[notification.Type] || 0;

  const time = new Date(notification.Timestamp).getTime();
  const now = Date.now();

  const minutesOld = (now - time) / (1000 * 60);

  return weight * 1000 - minutesOld;
}