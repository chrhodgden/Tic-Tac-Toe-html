console.log('Hello from app.js');

fetch('svg/x.svg')
	.then(response => response.text())
	.then(fileContents => {
		console.log(fileContents);
	})
	.catch(error => console.error('Error reading the file:', error));


const turns = {true: 'X', false: 'O'};

const getXBoard = function() {
	return this.bitBoard.slice(0, 9);
};

const getOBoard = function() {
	return this.bitBoard.slice(9, 18);
};

const checkVictory = function() {
	let checkSum = 0;
	let victory = false;
	let checkRow = [];

	this.rows.forEach(row => {
		checkRow = this.xBoard.filter((_, index) => row.includes(index));
		checkSum = checkRow.reduce((acc, value) => acc + value, 0);	
		if (checkSum == 3) {
			victory = true;
			this.victoryRow = row;
		};
		checkRow = this.oBoard.filter((_, index) => row.includes(index));
		checkSum = checkRow.reduce((acc, value) => acc + value, 0);	
		if (checkSum == 3) {
			victory = true;
			this.victoryRow = row;
		};
	});
	if (victory) {
		this.victor = this.turn;
		this.colorVictoryRow();
	};
	return(victory);
};

const colorVictoryRow = function () {
	this.victoryRow.forEach(squareIndex => {
		this.squares[squareIndex].style.color = 'var(--background-color)';
		this.squares[squareIndex].style.backgroundColor = 'var(--foreground-color)';
	});
};

const squareClick = function() {
	if ((this.innerText == '') && !(this.board.victory)) {
		//Mark board
		this.innerText = this.board.turn;
		//Update bitBoard
		let position = 9 * (this.board.turn==turns[false]);
		position += this.position;
		this.board.bitBoard[position] = 1;
		//check victory
		if (this.board.victory) {
			console.log(`${this.board.victor} wins!!!`);
		};
		//Switch player turn
		this.board.turn = turns[this.board.turn==turns[false]]
	};
};

const initBoard = function(board) {
	board.squares = board.getElementsByClassName('square');	
	board.squares = Array.from(board.squares);
	board.squares.forEach(square => {
		square.addEventListener('click', squareClick);
		square.board = board;
		square.position = parseInt(square.id.match(/\d+/)[0], 10)-1;
	});
	board.turn = turns[true];
	board.bitBoard = Array(18).fill(0);
	Object.defineProperty(board, 'victory', {get: checkVictory});
	Object.defineProperty(board, 'xBoard', {get: getXBoard});
	Object.defineProperty(board, 'oBoard', {get: getOBoard});
	board.rows = [
		//rows
		[0, 1, 2], [3, 4, 5], [6, 7, 8],
		//columns
		[0, 3, 6], [1, 4, 7], [2, 5, 8],
		//diagonals
		[0, 4, 8], [2, 4, 6]
	];
	board.colorVictoryRow = colorVictoryRow;
};

const board = document.getElementById('board'); 

initBoard(board);
