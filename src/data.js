export const API_KEY = "AIzaSyBcvleDAAU0-vPkFQXDKYs2IFcOJEilRGk";

export const value_converter = (value) => {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + "B";
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + "M";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + "K";
  } else {
    return value.toString();
  }
};

export const formatSubscribers = (count) => {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(1) + "K";
  return count;
};

