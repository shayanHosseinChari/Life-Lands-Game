import { createStore } from "redux"

const reducer = (state={},action)=>{
    switch(action.type){
        case "INSERT":
            return action.payload
        default :
            return state

    }
}
const CurrentCommentStore  = createStore(reducer)

export default CurrentCommentStore