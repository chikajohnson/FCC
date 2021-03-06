// Exercise 1
// console.log("HELLO WORLD");

// Exercise 2
// console.log(process.argv.slice(2).reduce((a, b) => parseFloat(a) + parseFloat(b)));

// Exercise 3
// var fs = require('fs');
// var file = process.argv[2];

// console.log(fs.readFileSync(file).toString().split("\n").length - 1);

// Exercise 4
// var fs = require('fs');
// var file = process.argv[2];

// fs.readFile(file, 'utf8',(err, contents) => {
//     if(err) return console.log(err);
//     var lines = contents.split("\n").length - 1
//     console.log(lines);
// });

// Exercise 5
// var fs = require('fs');
// var path = require('path');

// var folder = process.argv[2];
// var ext = '.' + process.argv[3];

// fs.readdir(folder, function(err, files) {
//     if(err) console.log(err);
    
//     files.forEach((file) => {
//         // if(name.includes(ext)) {
//         //     console.log(name);
//         // }

//         if(path.extname(file) === ext) {
//             console.log(file);    
//         }
//     });
// });


// Exercise 6 - Module
// var mymodule = require('./mymodule.js');
// var dir = process.argv[2];
// var ext = process.argv[3];

// function callback(err, files) {
//     if (err) throw new Error(err);
    
//     files.forEach(element => {
//         console.log(element);
//     });
// }

// mymodule(dir, ext, callback);

// Exercise 7 - HTTP Client
// var http = require('http');
// var url = process.argv[2];

// function callback(response) {
//     response.setEncoding("utf8");
//     response.on("data", console.log);
//     response.on("error", console.error);
// }

// http.get(url, callback).on("error", console.error);

// Exercise 8 - HTTP COLLECT

// var http = require('http');
// var url = process.argv[2];

// function callback(response) {
// var string = []; 
// var count = 0;
//     response.setEncoding("utf8");

//     response.on("data", (word) => {
//         count += word.length;
//         string.push(word);
//     }).on("end", () => {
//         console.log(count);
//         console.log(string.join(''));
//     });
//     response.on("error", console.error);
// }

// http.get(url, callback).on("error", console.error);

// Exercise 9 - JUGGLING ASYNC

// var http = require('http');
// var urls = process.argv.slice(2);

// var responses = {}; 
// var count = 0;
// var len = urls.length;

// function callback(response) {
//     let string = []
//     response.setEncoding("utf8");

//     response
//         .on("data", (word) => {
//             string.push(word);
//         })
//         .on("end", () => {
//             count++;
//             responses[count] = string.join("");

//             if(count === len) {
//                 for(string in responses) {
//                     console.log(responses[string]);
//                 }
//             }
//         });
//     response.on("error", console.error);
// }

// urls.forEach(url => http.get(url, callback).on("error", console.error));

// Exercise 10 - TIME SERVER

// var net = require('net');
// const port = process.argv[2];
// var server = net.createServer(function(socket) {
//     // socket handling logic
//     const date = new Date();
//     const y = date.getFullYear();
//     const m = ('0' + (date.getMonth() + 1)).slice(-2) ;
//     const d = ('0' + date.getDate()).slice(-2);
//     const h = ('0' + date.getHours()).slice(-2);
//     const min = ('0' + date.getMinutes()).slice(-2);
    
//     const now = y + "-" + m  + "-" + d + " " + h + ":" + min; 
//     socket.end(now + "\n");
// });

// server.listen(port);

// Exercise 11 - HTTP FILE SERVER
// var http = require("http");
// var fs = require('fs');
// const port = process.argv[2];
// const file = process.argv[3];

// var server = http.createServer(function(req, res) {
//     // res.writeHead(200, { "content-type" : "text/plain" }); // Not necessary here
//     fs.createReadStream(file).pipe(res);
// });

// server.listen(port);

// Exercise 12 - HTTP UPPERCASERER
// var http = require('http');
// var map = require('through2-map');
// var port = process.argv[2];

// var server = http.createServer((req, res) => {
//     if(req.method !== "POST") { 
//         return "Post request please";    
//     }

//     req.pipe(map(function(data) {
//         return data.toString().toUpperCase();
//     })).pipe(res);
// });

// server.listen(port);

// Exercise 13 - HTTP JSON API SERVER

var http = require('http');
var url = require('url');
var port = Number(process.argv[2]); // Make sure the port is a number

var server = http.createServer((req, res) => {
    if(req.method !== "GET") return console.error("GET REQUEST PLEASE!");
    const myURL = url.parse(req.url, true);
    const qry = myURL.query;
    let dateObj;
    const date = new Date(qry.iso);

    if (myURL.pathname === '/api/unixtime') {
        dateObj = { unixtime: date.getTime() };
    } else {
        dateObj = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()  
        };
    }

    if (dateObj) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dateObj));
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(port);

