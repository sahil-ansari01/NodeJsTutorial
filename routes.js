const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Message</title></head>');
        res.write('<body>');

        readFile((data) => {
            res.write(`<p>${data}</p>`);
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
            res.write('</body>');
            res.write('</html>');
            res.end();
        })

        return;
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    
    res.setHeader('Content-Type', 'text/html'); 
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello form my Nodejs server!</h1></body>');
    res.write('</html>');
    res.end();

    function readFile(callback) {
        fs.readFile('message.txt', 'utf-8', (err, data) => {
            if (err) {
                callback(`Error: ${err}`)
            } else {
                callback(data)
            }
            
        })
    }
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text'

exports.handler = requestHandler;
