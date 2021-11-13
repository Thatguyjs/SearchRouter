// Forward requests to the search engine

const https = require('https');


function send_request(engine_str, url, res) {
	https.get(url, (q_res) => {
		if(q_res.statusCode === 301 || q_res.statusCode === 302)
			return send_request(q_res.headers.location, res);

		res.writeHead(200);
		q_res.pipe(res);
		q_res.on('end', () => { res.end(); });
	});
}


module.exports = send_request;
