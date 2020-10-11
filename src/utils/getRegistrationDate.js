const getRegistrationDate = (timestamp) => {
  if (timestamp) {
    return String(new Date(timestamp * 1000)).slice(0, 21);
  }
  return 'N/A';
};

export default getRegistrationDate;
