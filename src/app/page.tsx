import { readFile } from "fs/promises";
import Markdown from "react-markdown";

export default async function Home() {
  const readme = await readFile("README.md", "utf-8");

  return (
    <section className="px-5 py-4">
      <article className="prose dark:prose-invert">
        <Markdown>{readme}</Markdown>
      </article>
    </section>
  );
}
