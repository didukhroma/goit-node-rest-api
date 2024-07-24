const prepareMessage = (message) => {
  const preparedMessage = message.split(":")[1].split(",")[0].trim();
  return preparedMessage[0].toUpperCase() + preparedMessage.slice(1);
};

export default prepareMessage;
