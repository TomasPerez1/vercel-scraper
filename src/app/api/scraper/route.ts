import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { getPropertyMl } from "./utils";

export async function POST(request: Request) {
  try {
    const { siteUrl } = await request.json();

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
    await page.goto(siteUrl);

    const pageTitle = await page.title();

    const property = await getPropertyMl(page);

    await browser.close();

    return Response.json({
      siteUrl,
      property,
      pageTitle,
    });
  } catch (err) {
    console.log("Post err", err);

    return Response.json({
      err,
    });
  }
}
