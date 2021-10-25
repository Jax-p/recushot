import puppeteer, {Browser, Page} from "puppeteer";
import glob from "glob";
import path from "path";

export default class Screenshotter
{
    browser: Browser | undefined;

    constructor(private opts: IScreenshotterOpts) {
        if (typeof opts.quality !== "number")
            opts.quality = parseInt(opts.quality);
        if (isNaN(opts.quality))
            throw new Error('Quality must be a number.')
    }

    async run() {
        this.browser = await puppeteer.launch();
        const files = glob.sync(this.opts.pattern, {});
        const promiseQue = [];
        for (const file of files)
            promiseQue.push(this.handleHtmlFile(file));
        await Promise.all(promiseQue);
        return this.browser.close();
    }

    handleHtmlFile = async (filepath: string) => {
        if (!this.browser) return;
        const page = await this.browser.newPage();
        await page.goto(`file://${filepath}`);
        const outFilename = path.dirname(filepath)
            .replace(`${process.cwd()}/`,'')
            .replaceAll('/','_') + '.jpg';
        console.info(`I'm getting ready to take a screenshot of the ${outFilename} with delay ${this.opts.delay}`)
        await this.screenshot(page, outFilename);
    }

    screenshot = (page: Page, filename: string) =>
        new Promise<void>(resolve => {
            setTimeout(async ()=>{
                this.opts.selector && await page.waitForSelector(this.opts.selector);
                const toScreenshot = this.opts.selector ? await page.$(this.opts.selector) : page;
                if (!toScreenshot) return;
                await toScreenshot.screenshot({path: filename, quality: this.opts.quality});
                console.info(`Screenshot of ${filename} has been created`)
                resolve();
            }, this.opts.delay)
        });
}

export interface IScreenshotterOpts {
    pattern: `${string}.html`;
    delay: number;
    selector: string;
    quality: any;
}
