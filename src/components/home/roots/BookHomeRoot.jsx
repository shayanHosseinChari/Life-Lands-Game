import { SpecialScrollView, SpecialView } from "react-native-scroll-to-element";
import SpaceStyle from "../../../style/SpaceStyle";
import MergeHomeBook from "../mergeHomeBook";
import DepartmentFilterComponent from "../../share/DepartmentsFilterComponent";

const BookHomeRoot = ({
  bookRef,
  books,
  navigation,
  booksCategories,
  bookCategoryId,
  setBookCategoryId,
}) => {
  return (
    <SpaceStyle top={20}>
      <MergeHomeBook
        books={books}
        navigation={navigation}
        categoryBlock={
          <>
            {booksCategories && (
              <SpaceStyle bottom={7}>
                <DepartmentFilterComponent
                  categoryId={bookCategoryId}
                  categories={booksCategories}
                  setCategoryId={setBookCategoryId}
                  color={"#171414"}
                />
              </SpaceStyle>
            )}
          </>
        }
      />
    </SpaceStyle>
  );
};
export default BookHomeRoot;
