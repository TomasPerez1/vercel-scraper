export async function getPropertyMl(page: any) {
  const property = await page.evaluate(() => {
    try {
      //?----------- TITLE -----------
      const title =
        document.getElementsByClassName("ui-pdp-title")[0]?.textContent;
      const imgs_elemnts = document.getElementsByClassName(
        "ui-pdp-image ui-pdp-gallery__figure__image"
      );
      //?----------- DESCRIPTION -----------
      const description = document.querySelectorAll(
        ".ui-pdp-description__content"
      )[0]["textContent"];

      //?----------- PRICE -----------
      const priceElement = Array.from(
        document.getElementsByClassName("andes-money-amount__fraction")
      );
      const priceText: string = priceElement.length
        ? `${priceElement[0]?.textContent}`
        : "0";
      const price = parseInt(priceText.replaceAll(".", ""));

      const priceCurrencyElement = Array.from(
        document.getElementsByClassName("andes-money-amount__currency-symbol")
      );
      const priceCurrencyText: string = priceCurrencyElement.length
        ? `${priceCurrencyElement[0]["textContent"]}`
        : "dolar coldplay";

      const getCurrency = (priceCurrencyText: string) => {
        if (!priceCurrencyText.length) {
          // ? Si nose catcheo retorna ars default
          return "zaramayyy";
        } else if (priceCurrencyText === "US$") {
          return "usd";
        } else if (priceCurrencyText === "$") {
          return "ars";
        }
      };

      // //?----------- VARIABLE VALUES -----------
      // const variable_values = Array.from(
      //   document.getElementsByClassName(
      //     "ui-pdp-color--BLACK ui-pdp-size--SMALL ui-pdp-family--REGULAR ui-pdp-label"
      //     // ? estos elementos pueden aparecer o no en el renderizado
      //   )
      // );
      // if (!variable_values) {
      //   console.log("CANT ACCESS VARIABLE VALUES");
      // }
      // // //?----------- FEATURES -----------
      // const [_m2, _rooms, _bathrooms]: any[] = variable_values
      //   ? variable_values
      //   : ["err", "err", "err"]; // ? Como manejo el err al obtener los variable values
      // let m2 = _m2 ? parseInt(_m2["textContent"]?.slice(0, 2)) : null;
      // let rooms = _rooms ? parseInt(_rooms["textContent"]?.slice(0, 2)) : null;
      // let bathrooms = _bathrooms
      //   ? parseInt(_bathrooms["textContent"]?.slice(0, 2))
      //   : null;
      // const detailedValues = Array.from(
      //   document.getElementsByClassName("ui-vpp-striped-specs")
      // )[0];

      const detailedValues = Array.from(
        document.getElementsByClassName("ui-vpp-striped-specs")
      )[0];
      const tableBody = Array.from(
        detailedValues.querySelectorAll(".andes-table__body")
      )[0];
      const [_totalM2, _coverM2, _enviroments, _rooms, _bathrooms, _garage] =
        Array.from(tableBody["children"]);

      const totalM2 = parseInt(
        `${_totalM2
          ?.querySelector(".andes-table__column")
          ["textContent"]?.replace("m²", "")
          .trim()}`
      );
      const coverM2 = parseInt(
        `${_coverM2
          ?.querySelector(".andes-table__column")
          ["textContent"]?.replace("m²", "")
          .trim()}`
      );
      const enviroments = parseInt(
        _enviroments?.querySelector(".andes-table__column")["textContent"]
      );
      const garages = parseInt(
        _garage?.querySelector(".andes-table__column")["textContent"]
      );

      return {
        title,
        description,
        totalM2,
        m2,
        rooms,
        bathrooms,
        price,
        currency: getCurrency(priceCurrencyText),
      };

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

      //   return {
      //     title,
      //     imgs,
      //     price,
      //     currency,
      //     description,
      //     m2,
      //     totalM2,
      //     coverM2,
      //     rooms,
      //     garages,
      //     bathrooms,
      //     enviroments,
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
      //       children["textContent"].replace("Cocheras", "").trim()
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
      //   totalM2,
      //   coverM2,
      //   rooms,
      //   bathrooms,
      //   enviroments,
      //   garages,
      // };
      // }
    } catch (err) {
      console.log("Evaluate err", err);
      return { message: "get property data err", err };
    }
  });
  return property;
}
