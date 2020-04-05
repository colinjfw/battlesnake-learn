## 2. Understanding the Move Command

In our first version of our snake we started with a function that returns a
static direction. This causes our snake to go to the right side of the board
until it runs into the wall. Let's inspect what that 'state' parameter looks
like that gives us control over our snake.

Add the `console.log` to the `move` functiona and restart the game and open the
browser console. With the game running you will be able to inspect the state
passed to your function.

```javascript
function move(state) {
  console.log(state)
  return { move: "up" };
}
```

The state parameter should look similar to this state value below. This is
everything that we need to inspect the status of our snake and take action to
avoid walls, eat food or try and eat other snakes.

```javascript
{
  "game": {
    "id": "game-id-string"
  },
  "turn": 1,
  "board": {
    "height": 11,
    "width": 11,
    "food": [{
      "x": 1,
      "y": 3
    }],
    "snakes": [{
      "id": "snake-id-string",
      "name": "Sneky Snek",
      "health": 100,
      "body": [{
        "x": 1,
        "y": 3
      }]
    }]
  },
  "you": {
    "id": "snake-id-string",
    "name": "Sneky Snek",
    "health": 100,
    "body": [{
      "x": 1,
      "y": 3
    }]
  }
}
```
