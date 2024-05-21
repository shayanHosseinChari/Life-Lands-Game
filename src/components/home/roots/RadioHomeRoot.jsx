import { SpecialView } from "react-native-scroll-to-element";
import MergeRadioComponent from "../MergeRadioComponent";

const RadioHomeRoot = ({ radioRef, voicesPlayLists, navigation }) => {
  return (
    <MergeRadioComponent radio={voicesPlayLists} navigation={navigation} />
  );
};
export default RadioHomeRoot;
