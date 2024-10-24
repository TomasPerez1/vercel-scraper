import { Page } from "puppeteer-core";

export async function getPropertyZp(page: Page) {
  try {
    const property = await page.evaluate(() => {
      const featuresElement = document.querySelector(
        ".section-icon-features-property"
      );
      /* ".CardContainer-sc-1tt2vbg-5" */
      // const featuresElement = document.querySelector('.section-icon-features-property');

      // let features: any = {
      //   totalM2: 0,
      //   coverM2: 0,
      //   garages: 0,
      //   enviroments: 0,
      //   rooms: 0,
      //   bathrooms: 0,
      // };
      // if (
      //   featuresElement /* && Array.from(featuresElement.children).length */
      // ) {
      //   const featuresChildren = Array.from(featuresElement.children);
      //   features = {
      //     featuresChildren: Array.from(featuresElement.children).length,
      //   };
      //   console.log(featuresChildren);

      //   featuresChildren?.map((elemnt: any) => {
      //     const feature = elemnt["outerText"];
      //     if (feature.indexOf("tot") !== -1) {
      //       features.totalM2 = parseInt(feature.slice(0, feature.indexOf("m")));
      //     } else if (feature.indexOf("cub") !== -1) {
      //       features.coverM2 = parseInt(feature.slice(0, feature.indexOf("m")));
      //     } else if (feature.indexOf("amb") !== -1) {
      //       features.enviroments = parseInt(
      //         feature.slice(0, feature.indexOf("a"))
      //       );
      //     } else if (feature.indexOf("dorm") !== -1) {
      //       features.rooms = parseInt(feature.slice(0, feature.indexOf("d")));
      //     } else if (feature.indexOf("baño") !== -1) {
      //       features.bathrooms = parseInt(
      //         feature.slice(0, feature.indexOf("b"))
      //       );
      //     } else if (feature.indexOf("coch") !== -1) {
      //       features.garages = parseInt(feature.slice(0, feature.indexOf("c")));
      //     }
      //   });
      // } else {
      //   console.error(
      //     "No se encontró el elemento con la clase .section-icon-features-property"
      //   );
      //   features = {
      //     totalM2: 6,
      //     coverM2: 6,
      //     garages: 6,
      //     enviroments: 6,
      //     rooms: 0,
      //     bathrooms: 0,
      //   };
      // }
      //?----------- TITLE -----------
      // const titleElement = document.querySelector(".section-location-property");
      // const titleElement2 = document.querySelector(".title-property");

      // const title = titleElement ? true : false;

      // Use optional chaining and type assertions to safely access 'outerText'
      // const title =
      //   (titleElement as HTMLElement)?.outerText ||
      //   (titleElement2 as HTMLElement)?.outerText ||
      //   "";
      const titleElment = document.querySelector("body");
      const title = titleElment ? titleElment["outerHTML"].toString() : "";
      return {
        title,
      };
      // //?----------- FEATURES -----------
      // //?----------- TITLE -----------
      // const titleElement = document.querySelector(".section-location-property");
      // const titleElement2 = document.querySelector(".title-property");
      // const title = titleElement
      //   ? (titleElement as HTMLElement).outerText
      //   : (titleElement2 as HTMLElement).outerText;

      // // const title = titleElement
      // //   ? titleElement['outerText']
      // //   : titleElement2['outerText'];

      // //?----------- IMGS -----------
      // const findImgs = (): string[] | [] => {
      //   //? El container puede tener 2 o 3 elementos div
      //   const mainContainerElement =
      //     document.getElementById("new-gallery-portal");
      //   if (!mainContainerElement) return [];

      //   const mainContainer = Array.from(
      //     mainContainerElement["children"][0]["children"]
      //   );
      //   const imgContainer = Array.from(
      //     mainContainer[mainContainer.length - 1]["children"]
      //   );
      //   if (mainContainer.length) {
      //     //? si tiene 2 children las imagenes estaran en un <div>
      //     //? si tiene 3 children las imagenes estaran dentro de una <a>
      //     const imgs = imgContainer.map(
      //       (div: any) => div["children"][0]["src"]
      //     );
      //     return imgs;
      //   } else {
      //     return [];
      //   }
      // };
      // const imgs = findImgs().filter(
      //   (img) => typeof img === "string" && img.length > 1
      // );

      // //?----------- PRICE -----------
      // const priceElement = document.querySelector(".price-value");
      // const priceStr =
      //   priceElement && priceElement.children
      //     ? priceElement.children[0].textContent || ""
      //     : "";

      // const parsePrice = (
      //   priceStr: string
      // ): { currency: string; price: number } | undefined => {
      //   if (!priceStr || !priceStr.length) {
      //     console.log("price not found");
      //     return {
      //       currency: "usd",
      //       price: 0,
      //     };
      //   }
      //   const isUSD = priceStr.indexOf("USD");
      //   if (isUSD !== -1) {
      //     return {
      //       currency: "usd",
      //       price: parseInt(priceStr.slice(isUSD + 3).replace(".", "")),
      //     };
      //   } else if (priceStr.indexOf("$") !== -1) {
      //     return {
      //       currency: "ars",
      //       price: parseInt(
      //         priceStr.slice(priceStr.indexOf("$") + 1).replace(".", "")
      //       ),
      //     };
      //   }
      // };
      // const priceProps = parsePrice(priceStr);
      // //?----------- DESCRIPTION -----------
      // const descriptionElement = document.getElementById("longDescription");
      // const description = descriptionElement
      //   ? descriptionElement["children"][0]["textContent"]
      //   : ""; /* .replace(/<br\s*\/?>/gi, ' ') */ // ? Quitar saltos de linea

      // return {
      //   features,
      //   // title,
      //   // imgs,
      //   // description: description ? description : "",
      //   // platformId: 2,
      //   // ...priceProps,
      //   // ...features,
      // };
    });
    await page.close();
    return { ...property, propertyLink: page.url() };
  } catch (err) {
    console.log(err);
    return {
      err,
    };
  }
}
