import React, { Fragment, useContext, useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Audio } from "expo-av";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  
} from "react-native";
import * as FileSystem from 'expo-file-system'
import {StatusBar} from 'expo-status-bar'
import * as DocumentPicker from "expo-document-picker";
import { Icon } from "../../appsetting/icons";
import { CenterStyled, Row } from "../../style/uiUtil";
import CustomText from "../../components/text/CustomText";
import CustomImage from "../../components/CustomImage/CustomImage";
import * as ImagePicker from "expo-image-picker";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Feather from 'react-native-vector-icons/Feather'
import { getValueFor } from "../../appsetting/storeConfig";
import { OpenToast } from "../../components/share/OpenToast";
import SpaceStyle from "../../style/SpaceStyle";
import CustomInput from "../../components/CustomInput/CustomInput";
import PageWrapper from "../../components/loading/PageWrapper";
import HeaderComponent from "../../components/layout/HeaderComponent";
import VoicePlayer from "../viewer/VoicePlayer";
import {
  insertPaintService,
  updatePaintService,
} from "../../service/paintService";
import { useTheme } from "@react-navigation/native";
import { border } from "../../appsetting/styleSetting";
import CustomCard from "../../components/CustomCard/CustomCard";
import { RootContext } from "../../context/RootContext";
import AgeItemComponent from "../../components/paint/insert/AgeItemComponent";
import { BASE_URL, LOAD_FILE } from "../../service/APIs";
import { mimetypeToEx } from "../../utility/mimetypes";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { ImageEditor } from "expo-image-editor";
import { TextInput } from "react-native-gesture-handler";
let defTitle = "paint-" + Date.now();
const PaintPage = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [paint] = useState(route?.params?.paint);
  const { user } = useContext(RootContext);
  const style = StyleSheet.create({
    uploadContainer: {
      width: "100%",
      height: 150,
      backgroundColor:'transparent',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: border,
    },
    centerVertical: {
      justifyContent: "center",
    },
  });
  const [uploadLoading,setUploadLoading] = useState(false)
  const [second, setSecond] = useState(0);
  const [recording, setRecording] = useState();
  const [gettingVoice, setGettingVoice] = useState(false);
  const [photoShow, setPhotoShow] = useState(null);
  const [image, setImage] = useState();
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [ages] = useState(["2-4", "5-7", "8-10", "11-12", "13-16", "+17"]);
  const [voice, setVoice] = useState();
  const [forceValue, setForceValue] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();
  const [stopEv, setStopEv] = useState();
  let height = Dimensions.get("screen").height;
  let width = Dimensions.get("screen").width;
  const [voiceUri, setVoiceUri] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [uploadMusic,setUploadMusic] = useState(false)
  const [mainImageData,setMainImageData] = useState()

  const [editorVisible, setEditorVisible] = useState(false);
 
  useEffect(() => {
    test();
  }, [isRecording, second]);

  useEffect(() => {
    setPaintData();
  }, [paint]);
  const setPaintData = async () => {
    // console.log(paint);
    setPhotoShow(paint?.image);

    setImage(paint?.image);

    setGender(paint?.gender);

    setAge(paint?.age);

    console.log(`${LOAD_FILE}${paint?.voice}`);

    setTitle(paint?.title);

    setDescription(paint?.description);

    if (paint?.voice) {
      setVoice(`${LOAD_FILE}${paint?.voice}`);
      setVoiceUri(`${LOAD_FILE}${paint?.voice}`);
      setGettingVoice(true);
      const response = await fetch(`${LOAD_FILE}${paint?.voice}`, {
        method: "GET",
      }).finally((res) => {});

      setGettingVoice(false);
      const { data } = await response.json();
      setVoice(data.fileName);
      setVoiceUri(data.fileName);
    }
  };

  const test = () => {
    if (isRecording) {
      setTimeout(() => {
        setSecond(second + 1);
      }, 800);
    }
  };
  async function startRecording() {
    try {
      setIsRecording(true);
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      console.log(recording)

      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    setRecording(undefined);
    setSecond(0);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    // await saveFile(uri);
    setVoiceUri(uri);
    setUploadMusic(true)
    await FileSystem.uploadAsync("https://lifelands.ir/api/v1/file",uri,{
      httpMethod: 'POST',
      parameters:{
        department:"paint"
      },
      headers:{
        token: getValueFor()
      },
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file'
    }).then(data=>{
      var ss = JSON.parse(data.body)
    setUploadMusic(false)

        setUploadLoading(false)
       
        setVoice(`${LOAD_FILE}${ss.data.fileName}`);
        setVoiceUri(`${LOAD_FILE}${ss.data.fileName}`);
        setGettingVoice(true);
        setGettingVoice(false)
       
      console.log(data)
    }).catch(err=>{
      console.log(err)
    setUploadLoading(false)
    setUploadMusic(false)

    })
  }

   
  const takePhotoAndUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type:"image/*",
      copyToCacheDirectory:true,
      multiple:false
    });
    // console.log('image picked ',result.assets[0].file)
    if (result.cancelled) {
      return;
    }else{
      setPhotoShow(result.assets[0].uri);
      setMainImageData(result.assets[0])
      setEditorVisible(true)
   
    
  
    }
  
   
  };
  const sendData = async () => {
    setPaintData()
    let dataBody = {
      
      description,
      title,
      image,
      voice,
      age,
      gender,
    };
    if (!age || !gender) {
      OpenToast("سن و جنسیت", "لطفا سن و جنسیت خود را وارد کنید", "error");
      return;
    }
    console.log(dataBody);
    let stateData;
    if (paint?._id) {
      const {
        data: { state },
      } = await updatePaintService(paint?._id, dataBody);
      stateData = state;
    } else {
      const {
        data: { state },
      } = await insertPaintService(dataBody);
      stateData = state;
    }
    if (stateData) {
      OpenToast("ثبت شد", "نقاشی مورد نظر با موفقیت ثبت شد");
      navigation.goBack();
    }
  };
  const getVoiceFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });

  

    let localUri = result.assets[0].uri;
    let filename = `lifelands-${Math.floor(Math.random()*100)}`;

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    setUploadMusic(true)
    await FileSystem.uploadAsync("https://lifelands.ir/api/v1/file",localUri,{
      httpMethod: 'POST',
      parameters:{
        department:"paint"
      },
      headers:{
        token: getValueFor()
      },
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file'
    }).then(data=>{
      var ss = JSON.parse(data.body)
    setUploadMusic(false)
    setGettingVoice(false)


        setUploadLoading(false)
       
        setVoice(`${LOAD_FILE}${ss.data.fileName}`);
        setVoiceUri(`${LOAD_FILE}${ss.data.fileName}`);
        setGettingVoice(true);

       
      console.log(data)
    }).catch(err=>{
      console.log(err)
    setUploadLoading(false)
    setUploadMusic(false)

    })
   
  };
  return (
    
<ScrollView style={{height:Dimensions.get('window').height,paddingHorizontal:RFPercentage(2)}}>
        <SpaceStyle top={10} bottom={20}styles={{position:"relative"}} >
          {
            uploadLoading?<View style={{position: "absolute",top:0,left:0,zIndex:99,backgroundColor:"#00000054",width:"100%",height:'100%',borderRadius: 8,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator color={'white'} size={RFPercentage(3)} />
            <Text style={{marginTop: 4,fontFamily:"vazir",color: "white"}}>درحال آپلود تصویر . . .</Text>
          </View>:null
          }
          {photoShow ? (
            <View>
              <Image
                source={{
                  uri: `${
                    photoShow?.includes("http") || photoShow?.includes("file:")
                      ? ""
                      : LOAD_FILE
                  }${photoShow}`,
                }}
                height={400}
                resizeMode="contain"
                style={{ height: 200, width: '100%',borderRadius:40 }}
                
              />
              <TouchableOpacity
                onPress={() => {
                  setImage(null);
                  setPhotoShow(null);
                }}
                style={{
                  bottom: 0,
                  position: "absolute",
                  right: 10,
                  backgroundColor: "#0b0c0d",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                }}
              >
                <Row>
                  <CustomText
                    style={{ alignSelf: "center" }}
                    color={colors.red}
                  >
                    حذف تصویر
                  </CustomText>
                  <Icon
                    dark={require("../../../assets/icons/delete.png")}
                    light={require("../../../assets/icons/Light/delete.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </Row>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={takePhotoAndUpload}>
                <View style={style.uploadContainer}>
                  <Icon
                    dark={require("../../../assets/icons/shield.png")}
                    light={require("../../../assets/icons/shield.png")}
                    style={{ width: 25, height: 25 }}
                  />
                  <CustomText
                    style={{ alignSelf: "center", marginTop: 10 }}
                    color={colors.lightTextColor}
                  >
                    تصویر خود را بارگذاری کنید
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </SpaceStyle>
        {voiceUri ? (
                <View
                style={{
                  backgroundColor: "black",
                  paddingVertical: 10,
                  borderRadius: 10,
                
                
                }}
              >
                <View >
                  <VoicePlayer
                    hasBackAction={false}
                    hasNextAction={false}
                    item={{ audioFile: voiceUri }}
                    forceValue={forceValue}
                    onSecondProssessListener={(e) => {
                      console.log(e);
                    }}
                  />

          <View style={{width:"100%",position:"relative",justifyContent:"space-between",alignItems:"space-between",paddingHorizontal:RFPercentage(2),marginBottom:-10}}>
         
          <TouchableOpacity
                    onPress={() => {
                      setVoice(null);
                      setVoiceUri(null);
                      setSecond(0);
                    }}
                    style={{
                     width:'30%',
                      
                      backgroundColor: "#0b0c0d",
                      paddingVertical: 5,
                     
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 7,
                    }}
                  >
                    <Row>
                      <CustomText
                        style={{ alignSelf: "center" }}
                        color={colors.red}
                      >
                        حذف صدا
                      </CustomText>
                      <Icon
                        dark={require("../../../assets/icons/delete.png")}
                        light={require("../../../assets/icons/Light/delete.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </Row>
                  </TouchableOpacity>
          </View>
                </View>
                {gettingVoice && (
                  <CustomText bottom={5} selfCenter>
                    درحال دریافت صدا...
                  </CustomText>
                )}
              </View>
        ) : (
        <View>
        <View style={{marginBottom:RFPercentage(0.4)}}>
        <SpaceStyle styles={{position:"relative"}}>
        {
            uploadMusic?<View style={{position: "absolute",top:0,left:0,zIndex:99,backgroundColor:"#000000b8",width:"100%",height:'100%',borderRadius: 8,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator color={'white'} size={RFPercentage(3)} />
            <Text style={{marginTop: 4,fontFamily:"vazir",color: "white"}}>درحال آپلود صدا . . .</Text>
          </View>:null
          }
          <TouchableOpacity onPress={getVoiceFile}>
            <View style={style.uploadContainer}>
              <View style={{backgroundColor:"#452eb9",padding:10,justifyContent:"center",alignItems:"center",borderRadius:100}}>
                <Feather name="music" color={'white'} size={RFPercentage(2.5)} />
              </View>
              <CustomText
                style={{ alignSelf: "center", marginTop: 10 }}
                color={colors.lightTextColor}
              >
                صدای مورد نظر خود را بارگذاری کنید
              </CustomText>
            </View>
          </TouchableOpacity>
        </SpaceStyle>

        </View>
          <LinearGradient colors={['transparent','#202020']} style={{padding:20,borderRadius:8,position:"relative"}}>
         
            <View style={{position:"relative"}}>
            {
            uploadMusic?<View style={{position: "absolute",top:0,left:0,zIndex:99,backgroundColor:"#000000b8",width:"100%",height:'100%',borderRadius: 8,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator color={'white'} size={RFPercentage(3)} />
            <Text style={{marginTop: 4,fontFamily:"vazir",color: "white"}}>درحال آپلود صدا . . .</Text>
          </View>:null
          }
            
              {/* <CustomButton onClick={getVoiceFile}>انتخاب صدا</CustomButton> */}
              <CenterStyled>
                <Row>
                  <View style={style.centerVertical}>
                    <SpaceStyle right={10} top={15}>
                      <CustomText color={colors.red}>ضبط صدا</CustomText>
                      <CustomText>صدای مورد نظر خود را رکورد کنید</CustomText>
                    </SpaceStyle>
                  </View>
                  <View>
                    {recording ? (
                      <TouchableOpacity onPress={stopRecording}>
                        <Icon
                          dark={require("../../../assets/icons/Light/pouse-record.png")}
                          light={require("../../../assets/icons/Light/pouse-record.png")}
                          style={{
                            width: 40,
                            height: 40,
                            marginTop: 20,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={startRecording}>
                        <Icon
                          dark={require("../../../assets/icons/start-record.png")}
                          light={require("../../../assets/icons/start-record.png")}
                          style={{
                            width: 40,
                            height: 40,
                            marginTop: 20,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </Row>
              </CenterStyled>
              {second > 0 && <CustomText selfCenter>{second} ثانیه</CustomText>}
            </View>
          </LinearGradient>
        </View>
        )}
        <ImageEditor
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={photoShow}
        
        
        lockAspectRatio={true}
        minimumCropDimensions={{
          width: 600,
          height: 100,
        }}
        onEditingComplete={async(result) => {
          setPhotoShow(result.uri)
          let file = new FormData();
          
          
          file.append("file",{...mainImageData,uri: result.uri,filename: mainImageData.name,mimeType: mainImageData.mimeType});
          setUploadLoading(true)
         await FileSystem.uploadAsync("https://lifelands.ir/api/v1/file",result.uri,{
            httpMethod: 'POST',
            parameters:{
              department:"paint"
            },
            headers:{
              token: getValueFor()
            },
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file'
          }).then(data=>{
            var s = JSON.parse(data.body)
            console.log()
          setUploadLoading(false)
              setImage(s.data.fileName)
          }).catch(err=>{
            console.log(err)
          setUploadLoading(false)

          })
         
          
        
        }}
        mode="full"
      />

        <SpaceStyle top={40}>
                          <CenterStyled style={{width:"100%",justifyContent:"center",alignItems:"center",backgroundColor:"red"}}>
                          <CustomText
            selfCenter
            color={colors.lightTextColor}
            bottom={5}
            top={10}
          >
            جنسیت
          </CustomText>

                          </CenterStyled>
          <CenterStyled>
            <Row>
              <TouchableOpacity onPress={() => setGender("female")}>
                <SpaceStyle >
                  <Row styles={style.centerVertical}>
                    <CustomText
                      color={
                        gender === "female"
                          ? colors.darkGreen
                          : colors.lightTextColor
                      }
                      style={{ alignSelf: "center", marginHorizontal: 10 }}
                    >
                      دختر
                    </CustomText>
                    <View
                      style={{
                        padding: 5,
                        borderWidth: 2,
                        borderColor:
                          gender === "female"
                            ? colors.darkGreen
                            : colors.lightTextColor,
                        borderRadius: 100,
                      }}
                    >
                      <Icon
                        dark={require("../../../assets/icons/girl-.png")}
                        light={require("../../../assets/icons/girl-.png")}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor:
                            gender === "female"
                              ? colors.darkGreen
                              : colors.lightTextColor,

                          borderRadius: 100,
                        }}
                      />
                    </View>
                  </Row>
                </SpaceStyle>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGender("man")}>
                <SpaceStyle left={10}>
                  <Row>
                    <View
                      style={{
                        padding: 5,
                        borderWidth: 2,
                        borderColor:
                          gender === "man"
                            ? colors.darkGreen
                            : colors.lightTextColor,
                        borderRadius: 100,
                      }}
                    >
                      <Icon
                        dark={require("../../../assets/icons/boy.png")}
                        light={require("../../../assets/icons/boy.png")}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor:
                            gender === "man"
                              ? colors.darkGreen
                              : colors.lightTextColor,
                          borderRadius: 100,
                        }}
                      />
                    </View>

                    <CustomText
                      color={
                        gender === "man"
                          ? colors.darkGreen
                          : colors.lightTextColor
                      }
                      style={{ alignSelf: "center", marginHorizontal: 10 }}
                    >
                      پسر
                    </CustomText>
                  </Row>
                </SpaceStyle>
              </TouchableOpacity>
            </Row>
          </CenterStyled>
        </SpaceStyle>
        <SpaceStyle top={10}>
          <CustomText
            selfCenter
            color={colors.lightTextColor}
            bottom={5}
            top={10}
          >
            محدوده سنمی خود را مشخص کنید:
          </CustomText>
          <CenterStyled>
            <Row>
              <AgeItemComponent
                setAge={setAge}
                ageItem={"3-6"}
                currentAge={age}
              />
              <AgeItemComponent
                setAge={setAge}
                ageItem={"6-8"}
                currentAge={age}
              />
              <AgeItemComponent
                setAge={setAge}
                ageItem={"8-10"}
                currentAge={age}
              />
              <AgeItemComponent
                setAge={setAge}
                ageItem={"10-12"}
                currentAge={age}
              />
              <AgeItemComponent
                setAge={setAge}
                ageItem={"12-15"}
                currentAge={age}
              />
              <AgeItemComponent
                setAge={setAge}
                ageItem={"+15"}
                currentAge={age}
              />
            </Row>
          </CenterStyled>
        </SpaceStyle>
        <SpaceStyle top={10} >
          <SpaceStyle bottom={10}>
            <TextInput placeholder="عنوان را وارد کنید"  onChangeText={(e) => {
                console.log(e)
                setTitle(e);
              }} placeholderTextColor={'gray'} style={{width:'100%',color:"white",paddingHorizontal:8,borderRadius:8,marginBottom:8,fontFamily:"vazir",backgroundColor:"#1c1c1c"}} numberOfLines={2} multiline/>
           
          </SpaceStyle>
        </SpaceStyle>

        <SpaceStyle  bottom={20}>
        <TextInput placeholder="توضیحات را وارد کنید"   onChangeText={(e) => {
          console.log(e)
              setDescription(e);
            }} placeholderTextColor={'gray'} style={{width:'100%',color:"white",paddingHorizontal:8,borderRadius:8,marginBottom:8,fontFamily:"vazir",backgroundColor:"#1c1c1c",alignItems:"flex-end",justifyContent:"flex-end"}} numberOfLines={4}  multiline/>
          
        </SpaceStyle>
        <TouchableOpacity
        borderRadius={10}
        icon={
          <Icon
            style={{ width: 20, height: 20 }} 
            dark={require("../../../assets/icons/paint.png")}
            light={require("../../../assets/icons/Light/paint.png")}
          />
        }
        style={{width:"100%",alignItems:"center",justifyContent:"center",paddingVertical:10,marginBottom:18,backgroundColor:"#675cdf",borderRadius:10}}
        onPress={() =>  sendData()}
      >
        <Text style={{color:"white",fontFamily:'vazir',}}>
        نقاشی خود را ثبت کنید

        </Text>
      </TouchableOpacity>
      </ScrollView>
  );
};
export default PaintPage;
