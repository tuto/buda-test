const fs = require('fs');

const getObjectData = () => {
    let data = {}
    fs.readFileSync('src/resources/routes-file.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
        line.split("|").forEach((point)=> {
            let name = point.split(":")[0];
            let color = point.split(":")[1].split("_")[0];
            let links = point.split(":")[1].split("_")[1].split(",");
            data[name] = {color, links}
        })
    })
    return data;
}

module.exports = {getObjectData}