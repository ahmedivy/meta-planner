function StatusBadge({ status }) {
  const statusColor = {
    Connected: "blue",
    Connecting: "green",
    Disconnected: "red",
  };

  const color = statusColor[status];

  return (
    <div className="inline-flex gap-2 px-4 py-1 items-center">
      <span className={`w-4 h-4 rounded-full bg-${color}-500`}></span>
      <p className={`text-${color}-500 font-semibold`}>{status}</p>
    </div>
  );
}

export default StatusBadge;
