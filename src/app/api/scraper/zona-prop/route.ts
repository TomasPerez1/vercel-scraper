import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { getPropertyZp, getPropertyZp2 } from "./utils";

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
    // ? Set an user agent to avoid cloudflare tunnel
    await page.setUserAgent(
      "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    );
    await page.goto(siteUrl);
    const pageTitle1 = await page.title();

    const avaliable = async () => {
      try {
        await page.waitForSelector("#react-posting-app", { timeout: 3000 }); //? Espera 3 segundos a ver si no aparecio cloudflare
        return true;
      } catch (err) {
        return false;
      }
    };

    const isAvaliable = await avaliable();
    const pageTitle2 = await page.title();
    const property = await getPropertyZp2(page);
    const pageUrl = page.url();
    await browser.close();

    return Response.json({
      pageUrl,
      isAvaliable,
      pageTitle1,
      pageTitle2,
      property,
    });
  } catch (err) {
    console.log("Post err", err);

    return Response.json({
      err,
    });
  }
}
