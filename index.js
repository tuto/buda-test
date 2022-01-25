'use strict';
const yargs = require("yargs");

const Routes = require('./src/routes.js')

const options = yargs
 .usage("Modo de uso: -f <first> -l <last> -c <train-color>(optional)")
 .option("f", { alias: "first", describe: "estacion de inicio", type: "string", demandOption: true })
 .option("l", { alias: "last", describe: "estacion de fin", type: "string", demandOption: true })
 .option("c", { alias: "colorTrain", describe: "color del tren", type: "string", default:"nc"})
 .argv;

const find = (first, last, colorTrain) => {
    const RoutesObj = new Routes(last)
    const routes = RoutesObj.getRoutes(first, "-", colorTrain, []);
    const bestRoute  = RoutesObj.getBestRoute(last, colorTrain, routes, []);
    RoutesObj.printRoute(bestRoute);
}
find(options.first, options.last, options.colorTrain);

