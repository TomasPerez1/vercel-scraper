import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";
import { opertaionOptions, quantityFields, rangeFields } from "./consts";
import { handleScrapData } from "./utils";
import QuantityField from "../ui/quantityField";
import RangeField from "../ui/rangeField";

export default function ScrapData({ setScrapData, scrapData }: any) {
  useEffect(() => {
    console.log(scrapData);
  }, [scrapData]);
 
  return (
    <form
      className="border-2 mx-auto rounded-2xl w-[90%]" /* onSubmit={handleSubmit} */
    >
      <section className=" flex gap-4 justify-between">
        <div>
          {/* <p>Nombre del cliente</p> */}
          <Input
            isRequired
            value={scrapData.clientName}
            onChange={(evt: any) => handleScrapData({target: evt.target, setScrapData})}
            className=""
            variant="flat"
            name="clientName"
            label="Nombre del cliente"
            type="text"
          />
        </div>
        <div>
          {/* <p>Numero de contacto</p> */}
          <Input
            isRequired
            value={scrapData.clientPhone}
            onChange={(evt: any) => handleScrapData({target: evt.target, setScrapData})}
            className=" "
            variant="flat"
            name="clientPhone"
            label="Numero de telefono"
            type="number"
          />
        </div>
        <div>
          {/* <p>Email del cliente</p> */}
          <Input
            // isRequired
            value={scrapData.clientEmail}
            onChange={(evt: any) => handleScrapData({target: evt.target, setScrapData})}
            className=""
            variant="flat"
            name="clientEmail"
            label="Email del cliente"
            type="email"
          />
        </div>
        <div>
          {/* <p>Tipo de opereción</p> */}
          <Select
            isRequired
            onChange={(evt: any) => handleScrapData({target: evt.target, setScrapData})}
            label="Tipo de operacion"
            name="operationTypeId"
            variant="flat"
            selectedKeys={""}
            className="text-black min-w-[200px] text-xl"
          >
            {opertaionOptions.map((option) => (
              <SelectItem
                className="text-black"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          {/* <p>Zona/Barrio</p> */}
          <Input
            value={scrapData.propertiesZone}
            onChange={(evt: any) => handleScrapData({target: evt.target, setScrapData})}
            name="propertiesZone"
            className=""
            variant="flat"
            label="Zona/Barrio"
            type="text"
          />
        </div>
      </section>
      <hr className="my-4 w-[80%] mx-auto" />
      <section className=" flex gap-10 w-fit mx-auto my-5">
        {quantityFields.map((field, i) => {
          const { fieldName, propName } = field;
          return (
            <QuantityField
              value={scrapData[propName]}
              hanldeChange={(evt: any) => handleScrapData({target: evt.target, setScrapData})}
              key={i}
              fieldName={fieldName}
              propName={propName}
            />
          );
        })}

        {rangeFields.map((field, i) => {
          const { fieldName, propName } = field;
          return (
            <RangeField
              // value={scrapData[propName]}
              value_min={scrapData[`${propName}_min`]}
              value_max={scrapData[`${propName}_max`]}
              handleChange={(evt: any) => handleScrapData({target: evt.target, setScrapData})}
              key={i}
              fieldName={fieldName}
              propName={propName}
            />
          );
        })}
      </section>
      <hr className="my-4 w-[80%] mx-auto" />
      <section className="w-[75%]  mx-auto mb-8 ">
        <Textarea
          disableAutosize
          onChange={(evt: any) => handleScrapData({target: evt.target, setScrapData})}
          name="scrapObservations"
          label="Descripción"
          variant="flat"
          classNames={{
            base: "max-w-[900px] mx-auto",
            input: " min-h-[200px] text-lg",
            label: "text-xl border-b-2 border-gray-500",
          }}
        />
      </section>
{/* 
      <div className="w-fit mx-auto my-4">
        <Button
          className="text-4xl py-7 rounded-xl"
          type="submit"
          color="primary"
        >
          Guardar
        </Button>
      </div> */}
    </form>
  );
}
