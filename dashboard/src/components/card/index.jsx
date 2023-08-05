import React from "react";

const Card = ({ value, title, Icon, bg, tc, fz, titleFz  }) => {
  return (
    <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
      <div className="flex justify-start items-start flex-col text-[#d0d2d6] ">
        <h2 className={`text-[1rem] md:${fz ? fz:'text-3xl'}  font-bold`}>{value}</h2>
        <span className={`text-[.9rem] md:${titleFz?titleFz:'text-md'} lg:${titleFz?titleFz:'text-md'}  font-medium `}>
          {title}
        </span>
      </div>
      <div
        className="w-[46px] h-[47px] rounded-full flex items-center justify-center text-xl"
        style={{
          backgroundColor: bg,
        }}
      >
        <Icon
          className="shadow-lg"
          style={{
            color: tc,
          }}
        />
      </div>
    </div>
  );
};

export default Card;
