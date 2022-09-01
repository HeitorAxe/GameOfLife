let startButton = document.querySelector(".start");
let resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", function() { document.location.reload(true); })
let gridSize = 60;

var mouseDown = 0;
document.body.onmousedown = function() {
	++mouseDown;
}
document.body.onmouseup = function() {
	--mouseDown;
}



function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

startButton.addEventListener("click", function() {
	(function loop() {
		setTimeout(function() {
			updateGrid();
			loop()
		}, 50); //9000 = 9000ms = 9s
	}());
})
//sleep(2000).then(() => { updateGrid();});
// setInterval(click, 5000);
// function click() {
// 	startButton.click();
// }

function createCell(coordinateX, coordinateY) {
	let newCell = document.createElement("div");
	newCell.classList.add("square-cell");
	newCell.classList.add("dead");
	newCell.id = "(" + coordinateX + "," + coordinateY + ")";
	let newCellText = document.createElement("div");

	newCell.addEventListener("mouseover", function() {
		if (mouseDown) {
			newCell.classList.toggle("dead");
			newCell.classList.toggle("alive");
		}
	}, false);
	newCell.addEventListener("click", function() {
		newCell.classList.toggle("dead");
		newCell.classList.toggle("alive");
	}, false)

	newCellText.classList.add("cell-text");
	newCell.appendChild(newCellText);
	let container = document.querySelector(".container");
	container.appendChild(newCell);
}

function initiateGrid() {
	for (let i = 0; i < gridSize + 1; i++) {
		for (let j = 0; j < gridSize + 1; j++) {
			createCell(j, i);
		}
	}
}

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

function isAlive(x, y) {

	let isAlive = false;
	if (x < 0 || y < 0 || x > gridSize || y > gridSize) {
		//return isAlive;
		if (x < 0) {
			x += gridSize
		}
		if (y < 0) {
			y += gridSize
		}
		if (x > gridSize) {
			x -= gridSize
		}
		if (y > gridSize) {
			y -= gridSize
		}
	}

	let string = "(" + x + "," + y + ")";
	let cell = document.getElementById(string);

	if (cell.classList.contains("alive")) {
		isAlive = true;
	}
	return isAlive;
}

function updateCellPile(x, y, listOfCoordinates) {
	let aliveNeighbours = 0;
	if (isAlive(x, y - 1)) { aliveNeighbours += 1; }
	if (isAlive(x - 1, y)) { aliveNeighbours += 1; }
	if (isAlive(x + 1, y)) { aliveNeighbours += 1; }
	if (isAlive(x, y + 1)) { aliveNeighbours += 1; }

	if (isAlive(x - 1, y - 1)) { aliveNeighbours += 1; }
	if (isAlive(x + 1, y - 1)) { aliveNeighbours += 1; }
	if (isAlive(x - 1, y + 1)) { aliveNeighbours += 1; }
	if (isAlive(x + 1, y + 1)) { aliveNeighbours += 1; }

	if (isAlive(x, y) && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
		listOfCoordinates.push([x, y]);
	}
	if (!isAlive(x, y) && aliveNeighbours == 3) {
		listOfCoordinates.push([x, y]);
	}
	return listOfCoordinates;
}

function updateCells(listOfCoordinates) {
	for (let i = 0; i < listOfCoordinates.length; i++) {
		let string = "(" + listOfCoordinates[i][0] + "," + listOfCoordinates[i][1] + ")";
		let cell = document.getElementById(string);
		cell.classList.toggle("dead");
		cell.classList.toggle("alive");
		if (cell.classList.contains("dead")) {
			cell.classList.add("trail");
		}
		if (cell.classList.contains("alive")) {
			cell.classList.remove("trail");
		}
	}
}


function updateGrid() {
	let listOfCoordinates = [];
	for (let i = 0; i < gridSize + 1; i++) {
		for (let j = 0; j < gridSize + 1; j++) {
			updateCellPile(j, i, listOfCoordinates);
		}
	}
	updateCells(listOfCoordinates);
}

initiateGrid();
