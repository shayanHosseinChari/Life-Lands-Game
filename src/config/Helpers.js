import NavigationService from "./NavigationService";
//goToLogin Function on different js :
export function goToLogin() {
  NavigationService.navigate("Profile");
}

export function goToError() {
  NavigationService.navigate("Error");
}
