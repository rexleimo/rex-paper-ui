import "./style.css";
import {
    RexPaperUi,
    Button,
    ButtonGroup,
    CheckBox,
    Radio,
} from "rex-paper-ui/src/index";
import pulsIcon from "./plus.svg";
import { Point } from "paper";

const ui = new RexPaperUi(document.getElementById("app")!, {});
const button1 = new Button({
    text: "Hello Word",
    color: "danger",
    // disable: true,
    startDecorator: pulsIcon,
});

const button2 = new Button({
    text: "Hello Word",
    color: "success",
    // disable: true,
    startDecorator: pulsIcon,
});

const button3 = new Button({
    text: "Hello Word",
    color: "primary",
    // disable: true,
    startDecorator: pulsIcon,
});

const buttonGroup = new ButtonGroup({
    buttons: [button1, button2, button3],
});

const checkbox = new CheckBox({
    point: new Point(1, 50),
    label: "checkbox",
    color: "success",
    selected: false,
});

const radio = new Radio({
    point: new Point(1, 100),
    label: "label",
});
