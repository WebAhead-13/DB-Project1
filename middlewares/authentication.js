
function checkAuth(req, res, next) {
    const user = req.user;
    if (!user) {
      res.redirect('/log-in');
    } else {
      next();
    }
  }

  module.exports = checkAuth;