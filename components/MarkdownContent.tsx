import type { ReactNode } from "react";

type MarkdownContentProps = {
  content: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function inlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts.filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]}>
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line === "---") {
      nodes.push(<hr key={index} />);
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      const title = line.slice(4);
      nodes.push(
        <h3 id={slugify(title)} key={index}>
          {inlineMarkdown(title)}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      const title = line.slice(3);
      nodes.push(
        <h2 id={slugify(title)} key={index}>
          {inlineMarkdown(title)}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      nodes.push(<h1 key={index}>{inlineMarkdown(line.slice(2))}</h1>);
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quoteLines.push(lines[index].trim().slice(2));
        index += 1;
      }
      nodes.push(
        <blockquote key={index}>
          {quoteLines.map((quoteLine, quoteIndex) => (
            <p key={`${quoteLine}-${quoteIndex}`}>{inlineMarkdown(quoteLine)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        listItems.push(lines[index].trim().slice(2));
        index += 1;
      }
      nodes.push(
        <ul key={index}>
          {listItems.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{inlineMarkdown(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,3} |>|- |---$)/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    nodes.push(<p key={index}>{inlineMarkdown(paragraphLines.join(" "))}</p>);
  }

  return <div className="article-body">{nodes}</div>;
}
