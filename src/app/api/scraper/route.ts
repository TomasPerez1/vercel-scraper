import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { v2 as cloudinary } from "cloudinary";

export const maxDuration = 20;

export async function POST(request: Request) {
  try {
    const { siteUrl } = await request.json();

    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

    const browser = await puppeteer.launch({
      args: isLocal ? puppeteer.defaultArgs() : chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH ||
        (await chromium.executablePath(
          "https://chromium-scraper.s3.us-east-1.amazonaws.com/chromium-v126.0.0-pack.tar"
        )),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(siteUrl);
    const pageTitle = await page.title();

    const property = await page.evaluate(() => {
      try {
        //?----------- TITLE -----------
        const title =
          document.getElementsByClassName("ui-pdp-title")[0]?.textContent;
        const imgs_elemnts = document.getElementsByClassName(
          "ui-pdp-image ui-pdp-gallery__figure__image"
        );
        //?----------- PRICE -----------
        const priceCurrency = document.getElementsByClassName(
          "andes-money-amount__currency-symbol"
        )[0]["textContent"];
        let currency = "";
        console.log("CURRENCY", priceCurrency);
        if (priceCurrency === "US$") {
          currency = "usd";
        } else if (priceCurrency === "$") {
          currency = "ars";
        }

        //?----------- DESCRIPTION -----------
        const description = document.querySelectorAll(
          ".ui-pdp-description__content"
        )[0]["textContent"];

        return {
          title,
          currency,
          description,
        };
      } catch (err) {
        console.log("Evaluate err", err);
        return { message: "get property data err", err };
      }
    });

    const screenshot = await page.screenshot();
    await browser.close();

    return Response.json({
      siteUrl,
      property,
      pageTitle,
    });
  } catch (err) {
    console.log("Routes err", err);
  }
}
// resource,
// const resource = await new Promise((resolve, reject) => {
//   cloudinary.uploader
//     .upload_stream({}, function (error: unknown, result: unknown) {
//       if (error) {
//         reject(error);
//         return;
//       }
//       resolve(result);
//     })
//     .end(screenshot);
// });
