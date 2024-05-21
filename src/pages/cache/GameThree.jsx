import { WebView } from "react-native-webview";

const GameThree = () => {
  return (
    <WebView
      javaScriptEnabled
      originWhitelist={["*"]}
      cacheEnabled={true}
      source={{
        uri: `https://divar.ir/s/abadan`,
      }}
    />
  );
};
export default GameThree;
