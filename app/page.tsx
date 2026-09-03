import HeroDate from "@/components/HeroDate";
import ScriptBoot from "@/components/ScriptBoot";
import bodyHtml from "@/content/home/body";
import { staticScripts } from "@/content/home/scripts";

export default function HomePage() {
  return (
    <>
      {/*
        The exact markup of the saved static homepage, server-rendered so the
        first paint is pixel-identical to the original page. ScriptBoot unwraps
        these nodes into <body> and re-executes the page's scripts after
        hydration, so animations behave exactly as in the original document.
      */}
      <div id="od-static-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <ScriptBoot scripts={staticScripts} rootId="od-static-root" />
      <HeroDate />
    </>
  );
}
