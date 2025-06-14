export const QueryOptions = (allowedSortFields = [], defaultSortBy) => {
  return (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";

    const order =
      req.query.order && req.query.order.toLowerCase() === "asc"
        ? "ASC"
        : "DESC";

    const sortBy =
      req.query.sortBy && allowedSortFields.includes(req.query.sortBy)
        ? req.query.sortBy
        : allowedSortFields[0];
    req.queryOptions = { order, sortBy, page, limit, offset, search };
    next();
  };
};
