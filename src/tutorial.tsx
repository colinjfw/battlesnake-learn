import React from "react";
import Markdown from "react-markdown";
import raw from "raw.macro";

export const Landing = () => (
  <div className="blankslate">
    <h2 className="f1-light">Learn to code with Battlesnake</h2>
    <p>
      <a target="_blank" href="https://battlesnake.com">
        Battlesnake
      </a>{" "}
      is a programming competition where competitors build snakes using code and
      battle them against other competitors. This tutorial will help you build a
      snake and get it deployed so you can get started with Battlesnake.
    </p>
    <p className="lead-mktg">
      The next tutorials will walk you through the basics of programming as well
      as building a Battlesnake.
    </p>
    <p>Click next to get started.</p>
  </div>
);

export const MoveCommand = () => (
  <Markdown source={raw("./tutorials/move-command.md")} />
);
export const Introduction = () => (
  <Markdown source={raw("./tutorials/introduction.md")} />
);

export const tutorials = [Landing, Introduction, MoveCommand];
