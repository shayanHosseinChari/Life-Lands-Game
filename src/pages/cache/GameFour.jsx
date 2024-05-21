import { WebView } from "react-native-webview";

const GameFour = () => {
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
export default GameFour;
