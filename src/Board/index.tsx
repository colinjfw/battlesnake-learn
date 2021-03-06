import React from "react";
import Grid from "./Grid";
import { colors } from "./theme";
import { Snake, Food } from "../engine";
import { headSvg, tailSvg } from "./svg";

const styles = {
  width: "100%",
  height: "85%",
};

interface BoardProps {
  food: Food[];
  columns: number;
  rows: number;
  snakes: Snake[];
}

class Board extends React.Component<BoardProps> {
  render() {
    const snakes = this.props.snakes.map((snake: any) => {
      snake.headSvg = headSvg;
      snake.tailSvg = tailSvg;
      return snake;
    });
    return (
      <svg
        style={{ display: "block", margin: "auto" }}
        viewBox="0 0 90 90"
        height={styles.height}
        width={styles.width}
      >
        <rect x="0" y="0" width="90" height="90" fill={colors.pageBackground} />

        <Grid
          snakes={snakes}
          food={this.props.food}
          columns={this.props.columns}
          rows={this.props.rows}
          maxWidth={90}
          maxHeight={90}
          x={0}
          y={0}
        />
      </svg>
    );
  }
}

export default Board;
