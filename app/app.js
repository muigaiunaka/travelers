// // does the same thing as an iffy function on the server side
// module.exports = function(app) {
// 	var model = require('./model/models.server.js')();

//     require ("./services/user.service.server.js")(app, model);
//     require ("./services/website.service.server.js")(app, model);
//     require ("./services/page.service.server.js")(app, model);
//     require ("./services/widget.service.server.js")(app, model);
// };

// import 'bootstrap/dist/css/bootstrap.css';
// import angular from 'angular';

// import '../style/app.css';

// let app = () => {
//   return {
//     template: require('./app.html'),
//     controller: 'AppCtrl',
//     controllerAs: 'app'
//   }
// };

// class AppCtrl {
//   constructor() {
//     this.url = 'https://github.com/preboot/angular-webpack';
//   }
// }

// const MODULE_NAME = 'app';

// angular.module(MODULE_NAME, [])
//   .directive('app', app)
//   .controller('AppCtrl', AppCtrl);

// export default MODULE_NAME;