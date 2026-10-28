// Key order is the order categories appear in dropdowns
export const CATEGORY_COLORS = {
  food: "#C98A2B",
  housing: "#34528F",
  utilities: "#2B8A86",
  transport: "#7656A3",
  entertainment: "#BF5277",
  salary: "#5D7D36",
  other: "#8A929C",
};

export const CATEGORIES = Object.keys(CATEGORY_COLORS);

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

// Today's date as "YYYY-MM-DD" in local time (toISOString would give the UTC date)
export const todayISO = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};
