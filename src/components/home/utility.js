import { useEffect, useState } from "react";

export const useListSlicerWraper = (list) => {
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [thirdList, setThirdList] = useState([]);
  const [fourthList, setFourthList] = useState([]);
  const [isSet, setIsSet] = useState();

  useEffect(() => {
    if (list) {
      if (list?.length >= 32) {
        setFirstList(list.slice(0, 7));
        setSecondList(list.slice(7, 15));
        setThirdList(list.slice(15, 23));
        setFourthList(list.slice(23, 31));
      } else if (list?.length >= 24) {
        setFirstList(list.slice(0, 7));
        setSecondList(list.slice(7, 15));
        setThirdList(list.slice(15, 23));
      } else if (list?.length >= 16) {
        setFirstList(list.slice(0, 7));
        setSecondList(list.slice(7, 15));
      } else {
        setFirstList(list.slice(0, 7));
      }
      setIsSet(true);
    }
  }, [list]);

  return { firstList, secondList, thirdList, fourthList };
};
