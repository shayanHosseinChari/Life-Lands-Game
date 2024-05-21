import { Icon } from "../../appsetting/icons";

const ConsoleTypeComponent = ({ type }) => {
  return (
    <>
      {type === "sega" ? (
        <Icon
          dark={require("../../../assets/sega.jpg")}
          light={require("../../../assets/sega.jpg")}
          style={{
            width: 40,
            height: 20,
            borderRadius: 20,
          }}
        />
      ) : type === "nintendo" ? (
        <Icon
          dark={require("../../../assets/nintendo.jpg")}
          light={require("../../../assets/nintendo.jpg")}
          style={{
            width: 40,
            height: 20,
            borderRadius: 20,
          }}
        />
      ) : type === "super-nintendo" ? (
        <Icon
          dark={require("../../../assets/super-nintendo.jpg")}
          light={require("../../../assets/super-nintendo.jpg")}
          style={{
            width: 40,
            height: 20,
            borderRadius: 20,
          }}
        />
      ) : type === "nintendo64" ? (
        <Icon
          dark={require("../../../assets/nintento-64.jpg")}
          light={require("../../../assets/nintento-64.jpg")}
          style={{
            width: 40,
            height: 20,
            borderRadius: 20,
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default ConsoleTypeComponent;
