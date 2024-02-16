import SuccessAnimationJSON from "@/app/_lottie/lottie-success.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SuccessAnimation = () => {
  return (
    <Lottie
      animationData={SuccessAnimationJSON}
      loop={false}
      autoPlay
      style={{ width: 110, height: 100 }}
    />
  );
};

export default SuccessAnimation;
