const parse_engines = require("./parse_engine.js");
const parse_query = require('./query.js');

const http = require("http");
const pfs = require('fs/promises');

const engines = parse_engines(__dirname + "/engines");
const [ip, port] = process.argv[2].split(':');

const mime = {
	'txt': 'text/plain',

	'html': 'text/html',
	'css': 'text/css',
	'js': 'text/javascript',
	'mjs': 'application/javascript'
};


function request(req, res) {
	if(req.method === 'GET') {
		if(req.url.startsWith('/?'))
			parse_query(engines, req.url, res);
		else {
			if(!req.url.includes('.')) {
				if(req.url.endsWith('/')) req.url += 'index.html';
				else req.url += '/index.html';
			}

			const ext = req.url.slice(req.url.lastIndexOf('.') + 1);

			pfs.readFile(__dirname + '/ui' + req.url)
				.then((buffer) => {
					if(mime[ext]) res.writeHead(200, { 'Content-Type': mime[ext] });
					else res.writeHead(200);

					res.end(buffer);
				})
				.catch(() => {
					res.writeHead(404);
					res.end("404 Not Found");
				});
		}
	}
	else {
		res.writeHead(400);
		res.end("Bad Request");
	}
}


const server = http.createServer(request);
server.listen(port, ip, () => {
	console.log(`Listening at \x1b[36m${ip}:${port}\x1b[0m`);
});
