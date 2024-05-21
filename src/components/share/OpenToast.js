import Toast from "react-native-toast-message";

export function OpenToast(title, description, type = "success") {
  Toast.show({
    type: type,
    text1: title,
    text2: description,
  });
}
