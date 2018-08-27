import http from 'http'
import fs from 'fs'
import chart from './lib/chat'

// var keypress = require('keypress');
//
// keypress(process.stdin);
// process.stdin.on('keypress', function (ch, key) {
//   console.log('got "keypress"', key);
//   if (key && key.ctrl && key.name == 'c') {
//     process.stdin.pause();
//   }
// });

let count = 0;
const server = new http.Server((req, res) => {
   
    switch (req.url) {
        case '/':
        fs.readFile('./public/index.html', (err, data) => {
            if (err) throw new Error(err)
            debugger
            res.writeHeader(200, {"Content-Type": "text/html"});  
            res.end(data);
        })
            break;
 
        case '/subscribe':
            chart.subscribe(res);
            break;
 
        case '/publish':
            let body = ''
            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                try {
                    
                    body = JSON.parse(body)
                    chart.publish(body.message);
                    res.end('ok')
                    body = ''
                    
                } catch (error) {
                    throw new Error
                }
            })
            break;
 
        default:
            res.statusCode = 404;
            res.end("Not found");
    }
 

});

server.listen(3000);
