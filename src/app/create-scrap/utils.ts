const API: any = "a";
import { toast } from "sonner";

export const disableSaveScrap = ({ scrapData, propertiesMl, propertiesZp }) => {
  if (!propertiesMl && !propertiesZp) return true;
  const { clientName, clientPhone, operationTypeId } = scrapData;
  if (clientName || clientPhone || operationTypeId) {
    return false;
  } else return true;
};

export const generateScrap = async ({
  loading,
  scrapUrlMl,
  propertiesMl,
  setPropertiesMl,
  scrapUrlZp,
  propertiesZp,
  setPropertiesZp,
}) => {
  try {
    loading.setLoading(true);
    const _propertiesMl =
      scrapUrlMl?.length && !propertiesMl?.length
        ? await API.mercado_libre.generateScrap(scrapUrlMl)
        : false;
    console.log("PORPERTIES ML", propertiesMl);
    const _propertiesZp =
      scrapUrlZp?.length && !propertiesZp?.length
        ? await API.zonaprop.generateScrap(scrapUrlZp)
        : false;
    // console.log("PORPERTIES ZP", propertiesZp);
    if (_propertiesMl?.length) {
      setPropertiesMl((prev: any) => {
        if (prev?.length) {
          return [..._propertiesMl, ...prev];
        } else {
          return _propertiesMl;
        }
      });
    }

    if (_propertiesZp?.length) {
      setPropertiesZp((prev: any) => {
        if (prev?.length) {
          return [..._propertiesZp, ...prev];
        } else {
          return _propertiesZp;
        }
      });
    }
    toast.message("Se agregaron nuevas propiedades", {
      description: `Mercado Libre ${_propertiesMl?.length || 0} y Zona prop ${
        _propertiesZp?.length || 0
      }`,
      classNames: {
        title: "text-lg",
        description: "text-xl",
      },
    });
    loading.setLoading(false);
  } catch (err) {
    loading.setLoading(false);
    console.log(err);
    toast.error(`Error ${err}`);
  }
};

export const editProperty = ({
  platformId,
  newData,
  propertyLink,
  setPropertiesMl,
  setPropertiesZp,
}) => {
  if (platformId === 1) {
    setPropertiesMl((prev: any) => {
      const edited = [...prev].map((property) => {
        if (property.propertyLink === propertyLink) {
          return {
            ...property,
            ...newData,
          };
        } else return property;
      });
      return edited;
    });
  } else if (platformId === 2) {
    setPropertiesZp((prev: any) => {
      const edited = [...prev].map((property) => {
        if (property.propertyLink === propertyLink) {
          return {
            ...property,
            ...newData,
          };
        } else return property;
      });
      return edited;
    });
  }
};

export const deleteProperty = ({
  platformId,
  propertyLink,
  setPropertiesMl,
  setPropertiesZp,
}) => {
  if (platformId === 1) {
    setPropertiesMl((prev: any) => {
      const filter = [...prev].filter(
        (property) => property.propertyLink !== propertyLink
      );
      toast.info("Se elimino la propiedad de Mercado Libre");
      return filter;
    });
  } else if (platformId === 2) {
    setPropertiesZp((prev: any) => {
      const filter = [...prev].filter(
        (property) => property.propertyLink !== propertyLink
      );
      toast.info("Se elimino la propiedad de Zona Prop");
      return filter;
    });
  }
};

export const saveScrap = async ({
  loading,
  scrapData,
  scrapUrlMl,
  propertiesMl,
  setPropertiesMl,
  scrapUrlZp,
  propertiesZp,
  setPropertiesZp,
}) => {
  try {
    loading.setLoading(true);
    const parseRange = (range1: any, range2: any) => {
      if (!range1?.length || !range2?.length) return "";
      else {
        return `${range1}-${range2}`;
      }
    };
    const parsed = {
      clientName: scrapData.clientName,
      clientPhone: scrapData.clientPhone,
      searchUrlMl: scrapUrlMl,
      searchUrlZp: scrapUrlZp,
      operationTypeId: scrapData.operationTypeId,
      propertiesZone: scrapData.propertiesZone,
      scrapObservations: scrapData.scrapObservations,
      propertiesRooms: scrapData.rooms,
      propertiesBathrooms: scrapData.bathrooms,
      propertiesEnviroments: scrapData.enviroments,
      propertiesGarages: scrapData.garages,
      propertiesPriceRange: parseRange(
        scrapData["price_min"],
        scrapData["price_max"]
      ),
      propertiesTotalM2Range: parseRange(
        scrapData["totalM2_min"],
        scrapData["totalM2_max"]
      ),
      propertiesCoverM2Range: parseRange(
        scrapData["coverM2_min"],
        scrapData["coverM2_max"]
      ),
    };
    const scrapRes = await API.scrap.saveScrap({
      properties: [...propertiesMl, ...propertiesZp],
      scrapData: parsed,
    });
    console.log(scrapRes);
    toast.info("Descargando PDF");
    // await generatePdf({
    //   scrapId: scrapRes?.id,
    //   clientName: scrapData.clientName,
    // });
    loading.setLoading(false);
    setPropertiesMl([]);
    setPropertiesZp([]);
    toast.success("Consulta guardada con exito");
  } catch (err) {
    console.log(err);
    toast.error(`Error ${err}`);
  }
};

export const handleScrapData = ({
  target: { name, value, title },
  setScrapData,
}: any) => {
  setScrapData((prev: any) => {
    if (
      title === "quantity" ||
      name === "operationTypeId" ||
      name === "clientPhone"
    ) {
      value = parseInt(value);
    }

    if (title === "quantity" && value?.length > 2) {
      return prev;
    }
    const newData = { ...prev, [name]: value };
    return newData;
  });
};
