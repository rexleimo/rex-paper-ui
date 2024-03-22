import "./style.css";
import { RexPaperUi, Button } from "rex-paper-ui/src/index";

new RexPaperUi(document.getElementById("app")!, {});
new Button({
    text: "Hello",
    color: "#fff",
});
