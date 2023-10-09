const IsAdminRole = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role_id);
    if (!roles.includes(req.user?.role_id)) {
      return res.json({
        status: "fail",
        message: "Sorry, you are not authorized to do this.",
      });
    }
    return next();
  };
};

module.exports = IsAdminRole;
