// Parse and respond to a query

const https = require('https');


function parse_search(url) {
	if(!url.indexOf('?')) return {};

	let result = {};
	let param_strs = url.slice(url.indexOf('?') + 1).split('&');

	for(let p in param_strs) {
		const [key, value] = param_strs[p].split('=');

		if(!value) result[key] = '';
		else result[key] = value;
	}

	return result;
}


function get_engine(engines, engine_url) {
	if(engines[engine_url]) return engines[engine_url];

	if(engine_url.startsWith('www.')) {
		engine_url = engine_url.slice(4);

		if(engines[engine_url]?.optional_www)
			return engines[engine_url];
	}
}


function build_query(engine, query) {
	let result = "https://";

	for(let q in engine.query) {
		if(engine.query[q] !== '%query%') result += engine.query[q];
		else result += query;
	}

	return result;
}


module.exports = function(engines, url, res) {
	const params = parse_search(url);

	if(!params.e || !params.q) {
		res.writeHead(400);
		res.end("Bad Request");
		return;
	}

	let engine = get_engine(engines, params.e);

	if(!engine) {
		res.writeHead(400);
		res.end("Unknown Search Engine");
		return;
	}

	const query_str = build_query(engine, params.q);

	https.get(query_str, (q_res) => {
		// TODO
	});
}
