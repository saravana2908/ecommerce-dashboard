export const formatPrice = (price) =>
  `₹${(price || 0).toLocaleString("en-IN")}`;

export const truncateText = (text, maxLength = 60) =>
  text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;