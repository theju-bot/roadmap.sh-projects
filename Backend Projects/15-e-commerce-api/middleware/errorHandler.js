/* const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)

    const statusCode = err.statusCode || 500; */
/* res.status(statusCode).json({ statusCode, message: err.message }); */
/*     return res.render("alert", {
      title: "Server Error",
      message: "An error occurred",
      details: err.message,
      type: "error",
      statusCode: 500,
      redirectUrl: "/",
      redirectDelay: 100
    });
}

module.exports = errorHandler; */

const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name || "Error"}: ${err.message}`, "errLog.txt");
  console.error(err.stack);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode);

  let message = "An unexpected error occurred";
  let details = null;

  if (process.env.NODE_ENV === "development") {
    message = err.message || message;
    details = err.stack || err.message;
  } else {
    statusCode === 400
      ? (message = "Bad Request")
      : statusCode === 401
      ? (message = "Unauthorized")
      : statusCode === 403
      ? (message = "Forbidden")
      : statusCode === 404
      ? (message = "Page Not Found")
      : statusCode === 409
      ? (message = "Conflict")
      : statusCode >= 500
      ? (message = "Internal Server Error")
      : null;
  }

  if (req.xhr || req.headers.accept?.includes("application/json")) {
    return res.json({
      success: false,
      statusCode,
      message: process.env.NODE_ENV === "development" ? err.message : message,
    });
  }

  return res.render("alert", {
    title: httpStatusText(statusCode) || "Error",
    message: message,
    details: details,
    type: "error",
    statusCode: statusCode,
    redirectUrl: "/",
    redirectDelay: statusCode >= 500 ? 8 : 5,
  });
};

function httpStatusText(code) {
  const statusTexts = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    409: "Conflict",
    422: "Unprocessable Entity",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
  };
  return statusTexts[code] || null;
}

module.exports = errorHandler;
