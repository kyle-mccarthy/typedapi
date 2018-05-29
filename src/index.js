"use strict";
exports.__esModule = true;
var bootstrap_1 = require("@src/lib/bootstrap");
// tslint:disable-next-line
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
routing_controllers_1.useContainer(typedi_1.Container);
bootstrap_1.bootstrap();
// useKoaServer(app, {
//   cors: true,
//   controllers: [__dirname + '/controllers/*.ts'],
//   defaults: {
//     nullResultCode: 404,
//     undefinedResultCode: 204,
//   }
// });
