import { FlatList, View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import TopPageListItem from "./TopPageListItem";

const TopPageList = ({ items }) => {
    return (
        <SpaceStyle>
            <FlatList
                showsHorizontalScrollIndicator={false}

                horizontal={true}
                inverted={true}
                keyExtractor={(item) => item._id}
                data={items}
                renderItem={({ item }) => <TopPageListItem item={item} />}
            />
        </SpaceStyle>
    );
};
export default TopPageList;
