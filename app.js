console.log('Hello from app.js');

const turns = {true: 'X', false: 'O'};

const boardTurn = function() {
	console.log('clicked', this.id, this.bitBoard);
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
};

const board = document.getElementById('board'); 

initBoard(board);