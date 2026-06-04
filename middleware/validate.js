module.exports = (validator, route) => {
  return async (req, res, next) => {
    try {
      await validator.validate(req.body, { abortEarly: true });
      next();
    } catch (error) {
      req.flash("error", error.errors);
      return res.redirect(route);
    }
  };
};
