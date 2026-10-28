export const CATEGORY_COLORS = {
  housing: "#34528F",
  food: "#C98A2B",
  utilities: "#2B8A86",
  transport: "#7656A3",
  entertainment: "#BF5277",
  salary: "#5D7D36",
  other: "#8A929C",
};

export const categoryColor = (category) => CATEGORY_COLORS[category] ?? CATEGORY_COLORS.other;

export const categoryLabel = (category) => category.charAt(0).toUpperCase() + category.slice(1);

export const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

// Parse "YYYY-MM-DD" as a local date so it doesn't shift a day in negative UTC offsets
export const formatDate = (isoDate) => {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
