"use strict"

// object for manipulating the game-chooser
var GameChooser = function GameChooser() {
    var that = this;
    this.domObject = $("#game-chooser");
    
    // attach event Listeners for all game options
    var attachEventListeners = function attachEventListeners() {
	$("#game-chooser input[name='tic-tac-toe']").on("click", function() {
	    var game = new Game(3, 3, 3, "Tic-Tac-Toe");
	    that.hide();
	});
	$("#game-chooser input[name='tic-tac-toe4']").on("click", function() {
	    var game = new Game(4, 4, 4, "Tic - Tac - Toe (4 x 4)");
	    that.hide();
	});
	$("#game-chooser input[name='tic-tac-toe5']").on("click", function() {
	    var game = new Game(5, 5, 5, "Tic - Tac - Toe (5 x 5)");
	    that.hide();
	});
	$("#game-chooser input[name='gomoku'").on("click", function() {
	    var game = new Game(19, 19, 5, "Gomoku");
	    that.hide();
	});

	$("#game-chooser input[name='connect6'").on("click", function() {
	    var game = new Game(19, 19, 6, "Connect6", 2, 1);
	    that.hide();
	});

	$("#game-chooser input[name='inception'").on("click", function() {
	    var game = new Ultimate();
	    that.hide();
	});

    };

    attachEventListeners();

    // show game chooser
    this.show = function show() {
	$("h1").text("Choose a game");
	this.domObject.show();
    };

    // hide game chooser
    this.hide = function hide() {
	this.domObject.hide();
    };
};


var GameContainer = function GameContainer(game) {
    this.game = game;
    this.$domObject = $("<table>");
    this.$cellArray = [];

    var that = this;
    
    var setHandler = function setHandlers($cell, i, j) {
	$cell.on("click", function(event) {
	    that.game.attemptMove($cell, i, j);
	});
    };

    this.showImage = function showImage(i, j) {
	this.$cellArray[i][j].append($("<img>").attr("src", game.currentPlayer().token).css("width", "100%"));
    };
    
    this.generateNewTable = function generateNewTable() {
	$("h1").text(this.game.name);
	
	var $backButton = $("<input>").attr("type", "button").attr("value", "Back").css("margin-top", "1.2em").css("float", "left");
	$backButton.on("click", function(event) {
	    that.game.gameContainer.hide();
	    that.game.playerStats.hide();
	    that.game.messages.hide();
	    gameChooser.show();
	});
	$("h1").prepend($backButton);
	
	this.$domObject = $("<table>");
	for (var i = this.game.m - 1; i >= 0; i--) {
	    var $row = $("<tr>");
	    var $rowOfArray = [];
	    for (var j = 0; j < this.game.n; j++) {
		var $cell = $("<td>");
		setHandler($cell, i, j);
		$row.append($cell);
		$rowOfArray.push($cell);
	    }
	    this.$domObject.append($row);
	    this.$cellArray.unshift($rowOfArray);
	}
	$("#game-container").empty().append(this.$domObject);
	// $("#game-container").append(this.$domObject);
	if (this.game.m > 6 || this.game.n > 6) {
	    $("td").css("width", "1.2em").css("height", "1.2em");
	}
    };


    this.show = function show() {
	$("#game-container").show();
    };

    this.hide = function hide() {
	$("#game-container").empty();
    };

    this.end = function end() {
	$("td").off();
    };

    this.generateNewTable();
};

var Messages = function Messages() {
    this.$domObject = $("#messages");

    this.displayMessage = function displayMessage(string) {
	this.$domObject.empty()
	    .append($("<h7 class='animated pulse infinite'>").text(string).css("text-align", "center"));
    };

    this.show = function show() {
	this.$domObject.show();
    };
    
    this.hide = function hide() {
	this.$domObject.empty();
    };

    this.flashMessage = function flashMessage(string) {
	var message = $("<h7 class='animated pulse infinite block'>").text(string);

	this.$domObject.append(message);
	message.delay(1000).fadeOut();
    };
};

var PlayerStats = function PlayerStats(game) {
    this.game = game;
    this.domObject = $("#player-stats");

    var that = this;
    
    var attachEventListeners = function attachEventListeners() {
	$("input[type='button']", that.domObject).on("click", function(event) {
	    var name = $(event.target).prev().val();
	    if (name !== "") {
		// create player with the corresponding name
		that.game.createPlayer(name, $(event.target).prev().attr("name")[0]);

		// update Prompt to show name
		$(event.target).parent().empty().append($("<h4>").text(name));
	    } else {
		that.game.messages.flashMessage("Please Enter a Valid Name");
	    }
	});
    };



    var generatePrompts = function generatePrompts() {
	var $row = $("<div>").attr("class", "row");
	$row.append($("<div>").attr("class", "player-info one-third column left")
		    .attr("id", "player0")
		    .append($("<h4>").text("Player 1"))
		    .append($("<input>").attr("type", "text")
			    .attr("name", "0-name")
			    .attr("placeholder", "Please Enter Name"))
		    .append($("<input>").attr("type", "button")
			    .attr("name", "0-submit")
			    .attr("value", "Submit")))
	    .append($("<div>").attr("class", "one-third column")
		    .attr("id", "stats")
		    .append($("<h5>").html("<span id='player0-score'>0</span> Score <span id='player1-score'>0</span>")))
	    .append($("<div>").attr("class", "player-info one-third column left")
		    .attr("id", "player1")
		    .append($("<h4>").text("Player 2"))
		    .append($("<input>").attr("type", "text")
			    .attr("name", "1-name")
			    .attr("placeholder", "Please Enter Name"))
		    .append($("<input>").attr("type", "button")
			    .attr("name", "1-submit")
			    .attr("value", "Submit")));
	$("#player-stats").append($row);
	    
    };

    this.updateScore = function updateScore() {
	$("#player0-score").text(this.game.score[0]);
	$("#player1-score").text(this.game.score[1]);
    };
    
    this.show = function show() {
	this.domObject.show();
    };

    this.hide = function hide() {
	this.domObject.empty();
    };

    this.showNewGameButton = function showNewGameButton() {
	var $newGameButton = $("<input>").attr("type", "button")
	    .attr("value", "Play Again");
	$newGameButton.on("click", function(event) {
	    $(event.target).remove();
	    that.game.restart();
	});
	$("#stats").append($newGameButton);
    };

    generatePrompts();
    attachEventListeners();
    this.show();
};

