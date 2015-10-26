var DomBoard = function DomBoard(game) {
    var that = this;
    this.game = game;
    this.$table = $("<table>");


    this.displayMessage = function displayMessage(string) {
	$("#messages").empty()
	    .append($("<h7 class='animated pulse infinite'>").text(string).css("text-align", "center"));
    };
    var setHandlers = function setHandlers($cell, i, j) {
    //     $cell.on("mouseover", function(event) {
    // 	    showImage($(event.target));
    // 	    // $(event.target).css("background-image", "game.currentPlayer.token");
    // })
    // 	    .on("mouseleave", function(event) {
    // 		// $(event.target).text();
    // 		$(event.target).empty();
    // 	    })
	$cell.on("click", function(event) {
	    $(event.target).empty();
	    showImage($(event.target));
	    $(event.target).off();
	    that.displayMessage(that.game.currentPlayer().name + "'s Move");
	    that.game.makeMove(i, j);
	});
    };


    var generateBoard = function generateBoard() {
	$("h1").text(that.game.name);
	for (var i = that.game.m - 1; i >= 0; i--) {
	    var $row = $("<tr>");
	    for (var j = 0; j < that.game.n; j++) {
		var $cell = $("<td>");
		setHandlers($cell,i, j);
		$row.append($cell);
	    }
	    that.$table.append($row);
	}
	$("#game-container").empty().prepend(that.$table).append($("<div id='messages'>"));
    };

    var generatePlayerPrompts = function generatePlayerPrompts() {
	var $mainDiv = $("<div id='player-stats'>").append($("<div class='row'>"));

	// temp
	var tokens = ["./img/X.png", "./img/O.png"];

	for(var i = 0; i < 2; i++) {
	    var $player = $("<div class='player-info one-third column left' id='player" + i + "'>");
	    $player.append($("<h4>").text("Player " + (i + 1)));
	    var $input = $("<input>").attr("type", "text")
		.attr("id", i)
		.attr("placeholder", "Enter your name");
	    var $button = $("<input>").attr("type", "button")
		.attr("value", "Submit");
	    
	    var setEventHandler = function setEventHandler(i, $input) {
		$button.on("click", function(event) {
		    var name = $input.val();
		    that.game.createPlayer(name, tokens[i], i);
		    $("#player" + i).empty().append($("<h4>").text(name));
		    if (!that.game.notEnoughPlayers()) {
			console.log("hey");
			that.displayMessage(that.game.currentPlayer().name + "'s turn");
						       }
		});
	    };

	    setEventHandler(i, $input);

	    $player.append($input).append($button);
	    $(".row", $mainDiv).append($player);
	}

	var $stats = $("<div class='one-third column' id='stats'>");
	$stats = $stats.append($("<h5>").html("<span id='player0-score'>0</span>   Score   <span id='player1-score'>0</span>"));
	$mainDiv.children().eq(0).children().eq(0).after($stats);

	$(".container").append($mainDiv);
	that.displayMessage("Please Enter Player Names");
    };

    var showImage = function showImage($cell) {
	$cell.append($("<img>").attr("src", game.currentPlayer().token).css("width", "100%"));
    };


    generateBoard();
    generatePlayerPrompts();
    

    this.win = function win(playerId) {
	
	$("#player" + playerId + "-score").text(this.game.score[playerId]);
	debugger;
	this.displayMessage(this.game.currentPlayer().name + " Won!");

	var $newGameButton = $("<input id='new-game'>").attr("type", "button")
	    .attr("value", "Play Again");
	$newGameButton.on("click", function() {
	    that.game.restart();
	});

	$("#stats").append($newGameButton);
	$("td").off()
    };
    
    this.restart = function restart() {
	this.$table.empty();
	$("#new-game").remove();
	generateBoard();
    };

};
