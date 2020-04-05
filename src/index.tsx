import React from "react";
import ReactDOM from "react-dom";
import raw from "raw.macro";

import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

import Board from "./Board";
import * as engine from "./engine";
import * as code from "./code";
import { tutorials } from "./tutorial";
import { Logo } from "./ui";

import "@primer/css/dist/primer.css";
import "./index.css";

interface AppState {
  code: string;
  tutorial: number;
  running?: boolean;
  cancelled?: boolean;
  frame: engine.Frame;
  error?: Error;
}

const basicSnake = raw("./examples/basic.js");
const placeholder = raw("./examples/placeholder.js");

class App extends React.Component<{}, AppState> {
  initial = localStorage.getItem("code") || placeholder;
  editor: editor.IStandaloneCodeEditor | undefined;
  state: AppState = {
    tutorial: parseInt(localStorage.getItem("step") || "0"),
    code: this.initial,
    frame: engine.initialFrame,
  };

  componentDidMount = () => {
    setTimeout(this.handleStart, 1000);
  }

  cancelled = () => !!this.state.cancelled;

  handleInit = () => {
    if (!this.editor) {
      return;
    }
    this.editor.onDidChangeModelContent(() => {
      this.handleCodeChange(this.editor!.getValue());
    });
  }

  handleSetTutorial = (change: number) => {
    const tutorial = this.state.tutorial + change;
    this.setState({ tutorial });
    localStorage.setItem("step", tutorial.toString());
  };
  handleNext = () => this.handleSetTutorial(1);
  handlePrev = () => this.handleSetTutorial(-1);

  handleCodeChange = (code: string) => {
    localStorage.setItem("code", code);
    this.setState({ code });
  };

  handleReset = () => {
    this.setState({
      cancelled: true,
      running: false,
      frame: engine.initialFrame,
    });
  };

  handleStop = () => {
    this.setState({ cancelled: true, running: false });
  };

  handleStart = () => {
    if (this.state.running) {
      return;
    }
    this.setState({ running: true });
    this.run();
  };

  run = background(async () => {
    this.setState({ cancelled: false });
    try {
      const js = this.state.code === placeholder ? basicSnake : this.state.code;
      const snake = code.evaluate(js);
      await engine.run(snake, this, (frame) => {
        this.setState({ frame, error: undefined });
      });
      this.setState({ running: false });
    } catch (error) {
      console.log(error);
      this.setState({ error, running: false });
    }
  });

  render() {
    const { tutorial, error, code, running, frame } = this.state;
    const Tutorial = tutorials[tutorial];
    return (
      <>
        <header className="Header bg-gray-dark">
          <div className="Header-item">
            <a href="https://battlesnake.com" target="_blank"><Logo /></a>
          </div>
          <div className="Header-item Header-item--full f3 text-mono">
            Learn to Battlesnake!
          </div>
        </header>
        <main className="height-page d-flex flex-content-stretch">
          <div className="flex-1 markdown-body bg-gray-light position-relative height-page overflow-scroll p-4">
            <Tutorial />
            <div className="BtnGroup d-flex flex-justify-center p-3">
              {tutorial > 0 && (
                <button className="btn BtnGroup-item" onClick={this.handlePrev}>
                  &lt; Back
                </button>
              )}
              {tutorial < tutorials.length - 1 && (
                <button className="btn BtnGroup-item btn-primary" onClick={this.handleNext}>
                  Next &gt;
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 bg-vs-dark height-page overflow-hidden">
            <Editor
              height="100%"
              value={this.initial}
              editorDidMount={(_, ref) => {
                this.editor = ref;
                this.handleInit();
              }}
              language="javascript"
              theme="dark"
              options={{
                minimap: { enabled: false },
                scrollbar: { vertical: "hidden", verticalScrollbarSize: 0 },
              }}
            />
          </div>
          <div className="flex-1 bg-vs-dark height-page border-left">
            <div className="p-2 height-page">
              <div className="text-center text-red" style={{ height: '25px' }}>
                {error && error.message}
              </div>
              <Board
                food={frame.food}
                columns={frame.game.width}
                rows={frame.game.height}
                snakes={[frame.snake]}
              />
              <div className="BtnGroup d-flex flex-justify-center mt-3">
                {!running && (
                  <button className="btn BtnGroup-item" onClick={this.handleStart}>
                    Play
                  </button>
                )}
                {running && (
                  <button className="btn BtnGroup-item" onClick={this.handleStop}>
                    Pause
                  </button>
                )}
                <button className="btn BtnGroup-item" onClick={this.handleReset}>Reset</button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

function background(fn: () => void) {
  return () => setTimeout(fn, 0);
}

ReactDOM.render(<App />, document.getElementById("root"));
