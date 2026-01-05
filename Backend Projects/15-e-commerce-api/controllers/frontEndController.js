const verifyJWT = require("../middleware/verifyJWT");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const renderLoginPage = (req, res, next) => {
  try {
    if (req.cookies?.jwt) {
      verifyJWT(req, res, next);
      return res.render("alert", {
        title: "Account already logged in",
        message: "Account is already logged in",
        details: "Welcome Again User!",
        type: "success",
        statusCode: 200,
        redirectUrl: "/products",
      
        redirectDelay: 1,
      });
    }
    res.render("login", {
      page: "login",
    });
  } catch (err) {
    next(err);
  }
};

const renderRegisterPage = (req, res, next) => {
  try {
    res.render("login", {
      page: "register",
    });
  } catch (err) {
    next(err);
  }
};

const paymentSuccess = async (req, res, next) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.redirect("/cancel");
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.redirect("/cancel");
    }

    return res.render("alert", {
      title: "Payment Successful 🎉",
      message: "Your payment was completed successfully",
      details: "Thank you for your purchase!",
      type: "success",
      statusCode: 200,
      redirectUrl: "/products",
      redirectDelay: 2,
    });
  } catch (err) {
    next(err);
  }
};

const paymentCancel = (req, res) => {
  return res.render("alert", {
    title: "Payment Cancelled",
    message: "You cancelled the payment",
    details: "No money was charged to your account",
    type: "error",
    statusCode: 400,
    redirectUrl: "/cart",
    redirectDelay: 2,
  });
};

module.exports = {
  renderLoginPage,
  renderRegisterPage,
  paymentSuccess,
  paymentCancel,
};
