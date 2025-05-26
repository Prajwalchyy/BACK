import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    return res
      .status(429)
      .json({ message: "To many wrong Cardinals retry in 60 second" });
  },
  //   message: "To many Wrong cardinals Pleae try again after a minute",
});

export default limiter;
