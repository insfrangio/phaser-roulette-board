import { BoardMainCols, ColElement, Row } from "../types";
import { Figure } from "./Figure";

export class HoverManager {
  private hoverFigures: Figure[] = [];

  constructor(hoverFigures: Figure[]) {
    this.hoverFigures = hoverFigures;
  }

  public changeFigureColor(
    figure: ColElement | Row | BoardMainCols,
    alpha: number
  ) {
    figure.hoverOptions?.forEach((hoverOption) => {
      this.hoverFigures?.find((figureItem) => {
        if (figureItem.name === hoverOption) {
          figureItem.changeColor(alpha);
          return true;
        }
        return false;
      });
    });
  }

  public addFigure(figure: Figure) {
    this.hoverFigures.push(figure);
  }
}
