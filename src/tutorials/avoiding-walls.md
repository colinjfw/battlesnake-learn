Over the next few steps we are going to build logic to avoid hitting a wall.
What we'll replicate in code is essentially 2 steps:

1. Inspect the directions that we can move our head.
1. Check if any potential directions are off of the board

### 1 Find our head

Let's first find our head in the move function let's get the first element of
our body - that's our head!

```javascript
function move(state) {
  const head = state.you.body[0];
  ...
}
```

The next step that we want to take on is examining all of the directions that we
can take. On the snake grid we know there are the four directions that we can
move. The key to detecting whether a move will put us off the board is figuring
out the coordinates that we will be at after the move. Let's build a function
that calculates our position after a move is made:

```javascript
function moveAsCoord(move, head) {
  switch (move) {
    case 'up':
      return {x: head.x, y: head.y-1};
    case 'down':
      return {x: head.x, y: head.y+1};
    case 'left':
      return {x: head.x-1, y: head.y};
    case 'right':
      return {x: head.x+1, y: head.y};
  }
}
```

Now we can scaffold out the next step of our move. We get the set of moves that
we can make, loop over them and then find the point that we'll end up at:

```javascript
function move(state) {
  const head = state.you.body[0];
  const moves = ['up', 'down', 'left', 'right'];

  for (const move of moves) {
    const coord = moveAsCoord(move, head);
    // We now know where this is going to be!
  }
}
```

Our snake can now find out where its head is doing to end up if it moves in any
potential direction.

### 3 Check if the potential directions are off of the board

The next step is for us to figure out if a position exceeds the height or width
of the board. Let's create a new "offBoard" function that tells us whether
anything is off of the board. This is a function which checks all sides of the
board to see if the coordinate is below or above the board range:

```javascript
function offBoard(state, coord) {
  if (coord.x < 0) return true;
  if (coord.y < 0) return true;
  if (coord.y >= state.board.height) return true;
  if (coord.x >= state.board.height) return true;
  return false; // If it makes it here we are ok.
}
```

Now we have all of the pieces. We can calculate the point where our snake will
end up and tell if this point is off the board. Let's wire it all up!

This is where I usually compare my logic to the original intent, does it make
sense? Is it readable?

```javascript
function move(state) {
  const head = state.you.body[0];
  const moves = ['up', 'down', 'left', 'right'];

  for (const move of moves) {
    const coord = moveAsCoord(move, head);
    if (!offBoard(state, coord)) {
      return {move: move};
    }
  }
  return {move: 'up'};
}
```
