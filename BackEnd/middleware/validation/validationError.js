import { validationResult } from "express-validator";

const ValidationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      // type: err.type,
      value: err.value,
      message: err.msg,
      path: err.path,
      // location: err.location,
    }));
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

export default ValidationError;
