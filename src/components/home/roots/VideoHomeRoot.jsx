import { SpecialView } from "react-native-scroll-to-element";
import MergeHomeVideoComponent from "../MergeHomeVideoComponent";
import SpaceStyle from "../../../style/SpaceStyle";
import DepartmentFilterComponent from "../../share/DepartmentsFilterComponent";

const VideoHomeRoot = ({
  videoRef,
  videos,
  navigation,
  videosCategories,
  videoCategoryId,
  setVideoCategoryId,
}) => {
  return (
    <MergeHomeVideoComponent
      videos={videos}
      navigation={navigation}
      categoryBlock={
        <>
          {videosCategories && (
            <SpaceStyle bottom={7}>
              <DepartmentFilterComponent
                categoryId={videoCategoryId}
                categories={videosCategories}
                setCategoryId={setVideoCategoryId}
                color={"#171414"}
              />
            </SpaceStyle>
          )}
        </>
      }
    />
  );
};
export default VideoHomeRoot;
