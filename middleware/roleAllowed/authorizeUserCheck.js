export const AuthorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userrole = req.userrole;

    if (!allowedRoles.includes(userrole)) {
      return res
        .status(403)
        .json({ message: "Access denied unautherized role" });
    }
    next();
  };
};
