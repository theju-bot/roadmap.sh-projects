const Stripe = require("stripe");

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is not set in environment variables!");
  throw new Error("Missing STRIPE_SECRET_KEY");
}

console.log(
  "✅ Stripe API Key loaded:",
  process.env.STRIPE_SECRET_KEY.substring(0, 12) + "..."
);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res, next) => {
  try {
    console.log("=== CHECKOUT SESSION DEBUG ===");
    console.log("Raw request body:", req.body);
    console.log("User from JWT:", req.user);

    const { items } = req.body;
    const userId = req.user?._id || req.userId;

    console.log("Items:", items);
    console.log("User ID:", userId);

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("ERROR: No items provided");
      return res.status(400).json({ 
        success: false,
        alert: "Your cart is empty. Please add items before checkout." 
      });
    }

    if (!userId) {
      console.log("ERROR: No user ID");
      return res.status(401).json({ 
        success: false,
        alert: "Please log in to continue with checkout." 
      });
    }

    // Validate each item
    const lineItems = items.map((item, index) => {
      console.log(`Processing item ${index}:`, item);

      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      const name = String(item.name || "Unknown Product");

      console.log(`  - Name: ${name}`);
      console.log(`  - Price: ${price}`);
      console.log(`  - Quantity: ${quantity}`);

      if (isNaN(price) || price <= 0) {
        throw new Error(`Invalid price for item: ${name} - got ${item.price}`);
      }

      if (isNaN(quantity) || quantity <= 0) {
        throw new Error(
          `Invalid quantity for item: ${name} - got ${item.quantity}`
        );
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: quantity,
      };
    });

    console.log("Final line items:", JSON.stringify(lineItems, null, 2));

    const sessionData = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      client_reference_id: String(userId),
      metadata: {
        items: JSON.stringify(items),
        userId: String(userId),
      },
      success_url: `${process.env.CLIENT_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/stripe/cancel`,
    };

    console.log(
      "Creating Stripe session with:",
      JSON.stringify(sessionData, null, 2)
    );

    const session = await stripe.checkout.sessions.create(sessionData);

    console.log("✅ Session created successfully:", session.id);

    res.json({ 
      success: true,
      url: session.url,
      alert: "Redirecting to secure checkout..." 
    });
  } catch (err) {
    console.error("❌ CHECKOUT ERROR:", err);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    
    res.status(500).json({ 
      success: false,
      alert: "Failed to create checkout session. Please try again." 
    });
  }
};

module.exports = { createCheckoutSession };