/**
 * A basic snake implementation for example purposes.
 */

function start() {
  return { color: 'green' };
}

function coordEqual(a, b) {
  return a.x === b.x && a.y === b.y
}

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

function offBoard(state, coord) {
  if (coord.x < 0) return true;
  if (coord.y < 0) return true;
  if (coord.y >= state.board.height) return true;
  if (coord.x >= state.board.height) return true;
  return false; // If it makes it here we are ok.
}

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
