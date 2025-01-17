import { Empty } from "antd";

const NoData = ({ message }) => {
  return (
    <>
      <div className="tw-py-20 tw-text-center">
        <Empty description={message ?? "データがありません。"} />
      </div>
    </>
  );
};

export default NoData;
