import { useCallback, useContext, useEffect, useState } from 'react'
import {TouchableOpacity,View,Image,ScrollView, Dimensions} from 'react-native'
import { RootContext } from '../../context/RootContext'
import { RFPercentage } from 'react-native-responsive-fontsize'
import AntDesign from 'react-native-vector-icons/AntDesign'
import InstaStory from 'react-native-insta-story';
import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import { getValueFor } from '../../appsetting/storeConfig'
import { LOAD_FILE } from '../../service/APIs'
import { getProfileService } from '../../service/UserService'
import { StoriesStore } from '../../Store/StoriesStore'
export default Story = ()=>{
    const {user} = useContext(RootContext)
    const navigation = useNavigation()
    const [userStories,setUserStories] = useState([])
    const [myStories,setMyStories] = useState(undefined)
    const [profile,setProfile] = useState()
      const mainData = []
      const mergData = ()=>{
        myStories.map(item=>{
          console.log(item,'maped')
          setUserStories(state=> [...state,item])
        })
      }
      const getProfile = async ()=>{
        const {
          data: { data: profileResponse },
        } = await getProfileService();
        console.log(profileResponse)
        setProfile(profileResponse);
      }
      useEffect(()=>{
        getProfile()
      },[])
    
      const fetchStories = useCallback(async()=>{
        console.log('start getting stories')
        await axios.get('https://lifelands.ir/api/v1/social/story',{
          headers:{
            token: getValueFor()
          }
        }).then(response=>{
          
          console.log('users stories ',response.data.data.myStories[0])
          // let s = []
          // s.push(response.data.data.myStories[0])

          // response.data.data.stories.map(story=>{
          //   s.push(story)
          // })
          
         if(response.data.data.myStories[0]){
          setMyStories(response.data.data.myStories[0])
          StoriesStore.dispatch({
            type:"ADD_STORY",
            payload:[]
          })
          StoriesStore.dispatch({
            type:"ADD_STORY",
            payload:[response.data.data.myStories[0],...response.data.data.stories]
          })
        
          setUserStories([response.data.data.myStories[0],...response.data.data.stories])

         }else{
          StoriesStore.dispatch({
            type:"ADD_STORY",
            payload:[]
          })
          StoriesStore.dispatch({
            type:"ADD_STORY",
            payload:[...response.data.data.stories]
          })
          setUserStories([...response.data.data.stories])

         }
         console.log('my stories ',myStories)
          

        })
      })
      
      useEffect(()=>{
        fetchStories()
      },[])
      
    return (
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{borderBottomWidth:1,borderBottomColor:'rgba(31, 31, 31, 1)',width: Dimensions.get('window').width,paddingHorizontal: RFPercentage(1.7),paddingBottom: 9}}>
         {
          Boolean(myStories) == false?<View style={{width: 80,height:80,marginTop:8,borderRadius:100,position:'relative'}}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Add Story')
          }} style={{backgroundColor:"#7a53ed",position:"absolute",zIndex:99,bottom:0,right:0,borderColor:"black",borderWidth:3,borderRadius:100}}>
              <AntDesign name='plus' size={RFPercentage(3)} color={'white'}/>
          </TouchableOpacity>
          {
          
          profile?<Image source={{uri: `${LOAD_FILE}${profile.profileImage}`}} style={{width:'100%',height:'100%',borderRadius: 100}} />:<Image source={require('../../../assets/def.jpg')} style={{width:'100%',height:'100%',borderRadius: 100}} />
          }
      </View>: null

         }
      {
        userStories.length? <InstaStory
        data={StoriesStore.getState()}
        duration={60}
        showAvatarText={true}
        
        
        
        avatarTextStyle={{
          color:"white",
          fontFamily:"vazir"
        }}
      
      />:null
      }  
        
        
       </ScrollView>
    )
}