import {
    RexComponent as IRexComponent,
    RexComponentOptions,
} from "../../interfaces";
import "paper";

export abstract class RexComponent<T extends RexComponentOptions>
    implements IRexComponent
{
    paperElement: paper.Group | null = null;
    options?: T | undefined;
    childrenMap: Map<string, paper.Item>;

    constructor(options?: T) {
        this.options = options;
        this.childrenMap = new Map();
    }

    addChild(name: string, item: paper.Item) {
        this.childrenMap.set(name, item);
        item.name = name;
        this.paperElement?.addChild(item);
    }

    getChildren(name: string) {
        return this.childrenMap.get(name);
    }

    getPaperItem() {
        return this.paperElement;
    }

    // 处理disable Style
    handleDisable() {}
}
