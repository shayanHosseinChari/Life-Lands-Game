import * as ClipBoard from 'expo-clipboard'
import { OpenToast } from '../src/components/share/OpenToast'

const CopyToClipBoard = (text,popUpText)=>{
    ClipBoard.setStringAsync(text)
    OpenToast("کپی شد",popUpText,"success")
}

export default CopyToClipBoard