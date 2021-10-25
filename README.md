# Recushot
Create recursive screenshots of local HTML files using [Puppeteer](https://github.com/puppeteer/puppeteer) and [Glob](https://github.com/isaacs/node-glob).

## How does it work
Suppose we have the following hierarchy of files and we would like to screenshot a specific element in each of them.
```
root
└─ /directory1
   └─── /index.html
└─ /directory2
   └─── /whatever.html
└─ /directory3
   └─── /another.html
```
I _root_ directory we can call:
```
recushot --selector '#myElementId'
```
Recushot will recursively traverse each _.html_ file in current directory and screenshot element _#myElementId_ (if found).

**Output** should look like this:
```
root
└─ /directory1
   └─── /index.html
└─ /directory2
   └─── /whatever.html
└─ /directory3
   └─── /another.html
└─ directory1.jpeg
└─ directory2.jpeg
└─ directory3.jpeg
```

### Delay
If you need to take a screenshot of something with a delay (animated web, HTML banner), you can pass the _delay_ parameter.
```
recushot --selector '#myElementId' --delay 2500
```
it waits 2.5s from the time the window is opened before taking a picture.

## Options
| short        | long           | desc  | default  |
| ------------- |-------------| -----| -----|
| `-V` | `--version`                  | output the version number
| `-s` | `--selector <querySelector>` | Element selector (#someId) which you would like to screenshot. It screenshots whole page if no selector is specified.
| `-p` | `--pattern <pattern>`        | Glob pattern/path to find .html files | cwd + `**/*.html`
| `-d` | `--delay <miliseconds>`      | How long it should wait before screenshot after page load | 0
| `-q` | `--quality <number>`         | JPEG output quality | 100
| `-h` | `--help`                     | display help for command

