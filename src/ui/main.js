function el(selector) {
	return document.querySelector(selector);
}

function get_engine() {
	const select_el = el("#engine-select");
	return select_el.options[select_el.selectedIndex].value;
}

function get_query() {
	return el("#search-query").value;
}


function search() {
	const query = get_query();
	if(!query.length) return;

	location.assign(`/?e=${get_engine()}&q=${query}`);
}


el("#search-query").addEventListener('keydown', (ev) => {
	if(ev.code === 'Enter') search();
});

el("#search-action").addEventListener('click', () => {
	search();
});
