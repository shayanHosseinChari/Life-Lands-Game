export default typeFinder = (url)=>{
    let splitedUrl = url.split('.')
    if(splitedUrl[0] == "mp4"){
        return "video"
    }else{
        return "image"
    }


}