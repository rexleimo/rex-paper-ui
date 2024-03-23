import "./style.css";
import { RexPaperUi, Button } from "rex-paper-ui/src/index";
import pulsIcon from "./plus.svg";
import { Point } from "paper";

new RexPaperUi(document.getElementById("app")!, {});
new Button({
    text: "Hello Word",
    color: "danger",
    // disable: true,
    startDecorator: pulsIcon,
    point: new Point(0, 0),
});

new Button({
    text: "Hello Word",
    color: "success",
    // disable: true,
    startDecorator: pulsIcon,
    point: new Point(120, 0),
});

new Button({
    text: "Hello Word",
    color: "primary",
    // disable: true,
    startDecorator: pulsIcon,
    point: new Point(240, 0),
});
