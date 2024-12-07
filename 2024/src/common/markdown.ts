import chalk from "chalk";
import { marked, Renderer, Tokens } from "marked";

class PuzzleRenderer extends Renderer {
  constructor() {
    super();

    this.heading = this.heading.bind(this);
    this.paragraph = this.paragraph.bind(this);
    this.strong = this.strong.bind(this);
    this.em = this.em.bind(this);
    this.codespan = this.codespan.bind(this);
    this.link = this.link.bind(this);
    this.list = this.list.bind(this);
    this.listitem = this.listitem.bind(this);
  }

  heading({ tokens, depth }: Tokens.Heading): string {
    const text = this.parser.parseInline(tokens);
    return chalk.bold(`--- ${text} ---\n\n`);
  }

  paragraph({ tokens }: Tokens.Paragraph): string {
    const text = tokens
      .map((token) => {
        if (token.type === "text") {
          return chalk.reset.dim(`${token.text || ""}`);
        } else {
          return this.parser.parseInline([token]);
        }
      })
      .join("");
    return `${text}\n\n`;
  }

  strong({ tokens }: Tokens.Strong): string {
    const text = this.parser.parseInline(tokens);
    return chalk.bold(chalk.hex("#FFD700")(text));
  }

  em({ tokens }: Tokens.Em): string {
    const text = this.parser.parseInline(tokens);
    return chalk.bold(text);
  }

  code({ text }: Tokens.Code): string {
    return chalk.bgBlack.white(`${text}\n\n`);
  }

  codespan({ text }: Tokens.Codespan): string {
    return chalk.bgBlackBright.whiteBright(`${text}`);
  }

  link({ href, text }: Tokens.Link): string {
    return chalk.blue.underline(`${text} (${href})`);
  }

  list({ ordered, start, items }: Tokens.List): string {
    const renderedItems = items
      .map((item, index) => {
        const prefix = ordered ? chalk.yellow((start || 1) + index) : `• `;
        const content = this.listitem(item);
        return `${prefix}${content}`;
      })
      .join("");
    return `${renderedItems}\n`;
  }

  listitem({ tokens }: Tokens.ListItem): string {
    const text = this.parser.parseInline(tokens);
    return chalk.green(`${text}\n`);
  }
}

function render(markdown: string): string {
  const renderer = new PuzzleRenderer();
  return marked(markdown, { renderer, async: false });
}

export { render };
