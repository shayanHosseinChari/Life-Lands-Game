import { FlatList, View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import { Icon } from "../../appsetting/icons";
import TournamentGameSliderItems from "./TournamentGameSliderItems";

const TournamentGameSlider = ({ items, title }) => {
    return (
        <SpaceStyle top={20}>
            <SpaceBetween>
                <SpaceStyle left={10} bottom={10}>
                    <Row>
                        <Icon
                            dark={require("../../../assets/icons/arrow-left.png")}
                            light={require("../../../assets/icons/arrow-left.png")}
                            style={{ width: 16, height: 16, marginTop: 5 }}
                        />
                        <CustomText fontSize={14} selfCenter>
                            بیشتر
                        </CustomText>
                    </Row>
                </SpaceStyle>
                <SpaceStyle right={10} bottom={0}>
                    <CustomText fontSize={14}>{title}</CustomText>
                </SpaceStyle>
            </SpaceBetween>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                inverted={true}
                keyExtractor={(item) => item._id}
                data={items}
                renderItem={({ item }) => <TournamentGameSliderItems item={item} />}
            />
        </SpaceStyle>
    );
};
export default TournamentGameSlider;
