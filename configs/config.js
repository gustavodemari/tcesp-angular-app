module.exports = {
  server : {
    HOST : process.env.NODEJS_HOST || 'localhost',
    PORT : process.env.NODEJS_PORT || 3000,
    CORS_SETUP : function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    }
  }
}