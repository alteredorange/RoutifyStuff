const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({
  origin: true,
  "Access-Control-Allow-Origin": "*",
});
//const cors = require("cors")({});
const app = express();

// TODO: Remember to set token using >> firebase functions:config:set stripe.token="sk_live_***************"
const stripe = require("stripe")(functions.config().stripe.token);

app.use(cors);

app.post("/checkout", async (req, res) => {
  try {
    //const body = await req.json();
    const body = JSON.parse(req.body);

    const amount = body.amount;

    await stripe;
    const checkoutSession = await stripe.checkout.sessions.create({
      submit_type: "donate",
      payment_method_types: ["card"],
      line_items: [
        {
          name: "Quibi Is Doomed",
          description: "Thanks mate, I can taste the croissant already!",
          images: ["https://quibi-is-doomed.web.app/croissant.png"],
          amount: amount,
          currency: "usd",
          quantity: 1,
        },
      ],
      success_url: "https://quibi-is-doomed.web.app/thanks",
      cancel_url: "https://quibi-is-doomed.web.app/cancel",
    });

    res.status(200).send(checkoutSession);
  } catch (e) {
    res.status(500).send(e);
  }
});

exports.payments = functions.https.onRequest(app);
