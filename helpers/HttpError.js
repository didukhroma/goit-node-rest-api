import HttpCode from './HttpCode.js';

const HttpError = (status, message = HttpCode[status].status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
