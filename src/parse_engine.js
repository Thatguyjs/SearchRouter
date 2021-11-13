// Parse the `engines` file

const fs = require('fs');


// TODO: Error checking
module.exports = function(filepath) {
	const lines = fs.readFileSync(filepath, 'utf8').trim().replaceAll('\r', '').split('\n');
	let engines = {};

	for(let l in lines) {
		let props = {
			optional_www: false,
			query: []
		};

		if(lines[l].startsWith('[www.]')) {
			props.optional_www = true;
			lines[l] = lines[l].slice(lines[l].indexOf(']') + 1);
		}

		let [name, replace_url] = lines[l].split(' : ');
		const url_query = replace_url.indexOf('%query%');

		props.query.push(replace_url.slice(0, url_query), '%query%');
		if(!replace_url.endsWith('%query%'))
			props.query.push(replace_url.slice(url_query + 7));

		engines[name] = props;
	}

	return engines;
}
