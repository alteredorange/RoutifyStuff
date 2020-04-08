const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({
  origin: true,
  "Access-Control-Allow-Origin": "*",
});
//const cors = require("cors")({});
const app = express();

// TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const stripe = require("stripe")(functions.config().stripe.token);

app.use(cors);

// function send(res, code, body) {
//   res.send({
//     statusCode: code,
//     headers: { "Access-Control-Allow-Origin": "*" },
//     body: JSON.stringify(body),
//   });
// }

app.post("/test", (req, res) => {
  // Catch any unexpected errors to prevent crashing
  try {
    res.send("hi");

    // send(res, 200, {
    //   response: `this one worked.`,
    // });
  } catch (e) {
    console.log(e);
    res.status(500).send("arrrrg");
    // send(res, 500, {
    //   error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    // });
  }
});

app.post("/checkout", async (req, res) => {
  try {
    //const body = await req.json();
    const body = JSON.parse(req.body);
    // console.log("hi");
    const amount = body.amount;

    // const { amount, name } = req.body;
    //console.log(amount, req.body);
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
      success_url:
        "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://example.com/cancel",
    });
    //   send(res, 200, {
    //     message: "Success",
    //   }).catch((err) => {
    //     console.log(err);
    //     send(res, 500, {
    //       error: err.message,
    //     });
    //   });
    res.status(200).send(checkoutSession);
  } catch (e) {
    // console.log(e);
    res.status(500).send("ahhhhhh");
    // send(res, 500, {
    //   error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    // });
  }
});

// function donate() {
//   (async () => {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           name: "T-shirt",
//           description: "Comfortable cotton t-shirt",
//           images: ["https://example.com/t-shirt.png"],
//           amount: 500,
//           currency: "usd",
//           quantity: 1,
//         },
//       ],
//       success_url:
//         "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "https://example.com/cancel",
//     });
//   })();
// }

// function charge(req, res) {
//   const body = JSON.parse(req.body);
//   const token = body.token.id;
//   const amount = body.charge.amount;
//   const currency = body.charge.currency;

//   // Charge card
//   stripe.charges
//     .create({
//       amount,
//       currency,
//       description: "Firebase Example",
//       source: token,
//     })
//     .then((charge) => {
//       send(res, 200, {
//         message: "Success",
//         charge,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       send(res, 500, {
//         error: err.message,
//       });
//     });
// }

// //app.use(cors);
// app.post("/", (req, res) => {
//   // Catch any unexpected errors to prevent crashing
//   try {
//     charge(req, res);
//   } catch (e) {
//     console.log(e);
//     send(res, 500, {
//       error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
//     });
//   }
// });

// exports.charge = functions.https.onRequest(app);
// exports.donate = functions.https.onRequest(app);
exports.payments = functions.https.onRequest(app);
