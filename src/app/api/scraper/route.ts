import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    });

    const page = await browser.newPage();
    await page.goto(siteUrl);
    const pageTitle = await page.title();

    //
    // const HTML = await page.content();
    //
    const property = await page.evaluate(() => {
      try {
        // const variable_values = document.getElementsByClassName(
        //   "ui-pdp-color--BLACK ui-pdp-size--SMALL ui-pdp-family--REGULAR ui-pdp-label"
        //   // ? estos elementos pueden aparecer o no en el renderizado
        // );
        // if (!variable_values) {
        //   console.log("CANT ACCESS VARIABLE VALUES");
        // }
        // //?----------- FEATURES -----------
        // const [_m2, _rooms, _bathrooms] = variable_values
        //   ? variable_values
        //   : ["err", "err", "err"]; // ? Como manejo el err al obtener los variable values
        // let m2 = _m2 ? parseInt(_m2["textContent"]?.slice(0, 2)) : null;
        // let rooms = _rooms ? parseInt(_rooms["textContent"]?.slice(0, 2)) : null;
        // let bathrooms = _bathrooms
        //   ? parseInt(_bathrooms["textContent"]?.slice(0, 2))
        //   : null;
        //?----------- TITLE -----------
        const title =
          document.getElementsByClassName("ui-pdp-title")[0]?.textContent;
        const imgs_elemnts = document.getElementsByClassName(
          "ui-pdp-image ui-pdp-gallery__figure__image"
        );
        //?----------- PRICE -----------
        const priceElement = document.getElementsByClassName(
          "andes-money-amount__fraction"
        );
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

        // const price = parseInt(
        //   priceElement[0]["textContent"].replaceAll(".", "")
        // );

        //?----------- DESCRIPTION -----------
        const description = document.querySelectorAll(
          ".ui-pdp-description__content"
        )[0]["textContent"];
        // //?----------- IMGS -----------
        // const parseImgs = (imgElemnt: any) => {
        //   if (imgElemnt["src"] && imgElemnt["src"][0] === "h") {
        //     // ? Si comienza por "https" se trajo bien la imgagen
        //     return imgElemnt["src"];
        //   } else {
        //     const lazySrc = imgElemnt.getAttribute("data-zoom");
        //     return lazySrc ? lazySrc : "";
        //   }
        // };
        // const imgs = Array.from(imgs_elemnts)
        //   .slice(0, 5)
        //   .map((img) => parseImgs(img))
        //   .filter((img) => typeof img === "string" && img.length > 1);
        // const detailedValues = Array.from(
        //   document.getElementsByClassName("ui-vpp-striped-specs")
        // )[0];

        // if (detailedValues) {
        // const tableBody = Array.from(
        //   detailedValues.querySelectorAll(".andes-table__body")
        // )[0];
        // const [_totalM2, _coverM2, _enviroments, _rooms, _bathrooms, _garage] =
        //   tableBody["children"];
        // const totalM2 = parseInt(
        //   _totalM2
        //     ?.querySelector(".andes-table__column")
        //     ["textContent"]?.replace("m²", "")
        //     .trim()
        // );
        // const coverM2 = parseInt(
        //   _coverM2
        //     ?.querySelector(".andes-table__column")
        //     ["textContent"]?.replace("m²", "")
        //     .trim()
        // );
        // const enviroments = parseInt(
        //   _enviroments?.querySelector(".andes-table__column")["textContent"]
        // );
        // const garages = parseInt(
        //   _garage?.querySelector(".andes-table__column")["textContent"]
        // );
        return {
          title,
          // price,
          currency,
          description,
          // imgs,
          // m2,
          // totalM2,
          // coverM2,
          // rooms,
          // garages,
          // bathrooms,
          // enviroments,
          //   };
          // } else {
          // const detailedSpecs = Array.from(
          //   document.getElementsByClassName("ui-pdp-specs__table")
          // )[0];
          // const tableBody = detailedSpecs?.querySelector(".andes-table__body");
          // const [_totalM2, _coverM2] = tableBody["children"];
          // let enviroments = null;
          // let garages = null;
          // Array.from(tableBody["children"]).map((children) => {
          //   if (children["textContent"].includes("Ambientes")) {
          //     enviroments = parseInt(
          //       children["textContent"].replace("Ambientes", "").trim()
          //     );
          //   } else if (children["textContent"].includes("Cocheras")) {
          //     garages = parseInt(
          //       typeof children["textContent"] === "string" &&
          //         children["textContent"].replace("Cocheras", "").trim()
          //     );
          //   }
          // });
          // const totalM2 = parseInt(
          //   _totalM2
          //     ?.querySelector(".andes-table__column")
          //     ["textContent"]?.replace("m²", "")
          //     .trim()
          // );
          // const coverM2 = parseInt(
          //   _coverM2
          //     ?.querySelector(".andes-table__column")
          //     ["textContent"]?.replace("m²", "")
          //     .trim()
          // );
          // return {
          //   title,
          //   imgs,
          //   price,
          //   currency,
          //   description,
          //   m2,
          //   // totalM2,
          //   // coverM2,
          //   rooms,
          //   bathrooms,
          //   // enviroments,
          //   // garages,
          // };
        };
      } catch (err) {
        console.log("Evaluate err", err);
        return { message: "get property data err", err };
      }
    });

    const screenshot = await page.screenshot();
    await browser.close();

    const resource = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, function (error: unknown, result: unknown) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        })
        .end(screenshot);
    });

    return Response.json({
      siteUrl,
      property,
      pageTitle,
      resource,
    });
  } catch (err) {
    console.log("Routes err", err);
  }
}
