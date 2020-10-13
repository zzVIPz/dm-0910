const getTimeStamp = (date) => {
  const time = date ? new Date(date) : new Date();
  return Math.floor(time.getTime() / 1000);
};

export default getTimeStamp;
