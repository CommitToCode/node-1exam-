module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    req.flash('error', error.details[0].message);
    return res.redirect('back');
  }
  next();
};
