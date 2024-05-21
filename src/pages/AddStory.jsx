
import { CameraView ,useCameraPermissions}  from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { ImageEditor } from "expo-image-editor";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/core';



export default function AddStory() {
  const [type, setType] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation()
  const CamRef = useRef(null)
  const [photo,setPhoto] = useState()
  const [editorVisible,setEditorVisible] = useState(false)

  const SelectFile = async()=>{
    let result = await DocumentPicker.getDocumentAsync({
        type:["image/*","video/*"],
        copyToCacheDirectory:true,
        multiple:false
      });
      console.log(result.assets[0])
      if(result.canceled == true){
        return
      }else{
        if(result.assets[0].mimeType == "video/mp4"){
          navigation.navigate('See Story',{data: {uri: result.assets[0].uri,type:"video",department: "social_story"}})


        }else{
          setPhoto(result.assets[0].uri)
          setEditorVisible(true)
        }
        
      }
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.container,{
        paddingHorizontal: RFPercentage(2)
      }]}>
        <Text style={{ textAlign: 'center',fontFamily:'vazir',color:"white" }}>لطفا دسترسی دوربین را برای گرفتن استوری فعال کنید</Text>
        <TouchableOpacity style={{width:"100%",height: 45,borderRadius:10,marginTop: 10,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(188, 0, 255, 1)"}} onPress={requestPermission} title="grant permission" >
          <Text style={{color:"white",fontFamily:'vazir'}}>فعال کردن دسترسی</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

  function toggleCameraType() {
    setType(current => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
        
      <CameraView style={styles.camera} facing={type}  ref={CamRef} 
      
      >
        <View style={{width:'100%',justifyContent:"flex-start",flexDirection:'row',padding:10}}>
            <TouchableOpacity onPress={SelectFile}>
                    <Entypo name='images'  color={'white'} size={RFPercentage(4)}/>
            </TouchableOpacity>

        </View>
        <ImageEditor
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={photo}
        
        
        lockAspectRatio={true}
        minimumCropDimensions={{
          width: 600,
          height: 100,
        }}
        onEditingComplete={async(result) => {
          
          
          navigation.navigate('See Story',{data: {uri: result.uri,type:"image",department: "social_story"}})
          
        
         
          
        
        }}
        mode="full"
      />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=> toggleCameraType()}>
            <Feather name='rotate-cw' color={'white'} size={RFPercentage(4)}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,{width: 60,height: 60,borderRadius: 100,backgroundColor:"white"}]} onPress={async()=>{
            let photo = await CamRef.current.takePictureAsync();
            setPhoto(photo.uri)
            setEditorVisible(true)
            console.log(photo);
          }}>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{
            navigation.navigate('Home')
          }}>
            <AntDesign name='close' color={'white'} size={RFPercentage(4)}/>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  camera: {
    flex: 1,
    justifyContent:"space-between",
   
  },
  buttonContainer: {
    width:"100%",
    
    flexDirection: 'row',
    justifyContent:'space-around',
    padding:10,
    backgroundColor: 'black',
    
  },
  button: {
    
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent:"center",
    alignItems:"center"
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});