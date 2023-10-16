import { HashLoader } from "react-spinners";

const Loader = ({color, size, hight}) => {
  return (
    <div className={`${hight? hight:"h-[calc(100vh-100px)]"} w-full flex justify-center items-center`}>
      <HashLoader color={color?color:"#36d7b7"} size={size ? size:90} />
    </div>
  );
};

export default Loader;
