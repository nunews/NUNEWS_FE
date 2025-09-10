export const Tooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "12px",
          fontSize: "13px",
          boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        {payload.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 0",
              color: "var(--color-gray-100)",
              fontWeight: "400",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: entry.color,
              }}
            />
            <span>
              {entry.name} : {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
