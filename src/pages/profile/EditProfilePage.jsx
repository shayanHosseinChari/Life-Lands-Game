import { Fragment, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomInputMain from "../../components/CustomInput/CustomInputMain";
import CustomText from "../../components/text/CustomText";
import * as DocumentPicker from "expo-document-picker";

import {
  getProfileService,
  updateProfileService,
} from "../../service/UserService";
import SpaceStyle from "../../style/SpaceStyle";
import * as ImagePicker from "expo-image-picker";
import lifeLandsAPI from "../../service/axiosConfig";
import axios from "axios";
import { OpenToast } from "../../components/share/OpenToast";
import {
  getValueFor,
  getValueForMenuVisible,
  getValueForTheme,
  saveMenuVisible,
  setMenuVisible,
  setTheme,
} from "../../appsetting/storeConfig";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { RootContext } from "../../context/RootContext";
import { Icon } from "../../appsetting/icons";
import * as FileSystem from 'expo-file-system'
import { RFPercentage } from "react-native-responsive-fontsize";
const EditProfilePage = ({ navigation }) => {
  const { setReloadUser, setWasChangedTheme } = useContext(RootContext);
  const [firstName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [image, setImage] = useState(null);

  const style = StyleSheet.create({
    centerContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      marginTop: 20,
    },
    col_2: {
      width: width / 2.3,
      marginHorizontal: 10,
    },
    col_1: {
      width: width / 1.08,
      marginTop: 20,
      marginHorizontal: 10,
      justifyContent: "center",
      alignSelf: "center",
    },
    btn: { width: width / 1.08, alignSelf: "center", marginVertical: 20 },
    input: { alignSelf: "center" },
  });
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const {
      data: { data: res },
    } = await getProfileService();
    setFirsName(res?.firstName);
    setLastName(res?.lastName);
    setEmail(res?.email);
    setAboutMe(res?.aboutMe);
    setUserName(res?.userName);

    setUserProfile(res);
  };
  const [photo, setPhoto] = useState(null);
  const [photoShow, setPhotoShow] = useState(null);
  const takePhotoAndUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type:"image/*"
    });

    console.log('result profile image ',result)

    if (result.cancelled) {
      return;
    }

    let localUri = result.assets[0].uri;
    setProfileImage(localUri)
   
    setPhotoShow(localUri);
 

    // Upload the image using the fetch and FormData APIs
    await FileSystem.uploadAsync("https://lifelands.ir/api/v1/file",localUri,{
      httpMethod: 'POST',
      parameters:{
        department:"profile"
      },
      headers:{
        token: getValueFor()
      },
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file'
    }).then(data=>{
      var s = JSON.parse(data.body)
      console.log()
      OpenToast("بارگذاری شد", "تصویر پروفایل با موفقیت بارگذاری شد");
      setReloadUser(Date.now());
        setImage()
        setProfileImage(s.data.fileName)
    }).catch(err=>{
      console.log(err) 

    })
   
    
    
  };
  // const editProfile = (profile)=>{
  //   axios.post('https://lifelands.ir/api/v1/file',{
  //     headers:{
  //       token: getValueFor()
  //     },
  //     profileImage: profile,

  //   }).then(response=>{
  //     console.log(response)
  //   })
  // }
  const sendData = async () => {
    const {
      data: { state },
    } = await updateProfileService({
      firstName,
      lastName,
      userName,
      email,
      aboutMe,
      profileImage: profileImage
      
    });
    if (state) {
      OpenToast("بروزشد", "اطلاعات کاربری با موفقیت بروزشد");
      // editProfile(localUri)
      navigation.goBack();
    }
  };

  return (
    <View style={{width:"100%",height:"100%",paddingHorizontal:RFPercentage(2), backgroundColor: "rgba(0,0,0,0.3)" }}>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "85%", backgroundColor: "#282828", borderTopRightRadius: 40, borderTopLeftRadius: 40 }}>
        <ScrollView>
          <SpaceStyle>
            <SpaceStyle bottom={20} right={20} left={20}>
            </SpaceStyle>
            <View style={style.centerContainer}>
              <TouchableOpacity onPress={takePhotoAndUpload}>
                <Icon
                  dark={require("./../../../assets/icons/PickPicture.png")}
                  light={require("./../../../assets/icons/PickPicture.png")}
                  style={{ width: 30, height: 30, position: "absolute", top: 75, right: 5, zIndex: 5 }}
                />
                <CustomImage
                  image={photoShow ? photoShow : userProfile.profileImage}
                  width={100}
                  height={100}
                  radius={100}
                  aspect={1 / 1}
                />
              </TouchableOpacity>
              <SpaceStyle styles={{ width: "100%" }}>
                <CustomInputMain
                  lable={"نام"}
                  style={style.input}
                  width={"90%"}
                  onChangeText={(text) => {
                    setFirsName(text);
                    //console.log(text);
                  }}
                  placeholder={"نام شما..."}
                  value={firstName}
                />
              </SpaceStyle>
              <SpaceStyle>
                <CustomInputMain
                  lable={"نام خانوادگی"}
                  style={style.input}
                  width={"90%"}
                  placeholder={"نام خانوادگی شما..."}
                  onChangeText={(text) => {
                    setLastName(text);
                  }}
                  value={lastName}
                />
              </SpaceStyle>
              <SpaceStyle>
                <CustomInputMain
                  lable={"نام کاربری"}
                  style={style.input}
                  width={"90%"}
                  placeholder={"نام کاربری شما..."}
                  onChangeText={(text) => {
                    setUserName(text);
                  }}
                  value={userName}
                />
              </SpaceStyle>

              <SpaceStyle>
                <CustomInputMain
                  lable={"ایمیل"}
                  style={style.input}
                  width={"90%"}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  value={email}
                  placeholder={"ایمیل شما..."}
                />
              </SpaceStyle>

            </View>
            <View>
              <CustomInputMain
                multiline
                lable={"درباره من"}
                numberOfLines={5}
                placeholder={"درباره من..."}
                onChangeText={(text) => {
                  setAboutMe(text);
                }}
                value={aboutMe}
              />
            </View>
            <View style={style.btn}>
              <CustomButton styles={{backgroundColor:"#77BCFB" , paddingVertical:3, borderRadius:555, }} sizeT={14} onClick={sendData}>ثبت</CustomButton>
            </View>
          </SpaceStyle>
        </ScrollView>
      </View>
    </View>
  );
};
export default EditProfilePage;
