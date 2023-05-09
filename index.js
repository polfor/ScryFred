
const resp = await fetch('https://api.scryfall.com/cards/search?order=edhrec&q=' + encodeURIComponent(process.argv[2]));
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
		let oracle = "";
		if(card.layout == "split" || card.layout == "modal_dfc" || card.layout == "flip" || card.layout == "transform" ) {
			oracle = card.card_faces.map(face => face.oracle_text).join(" // ")
		} else { 
			oracle = card.oracle_text
		}
		if(String(oracle).includes("\n")){
			oracle = String(oracle).replace(/\n/g, " ");
		}

		return ({
			title: card.name,
			arg: card.scryfall_uri,
			subtitle: (card.mana_cost ? card.mana_cost + ", " : "")  + card.type_line + " → " + oracle
		})}
	)

	items.unshift({
		title: "Display results on Scryfall",
		subtitle: process.argv[2],
		icon: {
			path: "./scryfall-alt.png"
		},
		arg: "https://scryfall.com/search?q=" + encodeURIComponent(process.argv[2])
	})
}


let {rerunInterval} = {}
console.log(JSON.stringify({items, rerun: rerunInterval}, null, '\t'));