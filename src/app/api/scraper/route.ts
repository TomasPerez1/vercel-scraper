import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { getPropertyMl } from "./utils";

export async function POST(request: Request) {
  try {
    const { siteUrl } = await request.json();

    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

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
    console.log("browser", browser);
    const page = await browser.newPage();
    await page.goto(siteUrl);
    const pageTitle = await page.title();

    // const property = await page.evaluate(() => {
    //   try {
    //     //?----------- TITLE -----------
    //     const title =
    //       document.getElementsByClassName("ui-pdp-title")[0]?.textContent;
    //     //?----------- PRICE -----------
    //     const priceElement = document.getElementsByClassName(
    //       "andes-money-amount__fraction"
    //     );
    //     const price = parseInt(
    //       priceElement[0]["textContent"].replaceAll(".", "")
    //     );
    //     const priceCurrency = document.getElementsByClassName(
    //       "andes-money-amount__currency-symbol"
    //     )[0]["textContent"];
    //     let currency = "";
    //     if (priceCurrency === "US$") {
    //       currency = "usd";
    //     } else if (priceCurrency === "$") {
    //       currency = "ars";
    //     }
    //     //?----------- DESCRIPTION -----------
    //     const description = document.querySelectorAll(
    //       ".ui-pdp-description__content"
    //     )[0]["textContent"];

    //     //?----------- IMGS -----------
    //     const imgs_elemnts = document.getElementsByClassName(
    //       "ui-pdp-image ui-pdp-gallery__figure__image"
    //     );
    //     return {
    //       title,
    //       price,
    //       currency,
    //       description,
    //     };
    //   } catch (err) {
    //     console.log("Evaluate err", err);
    //     return { message: "get property data err", err };
    //   }
    // });
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
