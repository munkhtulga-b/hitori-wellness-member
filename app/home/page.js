import BranchScroller from "../_components/home/BranchScroller";

const HomePage = () => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-y-4">
      {[1, 2, 3].map((item) => {
        return <BranchScroller key={item} />;
      })}
    </div>
  );
};

export default HomePage;
