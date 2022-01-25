
const Point = require('./point.js');
const fileData = require('./file.js');

class Routes {
    constructor(last) {
        this.data = fileData.getObjectData();
        this.last = last
    }
    printRoute(route){
        console.log("")
        console.log("RUTA:", route.join("->"));   
        console.log("")  
    }

    getBestRoute(last, colorTrain, routes, bestRoute) {
        if(last === "-"){
            return bestRoute;
        }
        routes.forEach((point) => {
            if(point.name === last){
                bestRoute.unshift(point.name)
                this.getBestRoute(point.from, colorTrain, routes, bestRoute);
                return;
            }
        })
        return bestRoute;
    }

    getRoutes(actual, from, colorTrain, routes){
        if(colorTrain !== "nc" && colorTrain !== this.data[this.last].color && this.data[this.last].color !== "nc"){
            console.log(`La estación de llegada tiene que ser del color del tren[${colorTrain}] o sin color[nc]`);
            return;
        }
        if(this.data[actual].color === "nc" || this.data[actual].color === colorTrain || colorTrain === "nc") {
            let distance = 0;
            let fromPoint = "-"
            if(from !== "-") {
                distance = 1 + from.distance
                fromPoint = from.name
            }
        
            const point = new Point(actual, distance, fromPoint)
            const ip = this.getIndexPoint(actual, routes);
            if(ip !== -1 ){
                if(routes[ip].distance > distance){
                    routes[ip] = point;
                }
                else{
                    return routes;
                }
            }
            else {
                routes.push(point);
            }
            this.data[actual].links.forEach(p => {
                this.getRoutes(p, point, colorTrain, routes);
            });
            return routes;
        }
        else {
            this.data[actual].links.forEach(p => {
                this.getRoutes(p, from, colorTrain, routes);
            });
            return routes;
        }
    }

    getIndexPoint(name, routes){
        let value = -1;
        routes.forEach((point, index) => {
            if(point.name === name) {
                value = index;
                return ;
            }
        });
        return value;
    }
}

module.exports = Routes;
