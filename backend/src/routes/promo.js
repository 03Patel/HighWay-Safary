const express = require("express");
const router = express.Router();

router.post("/validate", (req, res) => {
  const { promoCode, total } = req.body;

  
  const promos = {
    SAVE10: { type: "percent", value: 10 },   
    FLAT100: { type: "flat", value: 100 },    
  };

  if (!promoCode || !promos[promoCode]) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid promo code." });
  }

  const promo = promos[promoCode];
  let discount = 0;

  if (promo.type === "percent") {
    discount = (total * promo.value) / 100;
  } else {
    discount = promo.value;
  }

  const newTotal = Math.max(total - discount, 0);

  res.json({
    success: true,
    promoCode,
    discount: Math.round(discount),
    newTotal,
    message: `Promo applied! You saved ₹${Math.round(discount)}.`,
  });
});

module.exports = router;
