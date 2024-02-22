import SuccessAnimationJSON from "@/app/_lottie/lottie-success.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SuccessAnimation = () => {
  return (
    <Lottie
      animationData={SuccessAnimationJSON}
      loop={false}
      autoPlay
      style={{ width: 60, height: 60 }}
    />
  );
};

export default SuccessAnimation;
