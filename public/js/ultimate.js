"use strict"

var Ultimate = function Ultimate() {
   
    this.gamesArray = [];
    this.players = [];
    this.$table = $("<div id='ultimate-game'>");
    this.tokens = ["./img/O1.jpeg", "./img/X1.png"];
    this.currentPlayerId = 0;
    this.messages = new Messages();
    
    var playerStats = new PlayerStats(this);
   
    var that = this;
    
    var SmallGame = function SmallGame(i, j) {
	this.i = i;
	this.j = j;
	this.players = [];
	this.tokens = that.tokens;
	this.active = true;
	this.closed = false;
	this.$table = $("<table>");
	this.$cellArray = [];
	
	var this_ = this;
	
	var numberOfMoves = 0;
	
	var setHandler = function setHandlers($cell, i, j) {
	    $cell.on("click", function(event) {
		this_.attemptMove($cell, i, j);
	    });
	};

	var createTable = function createTable() {
	    this_.$table = $("<table>");
	    for (var i = 2; i >= 0; i--) {
		var $row = $("<tr>");
		var $rowOfArray = [];
		for (var j = 0; j < 3; j++) {
		    var $cell = $("<td>");
		    setHandler($cell, i, j);
		    $row.append($cell);
		    $rowOfArray.push($cell);
		}
		this_.$table.append($row);
		this_.$cellArray.unshift($rowOfArray);
	    }
	};

	createTable();

	
	this.createPlayer = function createPlayer(name, id) {
	    console.log("hey created Player");
	    this.players[id] = new Player(3, 3, 3, name, this.tokens[id]);
	};

	this.attemptMove = function attemptMove($cell, i, j) {
	    if (this.active && !this.closed) {
		$cell.off();
		this.makeMove(i, j);
	    } else {
		console.log("can't move there");
	    }
	};

	this.makeMove = function makeMove(i, j) {
	    this.players[that.currentPlayerId].move(i, j);
	    numberOfMoves++;
	    this.showImage(i, j);

	    if (this.players[that.currentPlayerId].value(i, j) >= 3) {
		this.win(that.currentPlayerId);
	    } else if (numberOfMoves === 9) {
		this.tie();
	    }

	    that.updateClosed(i, j);
	    
	    that.currentPlayerId = (that.currentPlayerId + 1) % 2;
	    
	};

	this.showImage = function showImage(i, j) {
	    this.$cellArray[i][j].append($("<img>").attr("src", this.tokens[that.currentPlayerId]).css("width", "100%"));
	};


	this.win = function win(id) {
	    // what to do when win
	    this.closed = true;
	    that.makeMove(this.i, this.j);
	    this.setActive(false);
	    $("#" + this.i + this.j).empty().append($("<img>").attr("src", that.tokens[that.currentPlayerId]).css("width", "100%"));
	};

	this.tie = function tie() {
	    // what to do when tie
	    this.closed = true;
	};

	this.setActive = function setActive(value) {
	    this.active = value;
	    if (value) {
		$("#" + this.i + this.j).addClass("active");
	    } else {
		$("#" + this.i + this.j).removeClass("active");
	    }
	};

    };
    
    for (var i = 0; i < 3; i++) {
	this.gamesArray.push([]);
	for (var j = 0; j < 3; j++) {
	    var game = new SmallGame(i, j);
	    this.gamesArray[i].push(game);
	}
    }

    this.makeTable = function makeTable() {
	for (var i = 2; i >= 0; i--) {
	    var $row = $("<div class='row'>");
	    for (var j = 0; j < 3; j++) {
		$row.append($("<div class='one-third column' id='" + i + j + "'>").append(this.gamesArray[i][j].$table));
	    }
	    this.$table.append($row);
	}
	$("#game-container").append(this.$table);
    };

    this.createPlayer = function createPlayer(name, id) {
	this.players[id] = new Player(3, 3, 3, name, this.tokens[id]);
	for (var i = 0; i < 3; i++) {
	    for (var j = 0; j < 3; j++) {
		this.gamesArray[i][j].players[id] = new Player(3, 3, 3, name, this.tokens[id]);
	    }
	}
    };

    this.makeMove = function makeMove(i, j) {
	this.players[this.currentPlayerId].move(i, j);
	if (this.players[this.currentPlayerId].value(i, j) >= 3) {
	    this.messages.displayMessage(this.players[this.currentPlayerId].name + " Won!");
	    for (var k = 0; k < 3; k++) {
		for (var l = 0; l < 3; l++) {
		    this.gamesArray[i][j].closed = true;
		}
	    }
	}

    };

    this.updateClosed = function updateClosed(i, j) {
	if (this.gamesArray[i][j].closed) {
	    for (var k = 0; k < 3; k++) {
		for (var l = 0; l < 3; l++) {
		    if ((k !== i || l !== j) && !this.gamesArray[k][l].closed) {
			this.gamesArray[k][l].setActive(true);
		    }
		    
		}
	    }		
	} else {
	    this.gamesArray[i][j].setActive(true);
	    for (var k = 0; k < 3; k++) {
		for (var l = 0; l < 3; l++) {
		    if ((k !== i || l !== j) && !this.gamesArray[k][l].closed) {
			this.gamesArray[k][l].setActive(false);
		    }
		}
	    }
	}
    };

    $("h1").text("Inception Tic-Tac-Toe");
    this.makeTable();

    
    
};
