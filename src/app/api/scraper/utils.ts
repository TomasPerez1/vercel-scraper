export async function getPropertyMl(page: any) {
  const property = await page.evaluate(() => {
    try {
      //?----------- TITLE -----------
      const title =
        document.getElementsByClassName("ui-pdp-title")[0]?.textContent;
      // const imgs_elemnts = document.getElementsByClassName(
      //   "ui-pdp-image ui-pdp-gallery__figure__image"
      // );
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

      //?----------- FEATURES -----------
      const variable_values = document.getElementsByClassName(
        "ui-pdp-color--BLACK ui-pdp-size--SMALL ui-pdp-family--REGULAR ui-pdp-label"
        // ? estos elementos pueden aparecer o no en el renderizado
      );
      let rooms = 69;
      let bathrooms = 69;
      if (variable_values && Array.from(variable_values)?.length) {
        const [_m2, _rooms, _bathrooms] = Array.from(variable_values);
        if (_rooms) {
          const roomsText = `${_rooms["textContent"]}`;
          rooms = parseInt(roomsText.slice(0, 2));
        }
        if (_bathrooms) {
          const bathroomsText = `${_bathrooms["textContent"]}`;
          bathrooms = parseInt(bathroomsText.slice(0, 2));
        }
      }

      ///?----------- QUANTITY & DETAIL VALUES -----------
      const getDetailValues = () => {
        if (!document) return { err: "no document" };
        const detailedValuesElement = Array.from(
          document.getElementsByClassName("ui-vpp-striped-specs")
        );
        if (detailedValuesElement && detailedValuesElement[0]) {
          const detailedValues = detailedValuesElement[0];
          const tableBody = Array.from(
            detailedValues.querySelectorAll(".andes-table__body")
          )[0];
          const [
            _totalM2,
            _coverM2,
            _enviroments,
            _rooms,
            _bathrooms,
            _garage,
          ] = Array.from(tableBody["children"]);
          const totalM2 = _totalM2
            ? parseInt(
                _totalM2
                  .querySelector(".andes-table__column")
                  ?.textContent?.replace("m²", "")
                  .trim() || "0"
              )
            : null;

          const coverM2 = _coverM2
            ? parseInt(
                _coverM2
                  .querySelector(".andes-table__column")
                  ?.textContent?.replace("m²", "")
                  .trim() || "0"
              )
            : null;

          const enviroments = _enviroments
            ? parseInt(
                _enviroments.querySelector(".andes-table__column")
                  ?.textContent || "0"
              )
            : null;

          const garages = _garage
            ? parseInt(
                _garage.querySelector(".andes-table__column")?.textContent ||
                  "0"
              )
            : null;

          const rooms = _rooms
            ? parseInt(
                _rooms
                  .querySelector(".andes-table__column")
                  ?.textContent?.trim() || "0"
              )
            : null;

          const bathrooms = _bathrooms
            ? parseInt(
                _bathrooms
                  .querySelector(".andes-table__column")
                  ?.textContent?.trim() || "0"
              )
            : null;

          return {
            totalM2,
            coverM2,
            rooms,
            garages,
            bathrooms,
            enviroments,
          };
        } else {
          const detailedSpecsElement = Array.from(
            document.getElementsByClassName("ui-pdp-specs__table")
          );
          if (detailedSpecsElement && detailedSpecsElement[0]) {
            const detailedSpecs = detailedSpecsElement[0];
            const tableBody =
              detailedSpecs?.querySelector(".andes-table__body");
            if (!tableBody) {
              console.log("no hay tablebody");
              return { err: "no tableBody" };
            }

            const [_totalM2, _coverM2] = Array.from(tableBody["children"]);

            let enviroments = null;
            let garages = null;
            // let bathrooms = null;
            // let rooms = null;

            Array.from(tableBody["children"]).map((children) => {
              if (children && children["textContent"]?.includes("Ambientes")) {
                enviroments = parseInt(
                  children["textContent"].replace("Ambientes", "").trim()
                );
              } else if (
                children &&
                children["textContent"]?.includes("Cocheras")
              ) {
                garages = parseInt(
                  children["textContent"]?.replace("Cocheras", "")?.trim()
                );
              } /* else if (
                children &&
                children["textContent"]?.includes("Baños")
              ) {
                bathrooms = parseInt(
                  children["textContent"]?.replace("Baños", "")?.trim()
                );
              } else if (
                children &&
                children["textContent"]?.includes("Dormitorios")
              ) {
                rooms = parseInt(
                  children["textContent"]?.replace("Dormitorios", "")?.trim()
                );
              } */
            });

            const totalM2 = parseInt(
              _totalM2
                ?.querySelector(".andes-table__column")
                ?.textContent?.replace("m²", "")
                .trim() || "0"
            );

            const coverM2 = parseInt(
              _coverM2
                ?.querySelector(".andes-table__column")
                ?.textContent?.replace("m²", "")
                .trim() || "0"
            );

            return {
              totalM2,
              coverM2,
              enviroments,
              garages,
              // bathrooms,
              // rooms,
            };
          }
        }
      };
      const detailedValues = getDetailValues();
      return {
        title,
        price,
        currency: getCurrency(priceCurrencyText),
        description,
        rooms,
        bathrooms,
        ...detailedValues,
        // rooms,
        // bathrooms,
        // garages,
        // enviroments,
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
  console.log(property?.detailElement || "nulliano");
  return property;
}
