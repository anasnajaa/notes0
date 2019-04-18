# notes0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

https://www.markdownguide.org/cheat-sheet


Populate with data for testing:

```
localStorage.setItem('notes', JSON.stringify([]));
let u = [];
for(let i = 0; i < 10000; i++) {
	u.push({
		id: i,
		title: 'note ' + i,
		content: `
Marked - Markdown Parser
========================

How To Use The Demo
-------------------

1. Item 1.
2. Item 2.
3. Item 3.

- **Preview:**  This text is parsed to HTML.

> Parsing was done using Markdown Lib.

***It supports links and even images.***

This is a local link [home](#/), click it.`,
		tags: ['test ' + i],
		dateCreated: '20190417T185300',
		dateModefied: null
	})
}
localStorage.setItem('notes', JSON.stringify(u));
```
