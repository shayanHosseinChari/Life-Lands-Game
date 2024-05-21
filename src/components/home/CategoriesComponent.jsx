import { useState } from "react";
import { CenterStyled } from "../../style/uiUtil";
import CategoryItem from "./CategoryItem";

const CategoriesComponent = ({
  navigation,
  gameRef,
  bookRef,
  tvRef,
  leaderboardRef,
  radioRef,
  paintRef,
  videoRef,
}) => {
  const [currentBlock, setCurrentBlock] = useState();

  return (
    <>
      <CenterStyled>
        <CategoryItem
          isCurrent={currentBlock === "radio"}
          onPress={() => {
            radioRef.current.focus();
            setCurrentBlock("radio");
          }}
          darkIcon={require("../../../assets/icons/radio.png")}
          lightIcon={require("../../../assets/icons/Light/radiolight.png")}
        >
          رادیو
        </CategoryItem>
        <CategoryItem
          isCurrent={currentBlock === "paint"}
          onPress={() => {
            paintRef.current.focus();
            setCurrentBlock("paint");
          }}
          darkIcon={require("../../../assets/icons/PaintGallery.png")}
          lightIcon={require("../../../assets/icons/Light/PaintGallery.png")}
        >
          نقاشی
        </CategoryItem>

        <CategoryItem
          isCurrent={currentBlock === "tv"}
          darkIcon={require("../../../assets/icons/tvscreen.png")}
          lightIcon={require("../../../assets/icons/Light/tv_screenlight2.png")}
          onPress={() => {
            videoRef.current.focus();
            setCurrentBlock("tv");
          }}
        >
          TV
        </CategoryItem>

        <CategoryItem
          isCurrent={currentBlock === "book"}
          darkIcon={require("../../../assets/icons/openbook.png")}
          lightIcon={require("../../../assets/icons/Light/openbooklight2.png")}
          onPress={() => {
            bookRef.current.focus();
            setCurrentBlock("book");
          }}
        >
          کتاب
        </CategoryItem>
        <CategoryItem
          isCurrent={currentBlock === "game"}
          lightIcon={require("../../../assets/icons/Light/joysticklight2.png")}
          darkIcon={require("../../../assets/icons/joystick.png")}
          onPress={() => {
            gameRef.current.focus();
            setCurrentBlock("game");
          }}
        >
          wGames
        </CategoryItem>
      </CenterStyled>
    </>
  );
};
export default CategoriesComponent;
