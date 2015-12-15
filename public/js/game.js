"use strict"

var Game = function Game (m, n, k, name, p, q) {
    this.m = m;
    this.n = n;
    this.k = k;
    this.p = p || 1;
    this.q = q || 1;
    this.name = name;
    this.players = [];
    this.tokens = ["img/O1.jpeg", "img/X1.png"];
    this.score = [0, 0, 0];

    this.gameContainer = new GameContainer(this);
    this.playerStats = new PlayerStats(this);
    this.messages = new Messages();

    this.gameContainer.show();

    var pCounter = 0;
    var qCounter = 0;
    var numberOfMoves = 0;
    var currentPlayerId = 0;
    var otherPlayerId = 1;


    this.createPlayer = function createPlayer(name, id) {
	this.players[id] = new Player(this.m, this.n, this.k, name, this.tokens[id]);
	if (!this.notEnoughPlayers()) {
	    this.messages.displayMessage(this.currentPlayer().name + "'s Turn");
	}
    };

    this.currentPlayer = function() {
	return this.players[currentPlayerId];
    };

    this.notEnoughPlayers = function() {
	if (this.players.length < 2) {
	    return true;
	}
	return false;
    };

    
    this.makeMove = function makeMove(i, j) {
	// make the move
	this.currentPlayer().move(i, j);
	numberOfMoves++;

	// show image on Dom
	this.gameContainer.showImage(i, j);
	
	// check for win
	if (this.currentPlayer().value(i, j) >= this.k) {
	    this.win(currentPlayerId);
	    return true;
	} else if (numberOfMoves === this.m * this.n) {
	    this.tie();
	    return true;
	}

	// update current player to other player if necessary

	if (numberOfMoves < this.q) {
	    //switchplayers
	    		var temp = currentPlayerId;
		currentPlayerId = otherPlayerId;
		otherPlayerId = temp;

	} else if ((numberOfMoves - this.q) % this.p === 0) {
	    // switch players
	    var temp = currentPlayerId;
	    currentPlayerId = otherPlayerId;
	    otherPlayerId = temp;

	}
	
	// if (qCounter < this.q) {
	//     qCounter++;
	//     if (qCounter === this.q) {
	// 	var temp = currentPlayerId;
	// 	currentPlayerId = otherPlayerId;
	// 	otherPlayerId = temp;
	//     }
	// } else if (pCounter % this.p !== 0) {
	//     pCounter++;
	// } else {
	//     var temp = currentPlayerId;
	//     currentPlayerId = otherPlayerId;
	//     otherPlayerId = temp;
	//     pCounter++;
	// }

	this.messages.displayMessage(this.currentPlayer().name + "'s Turn");
    };

    this.win = function win(currentPlayerId) {
	this.score[currentPlayerId]++;
	this.playerStats.updateScore();
	this.playerStats.showNewGameButton();
	this.gameContainer.end();
	this.messages.displayMessage(this.currentPlayer().name + " Won!!");
    };

    this.tie = function tie() {
	this.score[2]++;
	this.playerStats.showNewGameButton();
	this.gameContainer.end();
	this.messages.displayMessage("It's a Tie");
    };

    this.restart = function restart() {
	numberOfMoves = 0;
	this.players.forEach(function(player) {
	    player.restart();
	});
	this.gameContainer.generateNewTable();
	this.messages.displayMessage(this.currentPlayer().name + "'s Turn");

    };


    this.attemptMove = function attemptMove($cell, i, j) {
	if (this.notEnoughPlayers()) {
	    this.messages.flashMessage("Not enough players to start game");
	} else if (this.players[otherPlayerId].board[i][j] || this.currentPlayer().board[i][j]) {
	    this.messages.flashMessage("Can't make a move there");
	    
	} else {
	    this.makeMove(i, j);
	}
    };

    this.messages.displayMessage("Please Enter Player Names");
};
