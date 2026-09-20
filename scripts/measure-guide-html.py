"""Measure the built guide HTML without changing or compressing its content."""
import json
from html.parser import HTMLParser
from pathlib import Path

class Sections(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=False)
        self.html, self.stack, self.parts = html, [], []
        self.lines = [0]
        for line in html.splitlines(keepends=True): self.lines.append(self.lines[-1] + len(line))
        self.feed(html)
    def position(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column
    def handle_starttag(self, tag, attrs):
        if tag in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}: return
        self.stack.append((tag, self.position(), dict(attrs)))
    def handle_endtag(self, tag):
        index = next((i for i in range(len(self.stack)-1, -1, -1) if self.stack[i][0] == tag), None)
        if index is None: return
        _, start, attrs = self.stack[index]
        del self.stack[index:]
        if attrs.get('id') and tag in {'section','article','div'}:
            end = self.html.find('>', self.position()) + 1
            self.parts.append({'id':attrs['id'], 'htmlBytes':len(self.html[start:end].encode())})

def measure(root='build'):
    result = {}
    for guide in ['llm','gpu-selection']:
        for locale in ['fa','en','es']:
            route = f"{'' if locale=='fa' else locale+'/'}guides/{guide}/"
            file = Path(root)/route/'index.html'
            html = file.read_text()
            sections = Sections(html).parts
            result[route] = {'htmlBytes':file.stat().st_size, 'gzipBytes':Path(str(file)+'.gz').stat().st_size,
                             'largestSections':sorted(sections,key=lambda p:p['htmlBytes'],reverse=True)[:14]}
    return result
if __name__ == '__main__': print(json.dumps(measure(),ensure_ascii=False,indent=2))
