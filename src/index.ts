const { program } = require('commander');
const pkg = require('./../package.json');
import Screenshotter from "./Screenshotter";

program
    .version(pkg.version)
    .description('')
    .option('-s, --selector <querySelector>', 'Element selector (#someId) which you would like to screenshot. It screenshots whole page if no selector is specified.')
    .option('-p, --pattern <pattern>', 'Glob pattern/path to find .html files', process.cwd() + '/**/*.html')
    .option('-d, --delay <miliseconds>', 'How long it should wait before screenshot after page load', '0')
    .option('-q, --quality <number>', 'JPEG output quality', '100')
    .parse();

(new Screenshotter(program.opts()))
    .run()
    .then(()=> console.info('Done!'))
    .catch(err => console.error(err));
