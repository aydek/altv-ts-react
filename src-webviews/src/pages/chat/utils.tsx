

export function highlightWords(text: string): JSX.Element {
    const matches: { found: string; index: number }[] = [];
    let startIndex = 0;

    while (true) {
        const start = text.indexOf('{#', startIndex);
        if (start === -1) break;

        const end = text.indexOf('}', start + 2);
        if (end === -1) break;

        matches.push({
            found: text.substring(start, end + 1),
            index: start,
        });

        startIndex = end + 1;
    }

    if (matches.length === 0) {
        return <div>{text}</div>;
    }

    const parts: string[] = [];
    let lastIndex = text.length;

    for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];
        const color = match.found.substring(2, match.found.length - 1);

        parts.unshift(text.substring(match.index + match.found.length, lastIndex));
        parts.unshift(`</font><font color="#${color}">`);

        lastIndex = match.index;
    }

    parts.unshift(text.substring(0, lastIndex));
    parts.push('</font>');

    return <div dangerouslySetInnerHTML={{ __html: parts.join('') }} />;
}
