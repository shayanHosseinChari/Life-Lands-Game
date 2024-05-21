import MergePaintsHomePage from "../paint/MergePaintsHomePage";

const PaintsHomeRoot = ({ paintRef, navigation, lastPaints }) => {
  return (
    <MergePaintsHomePage navigation={navigation} lastPaints={lastPaints} />
  );
};
export default PaintsHomeRoot;
