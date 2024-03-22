import {
    RexComponent as IRexComponent,
    RexComponentOptions,
} from "../../interfaces";

export abstract class RexComponent<T extends RexComponentOptions>
    implements IRexComponent
{
    paperElement: paper.Group | null = null;
    options?: T | undefined;

    constructor(options?: T) {
        this.options = options;
    }
}
