import SuccessAnimationJSON from "@/app/_lottie/lottie-success.json";
import ErrorAnimationJSON from "@/app/_lottie/lottie-error.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const StatusAnimation = ({ type }) => {
  const getAnimationType = () => {
    let result = SuccessAnimationJSON;
    if (type === "error") {
      result = ErrorAnimationJSON;
    }
    return result;
  };

  return (
    <Lottie
      animationData={getAnimationType()}
      loop={false}
      autoPlay
      style={{ width: 60, height: 60 }}
    />
  );
};

export default StatusAnimation;
