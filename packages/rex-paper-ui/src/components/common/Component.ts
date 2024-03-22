import {
    RexComponent as IRexComponent,
    RexComponentOptions,
} from "../../interfaces";

export abstract class RexComponent implements IRexComponent {
    options?: RexComponentOptions | undefined;

    constructor(options?: RexComponentOptions) {
        this.options = options;
    }
}
