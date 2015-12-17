# (m, n, k) Game
Disclaimer: This is my first ever coding project, so you should feel bad if you judge it :smile:

This is a small browser-only game which allows users to play popular instances of [(m, n, k) Games](https://en.wikipedia.org/wiki/M,n,k-game). You can play differently sized [Tic-Tac-Toe](https://en.wikipedia.org/wiki/M,n,k-game) games, [Gomoku](https://en.wikipedia.org/wiki/Tic-tac-toe), [Connect6](https://en.wikipedia.org/wiki/Connect6) and the extra special [Inception Tic-Tac-Toe](http://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/) which is surprisingly not widely known, but makes for a great bar game.

# User Story
- A user can initiate a game of their choice
- A user has to enter player names (both players play on the same computer)
- Players can then make their respective moves
- Notification messages appear to keep track of turns
- Scores are kept for the current sessions so two players can play multiple games

# The Code
This was originally written entirely in HTML, CSS and Javascript and a simple Express.JS server was added later for deployment purposes. With the exception of jQuery (and Skeloton.css for styling purposes) it has no external dependencies. The game engine is contained in the ```Player``` and ```Game``` objects.

The ```player``` instance holds its own moves, and can make a move and determine the score of a move. The score of a move I defined as the maximum length of consecutive ticks the current player makes with the current move. This value is enough to determine a possible victory, as if the score is ```k``` then the game is won by that player.

The ```game``` instance holds the two players and has methods to make moves, by delegating to the respective player, check for wins and ties, and restart. The game constructor supports any (m, n, k, p, q) game but for rendering purposes only few games are currently playable. 

The rendering is handled by several objects (```GameContainer```, ```GameChooser```, ```Messages```, ```PlayerStats```), which deal with all the DOM manipulation.

# Further Work
My lack of experience led to code which was too highly coupled to the DOM so implementing the Inception Tic-Tac-Toe had to be separately written. Further work has moved to a [multiplayer version](https://github.com/pppetrov/mnk-multiplayer) of the game, which will be built with backbone and socket.io, and eventually have a slack integration, which will allow players to challenge each other and keep score and a company wide leader board.

