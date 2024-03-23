import { RexComponentOptions } from "../../interfaces";
import { COLOR } from "../color";
import { RexComponent } from "../common";
import Button from "./Button";
import Paper from "paper";

interface ButtonGroupOptions extends RexComponentOptions {
    buttons?: Button[];
}

class ButtonGroup extends RexComponent<ButtonGroupOptions> {
    constructor(options: ButtonGroupOptions) {
        super(options);

        this.paperElement = new Paper.Group({
            applyMatrix: false,
        });
        this.paperElement.pivot = new Paper.Point(0, 0);
        const buttons: Button[] = this.options?.buttons || [];
        let preState = {
            left: 0,
        };
        for (let index = 0; index < buttons.length; index++) {
            const button = buttons[index];
            const el = button.getPaperItem()!;
            this.addChild(`button${index}`, el!);
            el.pivot = new Paper.Point(0, 0);
            el.position.x = preState.left;
            preState.left =
                el.position.clone().x + el.bounds.clone().width + 23;

            if (index === 0) {
                const line = new Paper.Path.Rectangle({
                    point: [1, 0],
                    size: [8, el.bounds.clone().height],
                });
                line.fillColor = button.primaryColor;
                line.position.x = el.bounds.clone().width + 15;
                line.bringToFront();
                button.addChild("line", line);
            } else if (index === buttons.length - 1) {
                const line = new Paper.Path.Rectangle({
                    point: [0, 0],
                    size: [8, el.bounds.clone().height],
                });
                line.fillColor = button.primaryColor;
                line.position.x = 0;
                line.bringToFront();
                button.addChild("line", line);
            } else {
                const line = new Paper.Path.Rectangle({
                    point: [1, 0],
                    size: [8, el.bounds.clone().height],
                });
                line.fillColor = button.primaryColor;
                line.position.x = 0;
                line.bringToFront();
                button.addChild("line", line);
                const rightLine = line.clone();
                button.addChild("rightLine", rightLine);
                rightLine.bounds.width = 8;
                rightLine.position.x = el.bounds.clone().width + 11;
            }
        }
    }
}

export default ButtonGroup;
