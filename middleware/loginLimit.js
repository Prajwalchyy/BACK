import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  keyGenerator: (req, res) => {
    console.log(req.body.email);
    return req.body.email;
  },
  handler: (req, res) => {
    return res
      .status(429)
      .json({ message: "To many wrong Cardinals retry in 60 second" });
  },
});

export default limiter;
