import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { getPropertyZp } from "./utils";

export async function POST(request: Request) {
  try {
    const { siteUrl } = await request.json();
    console.log("ZP", siteUrl);
    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;
    console.log(isLocal);
    const browser = await puppeteer.launch({
      args: isLocal
        ? puppeteer.defaultArgs()
        : [
            ...chromium.args,
            "--hide-scrollbars",
            "--incognito",
            "--no-sandbox",
          ],
      defaultViewport: chromium.defaultViewport,
      executablePath: isLocal
        ? process.env.CHROME_EXECUTABLE_PATH
        : await chromium.executablePath(
            "https://public-chromium.s3.us-east-1.amazonaws.com/chromium-v126.0.0-pack.tar"
          ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(siteUrl, { waitUntil: "load" });
    // const content = await page.content();
    // console.log(content);
    // await page.reload(); // ? Reload fix the problem to load the necesary elements to scrap

    // await page.waitForDevicePrompt( )

    const pageTitle = await page.title();

    const property = await getPropertyZp(page);
    const pageUrl = page.url();
    await browser.close();

    return Response.json({
      property,
      pageTitle,
      pageUrl,
    });
  } catch (err) {
    console.log("Post err", err);

    return Response.json({
      err,
    });
  }
}
