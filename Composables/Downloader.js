// import { FileSystem, shareAsync } from 'expo';
// import { Platform } from 'react-native';
// import { saveFile } from '../src/components/share/SavePost';

// async function Downloader() {
//   const filename = "dummy.pdf";
//   const result = await FileSystem.downloadAsync(
//     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
//     FileSystem.documentDirectory + filename
//   );

//   // Log the download result
//   console.log(result);
//   saveFile(result.uri, filename, result.headers["Content-Type"]);

//   // Save the downloaded file
// }
// async function saveFile(uri, filename, mimetype) {
//     if (Platform.OS === "android") {
//       const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  
//       if (permissions.granted) {
//         const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  
//         await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
//           .then(async (uri) => {
//             await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
//           })
//           .catch(e => console.log(e));
//       } else {
//         shareAsync(uri);
//       }
//     } else {
//       shareAsync(uri);
//     }
//   }


//   export default Downloader