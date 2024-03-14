import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const FullScreenLoading = ({ isLoading }) => {
  return (
    <>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 32,
            }}
            spin
          />
        }
        spinning={isLoading}
        fullscreen
      />
    </>
  );
};

export default FullScreenLoading;
