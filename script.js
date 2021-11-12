const initialVictoriesOfPlayers = 0;
const totalPlayers = 2; // number of players
const maxDamage = 5;
const maxRounds = 5;

function getRandomInt(max) {
	//gives random number between 0 and 1
	return Math.floor(Math.random() * max);
}
function fight(fighters) {
	randomPlayer = getRandomInt(totalPlayers);
	randomDamage = getRandomInt(maxDamage);
	let playerHealth = fighters[randomPlayer];
	if (playerHealth < randomDamage) {
		fighters[randomPlayer] = 0;
	} else {
		fighters[randomPlayer] = playerHealth - randomDamage;
	}
}
function round() {
	let fightersHealth = [100, 100];
	let fighting = true;
	let victor = null;
	while (fighting) {
		if (fightersHealth.includes(0)) {
			fighting = false;
			victor = totalPlayers - 1 - fightersHealth.indexOf(0);
			return {victor, victorHealth: fightersHealth[victor]};
		} else {
			// setInterval(fight(fighters), 50);
			fight(fightersHealth);
		}
	}
}
function match(players) {
	let rounds = 0;
	while (rounds < maxRounds) {
		if (players.includes(3)) {
			return {
				winner: players.indexOf(3),
				victories: players[players.indexOf(3)],
			};
		} else {
			let victor = round();
			var br = document.createElement("br");
			let roundsNode = document.getElementById("rounds");
			roundsNode.appendChild(br);
			roundsNode.appendChild(
				document.createTextNode(
					`Round ${rounds + 1} winner: ${victor.victor + 1}, Fighter's Health when round ended ${victor.victorHealth}`
				)
			);
			players[victor.victor] = players[victor.victor] + 1;
		}
		rounds = rounds + 1;
	}
}

function startGame() {
	let players = [0, 0];
	document.getElementById("player1Victories").innerHTML =
		"Victories: " + players[0];
	document.getElementById("player2Victories").innerHTML =
		"Victories: " + players[1];
	document.getElementById("winner").innerHTML = "Winner is";
	document.getElementById("rounds").innerHTML = "";
	let gameScore = null;
	while (gameScore === null || gameScore === undefined) {
		gameScore = match(players);
	}
	if (gameScore.winner === 0) {
		document.getElementById("player1Victories").innerHTML =
			"Victories: " + gameScore.victories;
		document.getElementById("winner").innerHTML = "Winner is Player 1!";
	} else {
		document.getElementById("player2Victories").innerHTML =
			"Victories: " + gameScore.victories;
		document.getElementById("winner").innerHTML = "Winner is Player 2!";
	}
}
