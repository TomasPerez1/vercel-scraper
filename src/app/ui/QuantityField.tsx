import {Input} from "@nextui-org/react"

function QuantityField({
  fieldName,
  propName,
  value,
  hanldeChange,
  defaultValue,
  className,
}: any) {
  return (
    <div className="flex flex-col items-center gap-0.5 ">
      <p className="w-fit mx-auto">{fieldName}</p>
      <Input
        value={value}
        title="quantity"
        className={`w-[40px] ${className}`}
        name={propName}
        type="number"
        defaultValue={defaultValue || null}
        onChange={hanldeChange}
      />
    </div>
  );
}

export default QuantityField