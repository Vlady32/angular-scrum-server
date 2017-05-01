module.exports = function (apiRoutes) {
  require('./auth')(apiRoutes);
  require('./checkTokenMDW')(apiRoutes);
  require('./project')(apiRoutes);
  require('./sprint')(apiRoutes);
  require('./items')(apiRoutes);
};