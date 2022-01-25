var assert = require('assert');
const fs = require('fs');
const stdout = require("test-console").stdout;

const Routes = require('../src/routes.js')
const Point = require('../src/point.js');

let data = {}
before(async function() {
    const rawdata = fs.readFileSync('test/resources/test.json');
    data = JSON.parse(rawdata);
});

describe('Routes', function() {
  describe('#getRoute', function() {
    it('should return the best route from file', function() {
        const last = "f";
        const first = "c";
        const colorTrain = "r";
        const RoutesObj = new Routes(last)
        RoutesObj.data = data;
        const routes = RoutesObj.getRoutes(first, "-", colorTrain, []);
        const bestRoute  = RoutesObj.getBestRoute(last, colorTrain, routes, []);
        assert.deepEqual(bestRoute, ['c', 'h', 'f']);
    });
    it('should return the best route from array', function() {
        const last = "f";
        const colorTrain = "r";
        const routes = [
            new Point ('c', 0, '-' ),
            new Point ('d', 1, 'c' ),
            new Point ('e', 2, 'd' ),
            new Point ('f', 2, 'h' ),
            new Point ('h', 1, 'c' ),
            new Point ('b', 1, 'c' ),
            new Point ('a', 2, 'b' )
          ]
        const RoutesObj = new Routes(last)
        const bestRoute  = RoutesObj.getBestRoute(last, colorTrain, routes, []);
        assert.deepEqual(bestRoute, ['c', 'h', 'f']);
    });
    it('should not return if arrival station is not correct', function() {
        const inspect = stdout.inspect();
        const last = "i";
        const first = "c";
        const colorTrain = "r";
        const RoutesObj = new Routes(last)
        RoutesObj.data = data;
        const routes = RoutesObj.getRoutes(first, "-", colorTrain, []);
        inspect.restore();
        assert.equal(routes, undefined);
        assert.deepEqual(inspect.output, [ "La estación de llegada tiene que ser del color del tren[r] o sin color[nc]\n" ]);
    });
  });
  describe('#printRoute', function() {
    it('should print the best route from file', function() {
        const inspect = stdout.inspect();
        const last = "f";
        const first = "c";
        const colorTrain = "r";
        const RoutesObj = new Routes(last)
        RoutesObj.data = data;
        const routes = RoutesObj.getRoutes(first, "-", colorTrain, []);
        const bestRoute  = RoutesObj.getBestRoute(last, colorTrain, routes, []);
        RoutesObj.printRoute(bestRoute);
        inspect.restore();
        assert.deepEqual(inspect.output, ['\n','RUTA: c->h->f\n','\n']);
    });
  });
});