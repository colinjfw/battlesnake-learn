import React, { useState } from "react";
import Markdown from "react-markdown";
import raw from "raw.macro";
import { targets } from "./zip";

export interface Props {
  code: string;
  next?: () => void;
  prev?: () => void;
}

function Title({ next, prev, title }: Props & { title: string }) {
  return (
    <header className="border-bottom d-flex p-3">
      <div className="flex-auto f2-light border-none">{title}</div>
      <div className="BtnGroup">
        <button
          disabled={!prev}
          className="btn btn-outline BtnGroup-item"
          onClick={prev}
        >
          &lt; Back
        </button>
        <button
          className="btn btn-outline BtnGroup-item"
          disabled={!next}
          onClick={next}
        >
          Next &gt;
        </button>
      </div>
    </header>
  );
}

function Body(props: { src: string; children?: any }) {
  return (
    <div className="markdown-body overflow-scroll p-3 flex-auto height-page2">
      <Markdown source={props.src} />
      {props.children}
    </div>
  );
}

export const Landing = (props: Props) => (
  <>
    <Title {...props} title="Welcome to Battlesnake!" />
    <Body src={raw("./tutorials/landing.md")} />
  </>
);

export const MoveCommand = (props: Props) => (
  <>
    <Title {...props} title="Moving your Snake" />
    <Body src={raw("./tutorials/move-command.md")} />
  </>
);

export const AvoidWalls = (props: Props) => (
  <>
    <Title {...props} title="Avoiding Walls" />
    <Body src={raw("./tutorials/avoiding-walls.md")} />
  </>
);

export const AvoidSelf = (props: Props) => (
  <>
    <Title {...props} title="Avoiding Yourself" />
    <Body src={raw("./tutorials/avoiding-self.md")} />
  </>
);

export const Introduction = (props: Props) => (
  <>
    <Title {...props} title="Battlesnake Basics" />
    <Body src={raw("./tutorials/introduction.md")} />
  </>
);

export const Download = (props: Props) => (
  <>
    <Title {...props} title="Download your Snake!" />
    <Body src={raw("./tutorials/deployment.md")}>
      <div className="BtnGroup d-flex flex-justify-center p-3">
        {targets.map((target) => (
          <button
            key={target.name}
            className="btn BtnGroup-item"
            onClick={() => target(props.code)}
          >
            {target.title}
          </button>
        ))}
      </div>
    </Body>
  </>
);

export const tutorials = [
  Landing,
  Introduction,
  MoveCommand,
  AvoidWalls,
  AvoidSelf,
  Download,
];
