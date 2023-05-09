
const resp = await fetch('https://api.scryfall.com/cards/search?q=' + encodeURIComponent(process.argv[2]));
const data = await resp.json()
let items;

if(data.object == 'error') {
	items = [
		{
			title: "No cards found",
			subtitle: "Check your syntax",
			valid: false
		}
	]
}
else {
	items = data.data.map( card => {
		let oracleNoNl = card.oracle_text
		if(String(card.oracle_text).includes("\n")){
			oracleNoNl = String(card.oracle_text).replace(/\n/g, " ");
		}
		return ({
			title: card.name,
			arg: card.scryfall_uri,
			subtitle: (card.mana_cost ? card.mana_cost + ", " : "")  + card.type_line + " // " + oracleNoNl
		})}
	)
}


let {rerunInterval} = {}
console.log(JSON.stringify({items, rerun: rerunInterval}, null, '\t'));