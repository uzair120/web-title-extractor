// Utility function to ensure URL is properly formatted
exports.formatUrl = (address) => {
  return address.startsWith("http") ? address : `http://${address}`;
};
