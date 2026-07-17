import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <Oval
        height={60}
        width={60}
        color="#2563eb"
        secondaryColor="#bfdbfe"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  );
};

export default Loader;