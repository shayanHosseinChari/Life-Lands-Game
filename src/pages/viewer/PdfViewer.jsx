// import React, { useEffect, useRef, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import PDFReader from "rn-pdf-reader-js";
// import CustomText from "../../components/text/CustomText";
// import SpaceStyle from "../../style/SpaceStyle";
// import VoicePlayer from "./VoicePlayer";

// const PdfViewer = ({
//   route: {
//     params: { item },
//   },
//   navigation,
// }) => {
//   const [pdfUri, setPdfUri] = useState(item.file);
//   const [pdfUrl, setPdfUrl] = useState(item.pdfUrl);

//   let first = React.createRef();
//   const style = StyleSheet.create({
//     pdfContainer: {
//       flex: 1,
//       height: "100%",
//     },
//   });

//   return (
//     <View style={style.pdfContainer}>
//       <SpaceStyle top={10}>
//         {item?.audioFile && <VoicePlayer item={item} navigation={navigation} />}
//       </SpaceStyle>
//       <PDFReader
//         withPinchZoom={true}
//         ref={(re) => (first = re)}
//         source={{
//           uri: pdfUri ? pdfUri : pdfUrl,
//         }}
//       />
//     </View>
//   );
// };
// export default PdfViewer;
