const HttpCode = {
  200: { status: "OK", code: 200 },
  201: { status: "Created", code: 201 },
  400: { status: "Bad Request", code: 400 },
  401: { status: "Unauthorized", code: 401 },
  403: { status: "Forbidden", code: 403 },
  404: { status: "Not Found", code: 404 },
  409: { status: "Conflict", code: 409 },
  500: { status: "Internal Server Error", code: 500 },
};

export default HttpCode;
