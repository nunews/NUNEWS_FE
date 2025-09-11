export const CustomTooltip = ({
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
          position: "relative",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "10px 12px",
          fontSize: "13px",
          boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* 말풍선 화살표?*/}
        <div
          style={{
            position: "absolute",
            top: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0",
            height: "0",
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "6px solid white",
          }}
        />
        {payload.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "4px 0",
              color: "var(--color-gray-100)",
              fontSize: "13px",
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
