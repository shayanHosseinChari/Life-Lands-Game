import { View } from "react-native";
import * as React from "react";
import { WebView } from "react-native-webview";
import CustomText from "../text/CustomText";

const PdfViewerComponent = () => {
  const webviewRef = React.useRef(null);

  return (
    <View>
      <CustomText>000</CustomText>
      <WebView
        ref={webviewRef}
        source={{ uri: "https://example.com/" }}
        onNavigationStateChange={(event) => {
          if (!event.url.includes("example.com")) {
            webviewRef.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    </View>
  );
};
export default PdfViewerComponent;
