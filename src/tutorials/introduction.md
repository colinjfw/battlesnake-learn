Foundational knowledge of Javascript and Node.js isn't covered in this guide,
but feel free to follow along to get a taste for how to start thinking like a
Battlesnake developer!

#### What is Battlesnake?

A Battlesnake is a programmed web server that implements the Battlesnake API to
play the game snake against other Battlesnakes. When a game is running, the
Battlesnake Game Engine will make HTTP requests to your server, sending you game
information and asking for your next move.

The main endpoint is the `/move` endpoint, the Battlesnake engine will ask for
your move out of the set of (up, down, left or right).

#### Basics of grid

The game Snake is played out over a grid which looks roughly like this:

```
- - - - - - - - - - - - - - -
|0,0|   |   |   |   |   |7,0|
- - - - - - - - - - - - - - -
|   |   |   |   |   |   |   |
- - - - - - - - - - - - - - -
|   |   |   |   |   |   |   |
- - - - - - - - - - - - - - -
|   |   |   |   |   |   |   |
- - - - - - - - - - - - - - -
|   |   |   |   |   |   |   |
- - - - - - - - - - - - - - -
|   |   |   |   |   |   |   |
- - - - - - - - - - - - - - -
|0,7|   |   |   |   |   |7,7|
- - - - - - - - - - - - - - -
```

The size of the grid is determined at the start of the game. We express the
coordinates of a specific point on this grid in (x, y) format. Note that the y
axis 0 is at the top of the board.

#### Using this guide

This guide is implemented with a browser based version of the engine. You won't
be able to play with other snakes until you deploy the server to production but
you will be able to learn quickly and get ramped up on the basic concepts. Add
the below code to the code panel to your right and reset the game board.

```javascript
function move() {
  return { move: "up" };
}
function start() {
  return { color: "green" };
}
```

Watch your snake go up and hit the top of the wall. You're ready to move onto
the next step!
