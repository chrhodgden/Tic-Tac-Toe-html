console.log('Hello from app.js');

const turns = {true: 'X', false: 'O'};

const boardTurn = function() {
	console.log('clicked', this.id, this.bitBoard);
};

const checkVictory = function() {
	let checkSum = 0;
	let victory = false;
	const rows = [
		//rows
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		//columns
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		//diagonals
		[0, 4, 8],
		[2, 4, 6]
	];
	const xBoard = this.bitBoard.slice(0, 9);
	const oBoard = this.bitBoard.slice(9, 18);
	let checkRow = [];

	rows.forEach(row => {
		checkRow = xBoard.filter((_, index) => row.includes(index));
		checkSum = checkRow.reduce((acc, value) => acc + value, 0);	
		if (checkSum == 3) {
			victory = true;
			board.victory_row = row;
		};
		checkRow = oBoard.filter((_, index) => row.includes(index));
		checkSum = checkRow.reduce((acc, value) => acc + value, 0);	
		if (checkSum == 3) {
			victory = true;
			board.victory_row = row;
		};
	});
	board.victory = victory;
	if (victory) {
		board.victor = board.turn;
	};
	return(victory);
};

const squareClick = function() {
	console.log('clicked', this.id, this.innerText, this.position);
	if (this.innerText == '') {
		//Mark board
		this.innerText = this.board.turn;
		//Update bitBoard
		let pos = 9 * (this.board.turn==turns[false]);
		pos += this.position - 1
		this.board.bitBoard[pos] = 1;
		//check victory
		this.board.checkVictory();
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
		square.position = parseInt(square.id.match(/\d+/)[0], 10);
	});
	board.addEventListener('click', boardTurn);
	board.turn = turns[true];
	board.bitBoard = Array(18).fill(0);
	board.checkVictory = checkVictory;
};

const board = document.getElementById('board'); 

initBoard(board);
