import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import run from "./libs/game-render.client";

window.run = run;

hydrate(<RemixBrowser />, document);
