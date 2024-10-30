"use client";

import axios from "axios";
import { useState } from "react";
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
// import { useApp } from "src/context/Context";
import { RiDeleteBin6Line, RiSaveLine } from "@remixicon/react";
import {disableSaveScrap, generateScrap, saveScrap, editProperty, deleteProperty} from "./utils"
// import ScrapPropertyCard from "./ScrapPropertyCard";
// import { generatePdf } from "./utils";
import ScrapData from "./scrapData";

function ScrapPropertyCard ({editScrapProperty,
  propertyData,
  deleteScrapProperty}) {
  return <div><h1>Property ca7rd</h1></div>
}

export default function CreateScrap() {
  const [scrapUrlMl, setScrapUrlMl] = useState("");
  const [scrapUrlZp, setScrapUrlZp] = useState("");
  const [propertiesMl, setPropertiesMl] = useState<[]>([]);
  const [propertiesZp, setPropertiesZp] = useState<[]>([]);
  const [resetMlModal, setResetMlModal] = useState(false);
  const [resetZpModal, setResetZpModal] = useState(false);
  const [saveScrapModal, setSaveScrapModal] = useState(false);
  // const { loading } = useApp();

  const initialValues = {
    clientName: "",
    clientPhone: null,
    clientEmail: "",
    operationTypeId: null,
    propertiesZone: "",
    enviroments: null,
    rooms: null,
    bathrooms: null,
    garages: null,
    scrapObservations: "",
    // Ranges
    price_min: 0,
    price_max: 0,
    totalM2_min: 0,
    totalM2_max: 0,
    coverM2_min: 0,
    coverM2_max: 0,
  };


  const [scrapData, setScrapData] = useState(initialValues);

  async function handleOnClickAll() {

    const _urls2 = [
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-impecable-departamento-en-alquiler-permanente-54509063.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-centrico-en-alquiler-permanente-54657596.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-temporal-2-dorm.-54051639.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-centrico-bariloche.-alquiler-por-2-a-6-54701171.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-monoambiente-en-alquiler-en-kilom-54767936.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-san-carlos-de-bariloche-52718960.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamento-villa-huapi-bariloche-54795020.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamentos-y-cocheras-54765428.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-barrio-belgrano-alquiler-permanente.-51024990.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-en-pajaro-azul-bariloche-54138723.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-depto-c-costa-de-lago-bustillouno-1-dorm-54583309.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-barrio-belgrano-vista-un-dormitorio-54764075.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-145-54679465.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-permanenete-54678858.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-san-carlos-de-bariloche-51856744.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-dto-1-dorm-en-barrio-cerrado-con-costa-al-lago-nahuel-52845203.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamento-villa-huapi-bariloche-54588181.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-en-las-marias-bariloche-53854352.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-permanente-bariloche-54707171.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-monohambiente-centrico-54089625.html',        
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-dpto.-en-el-centro-con-expensan-y-servicios-incluidos-53904315.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-departamento-bariloche-solo-turismo-contactarse-53286493.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-divino-monoambiente-54594101.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-impecable-departamento-en-alquiler-permanente-54509063.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-centrico-en-alquiler-permanente-54657596.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-temporal-2-dorm.-54051639.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-centrico-bariloche.-alquiler-por-2-a-6-54701171.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-monoambiente-en-alquiler-en-kilom-54767936.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-san-carlos-de-bariloche-52718960.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamento-villa-huapi-bariloche-54795020.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamentos-y-cocheras-54765428.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-barrio-belgrano-alquiler-permanente.-51024990.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-en-pajaro-azul-bariloche-54138723.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-depto-c-costa-de-lago-bustillouno-1-dorm-54583309.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-barrio-belgrano-vista-un-dormitorio-54764075.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-145-54679465.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-permanenete-54678858.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-san-carlos-de-bariloche-51856744.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-dto-1-dorm-en-barrio-cerrado-con-costa-al-lago-nahuel-52845203.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-alquiler-departamento-villa-huapi-bariloche-54588181.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-en-las-marias-bariloche-53854352.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclapin-departamento-en-alquiler-permanente-bariloche-54707171.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-monohambiente-centrico-54089625.html',        
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-dpto.-en-el-centro-con-expensan-y-servicios-incluidos-53904315.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-departamento-bariloche-solo-turismo-contactarse-53286493.html',
      'https://www.zonaprop.com.ar/propiedades/clasificado/alclappa-divino-monoambiente-54594101.html'
    ]
      const promises = _urls2.map(url => {
        return axios.post('/api/scraper/zona-prop', {
        siteUrl: url
      })
    });
    console.log("promises", promises)
    const responses = await Promise.all(promises)
    console.log("responses", responses)
    const okRes = responses.filter(r => r.data.isAvaliable === true).length
    const failedRes = responses.filter(r => r.data.isAvaliable === false).length

    console.log("OK RES", okRes)
    console.log("FAILED RES", failedRes, responses.filter(r => r.data.isAvaliable === false))

  }


  return (
    <div className="flex  flex-col gap-4">
      <div className="flex w-fit mx-auto items-center gap-4">
        <span className="flex justify-center items-center w-14 h-14 border-2 border-blue-800 bg-blue-600 rounded-full">
          <p className="font-extrabold text-3xl">1</p>{" "}
        </span>
        <p className=" text-3xl">
          Ingrese los datos para guardar con la consulta
        </p>
      </div>

      <ScrapData
        scrapData={scrapData}
        setScrapData={setScrapData}
        // handleSubmit={handleSubmit}
      />

      {/* GENERATE SCRAP */}
      <section
        className={
          // !scrapData.clientName?.length ||
          // !scrapData.operationTypeId ||
          // !scrapData.clientPhone
          false
            ? // false
              "opacity-30 pointer-events-none disabled:true" /* Deshabilitar el scrap si no estanlos campos */
            : ""
        }
      >
        <div className=" mx-auto  w-full ">
          <div className="flex w-fit mx-auto items-center gap-4">
            <span className="flex justify-center items-center w-14 h-14 border-2 border-blue-800 bg-blue-600 rounded-full">
              <p className="font-extrabold text-3xl">2</p>{" "}
            </span>
            <p className=" text-3xl">
              Ingrese el URL segun la plataforma elegida
            </p>
            <br />
          </div>

          <h1 className="text-xl sm:text-3xl w-[50%] mx-auto text-center  my-2">
            (<strong className="text-yellow-400"> Mercado libre</strong> /
            <strong className="text-orange-600"> Zona prop</strong>)
          </h1>
        </div>
        {/* INPUTS */}
        <section className="my-10 flex flex-col gap-10">
          {/* MERCADO LIBRE // TODO refactoirzar a componente Platform */}
          <article className="w-1/2 mx-auto border-yellow-400 border-2 items-center flex ">
            <img
              title="mercado libre"
              className="h-full max-w-[80px] object-cover "
              src="../../../images/mercado-libre-logo.png"
            />
            <div className="flex flex-row items-center w-[95%]">
              <Input
                isClearable
                isDisabled={propertiesMl?.length ? true : false}
                value={scrapUrlMl}
                onClear={() => setScrapUrlMl("")}
                onChange={({ target }: any) => setScrapUrlMl(target.value)}
                className="h-full mx-2 text-black text-xl"
                classNames={{
                  clearButton: `text-gray-700 text-2xl ${
                    propertiesMl?.length && "invisible text-transparent"
                  }`,
                }}
                type="text"
              />
            </div>

            <Popover
              showArrow
              isOpen={resetMlModal}
              onOpenChange={(open: any) => setResetMlModal(open)}
              placement="bottom-start"
              backdrop="opaque"
              color="foreground"
            >
              <PopoverTrigger>
                <button
                  className={`roeunded p-2  mx-auto ${
                    !propertiesMl.length
                      ? "text-gray-600 opacity-40 pointer-events-none"
                      : "text-red-500 cursor-pointer"
                  }`}
                >
                  <RiDeleteBin6Line size={40} />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="w-full text-center py-1  max-w-[400px] rounded-lg mx-0 flex flex-col">
                  <h1 className="text-xl text-white">
                    ¿Desea reiniciar toda la consulta de{" "}
                    <strong className="text-yellow-400">mercado libre</strong>?
                  </h1>
                  <Button
                    onClick={() => {
                      setPropertiesMl([]);
                      setScrapUrlMl("");
                      setResetMlModal(false);
                    }}
                    color="danger"
                    className="font-bold w-fit mx-auto my-2 "
                  >
                    REINICIAR
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </article>
          {/* ZONAPROP // TODO refactoirzar a componente Platform */}
          <article className="w-1/2 mx-auto border-orange-600 border-2 items-center flex ">
            <img
              title="mercado libre"
              className="h-full max-w-[80px] object-cover "
              src="../../../images/zonaprop-logo.png"
            />
            <div className="flex flex-row items-center w-[95%]">
              <Input
                isClearable
                isDisabled={propertiesZp?.length ? true : false}
                value={scrapUrlZp}
                onClear={() => setScrapUrlZp("")}
                onChange={({ target }: any) => setScrapUrlZp(target.value)}
                className="h-full mx-2 text-black text-xl"
                classNames={{
                  clearButton: `text-gray-700 text-2xl ${
                    propertiesZp?.length && "invisible text-transparent"
                  }`,
                }}
                type="text"
              />
            </div>

            <Popover
              showArrow
              isOpen={resetZpModal}
              onOpenChange={(open: any) => setResetZpModal(open)}
              placement="bottom-start"
              backdrop="opaque"
              color="foreground"
            >
              <PopoverTrigger>
                <button
                  className={`roeunded p-2  mx-auto ${
                    !propertiesZp.length
                      ? "text-gray-600 opacity-40 pointer-events-none"
                      : "text-red-500 cursor-pointer"
                  }`}
                >
                  <RiDeleteBin6Line size={40} />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="w-full text-center py-1  max-w-[400px] rounded-lg mx-0 flex flex-col">
                  <h1 className="text-xl text-white">
                    ¿Desea reiniciar toda la consulta de{" "}
                    <strong className="text-orange-600">zona prop</strong>?
                  </h1>
                  <Button
                    onClick={() => {
                      setPropertiesZp([]);
                      setScrapUrlZp("");
                      setResetZpModal(false);
                    }}
                    color="danger"
                    className="font-bold w-fit mx-auto my-2 "
                  >
                    REINICIAR
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </article>
        </section>

        {/* HANDLE SCRAP */}
        <section className="w-[70%] mx-auto flex flex-col gap-4 md:flex-row items-center my-6">
          <Button
            // isDisabled={
            //   (propertiesMl?.length && propertiesZp?.length) ||
            //   (!scrapUrlMl?.length && !scrapUrlZp?.length)
            //     ? true
            //     : false
            // }
            // onClick={generateScrap}
            onClick={handleOnClickAll}
            className="w-fit mx-auto text-2xl pa"
            color="secondary"
            size="lg"
            variant="shadow"
          >
            Consultar Propiedades
          </Button>

          {/* //? Save scrap  */}
          <Popover
            showArrow
            isOpen={saveScrapModal}
            onOpenChange={(open: any) => setSaveScrapModal(open)}
            placement="bottom-start"
            backdrop="opaque"
            color="foreground"
          >
            <PopoverTrigger>
              <Button
                isDisabled={disableSaveScrap(
                  {scrapData,
                  propertiesMl: propertiesMl?.length,
                  propertiesZp: propertiesZp?.length}
                )}
                className="w-fit mx-auto text-2xl text-white disabled:opacity-20 disabled:bg-black"
                color="success"
                size="lg"
                variant="shadow"
                onClick={() => {}}
                startContent={<RiSaveLine size={40} />}
              >
                Guardar consulta
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-full text-center py-1  max-w-[400px] rounded-lg mx-0 flex flex-col">
                <h1 className="text-2xl text-white">
                  ¿Desea guardar la consulta con las propiedades elegidas?
                </h1>
                <Button
                  onClick={() => {
                    // saveScrap();
                    setSaveScrapModal(false);
                  }}
                  color="success"
                  size="lg "
                  className="font-bold w-fit mx-auto my-2 text-white text-xl"
                >
                  GUARDAR
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </section>

        {/* Properties */}
        <section className="min-h-[300px]">
          {propertiesMl?.length > 0 && (
            <div className=" grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
              {propertiesMl?.map((property, i) => {
                return (
                  <ScrapPropertyCard
                    editScrapProperty={editProperty}
                    key={i}
                    propertyData={property}
                    deleteScrapProperty={deleteProperty}
                  />
                );
              })}
            </div>
          )}
          {propertiesZp?.length > 0 && (
            <div className=" grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
              {propertiesZp?.map((property, i) => {
                return (
                  <ScrapPropertyCard
                    key={i}
                    editScrapProperty={editProperty}
                    propertyData={property}
                    deleteScrapProperty={deleteProperty}
                  />
                );
              })}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}