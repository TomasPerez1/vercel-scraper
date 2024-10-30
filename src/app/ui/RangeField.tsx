import {Input} from "@nextui-org/react"

function RangeField({
  fieldName,
  propName,
  handleChange,
  value_min,
  value_max,
}) {
  return (
    <div className=" flex flex-col items-center gap-0.5 ">
      <p className="w-fit mx-auto">{fieldName}</p>
      <span className="flex gap-2">
        <Input
          value={value_min}
          onChange={handleChange}
          title={`range-${propName}`}
          name={`${propName}_min`}
          className="w-[80px]"
          type="number"
        />
        <p className="text-3xl">-</p>
        <Input
          value={value_max}
          onChange={handleChange}
          className="w-[80px]"
          title={`range-${propName}`}
          name={`${propName}_max`}
          type="number"
        />
      </span>
    </div>
  );
}

export default RangeField