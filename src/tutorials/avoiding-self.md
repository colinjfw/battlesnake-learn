Did you notice something isn't quite right? Our snake seems to run into itself
sometimes! We've left something out. Since our snake can still move into itself,
in situations where our snake won't survive, it will turn into itself. To fix
this, we can to include logic to avoid running into our own body.

Let's make another function that can take a coordinate and compare it to the
second element in our snake body to make sure our snake won't move into this
position.

```javascript
function coordEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}
```

We can add this into our main move function to ensure that our snake won't move
into its own body:

```javascript
function move(state) {
  const head = state.you.body[0];
  const neck = state.you.body[1];
  const moves = ['up', 'down', 'left', 'right'];

  for (const move of moves) {
    const coord = moveAsCoord(move, head);
    if (!offBoard(state, coord) && !coordEqual(coord, neck)) {
      return {move: move};
    }
  }
  return {move: 'up'};
}
```

We've named this part of the snake "neck" even though snakes probably don't have
necks… Right? Well ours does now! Neck represents the link in our body right
after the head.

Now let's deploy our snake again and see how it does!
