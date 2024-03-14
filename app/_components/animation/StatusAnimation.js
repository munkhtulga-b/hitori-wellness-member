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
    <div className="tw-min-h-[60px] tw-min-w-[60px] tw-max-h-[60px] tw-max-w-[60px] tw-overflow-hidden tw-bg-transparent tw-relative">
      <Lottie
        animationData={getAnimationType()}
        loop={false}
        autoPlay
        style={{
          width: 60,
          height: 60,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
};

export default StatusAnimation;
