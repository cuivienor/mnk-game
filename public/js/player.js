"use strict"

var Player = function Player(m, n, k, name, token) {
    var that = this;
    this.board = [];
    this.m = m;
    this.n = n;
    this.k = k;
    this.name = name;
    this.token = token;


    // Create an m by n board and initialize with all spaces open
    var initialize = function initialize() {
	that.board = [];
	for(var i = 0; i < m; i++) {
	    that.board.push([]);
	    for(var j = 0; j < n; j++) {
		that.board[i].push(false);
	    }
	}
	console.log("Board is clear");
    };

    initialize();

    // Console representation of the current board
    this.boardToConsole = function boardToConsole () {
	for (var i = this.board.length; i >= 0; i--) {
	    console.log(this.board[i]);
	}
    };

    // make a move (mark i, j)
    this.move = function move(i, j) {
	if (!this.board[i][j]){
	    this.board[i][j] = true;
	} else {
	    console.log("move already done");
	}
    };

    // get horizontal
    var getHorizontal = function getHorizontal(i, j) {
	var start = Math.max(0, j - that.k + 1);
	var end = Math.min(j + that.k, that.m);
	return that.board[i].slice(start, end);
    };
    
    // get vertical
    var getVertical = function getVertical(i, j) {
	var array = [];
	var start = Math.max(0, i - that.k + 1);
	var end = Math.min(i + that.k, that.n);
	for (var row = start; row < end; row++) {
	    array.push(that.board[row][j]);
	}
	return array;
    };

    
    // get right diagonal
    var getRightDiagonal = function getRightDiagonal(i, j) {
	var array = [];
	var startColumn = Math.max(0, j - that.k + 1);
	var endColumn = Math.min(j + that.k, that.m);
	var startRow = Math.max(0, i - that.k + 1);
	var endRow = Math.min(i + that.k, that.n);
	var startDistance = Math.min(j - startColumn, i - startRow);
	startColumn = j - startDistance;
	startRow = i - startDistance;
	endRow = i + Math.min(endColumn - j, endRow - i);
	
	for (var row = startRow, column = startColumn; row < endRow; row++) {
	    array.push(that.board[row][column]);
	    column++;
	}
	return array;
    };
    
    // get left diagonal
    var getLeftDiagonal = function getLeftDiagonal(i, j) {
	var array = [];
	var startColumn = Math.max(0, j - that.k + 1);
	var endColumn = Math.min(j + that.k, that.m - 1);
	var startRow = Math.max(0, i - that.k + 1);
	var endRow = Math.min(i + that.k, that.n - 1);
	var startDistance = Math.min(j - startColumn, endRow - i);

	startColumn = j - startDistance;
	endRow = i + startDistance;
	endColumn = j + Math.min(endColumn - j, i - startRow);

	for (var row = endRow, column = startColumn; column <= endColumn; column++) {
	    array.push(that.board[row][column]);
	    row--;
	}
	return array;
    };


    // max sequence in an array returns the length of a streak
    var lengthOfStreak = function lengthOfStreak(array) {
	var hot = false;
	var length = 0;
	var maxLength = 0;
	for (var i = 0; i < array.length; i++) {
	    if (array[i]) {
		length++;
		if (length > maxLength) {
		    maxLength = length;
		}
	    } else {
		length = 0;
	    }
	    hot = array[i];
	}
	return maxLength;
    };

    this.value = function value(i, j) {
	return Math.max(lengthOfStreak(getHorizontal(i, j)),
			lengthOfStreak(getVertical(i, j)),
			lengthOfStreak(getLeftDiagonal(i, j)),
			lengthOfStreak(getRightDiagonal(i, j)));
    };

    this.restart = function restart() {
	initialize();
    };
    
};


