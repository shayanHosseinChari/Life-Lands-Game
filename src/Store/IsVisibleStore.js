import { createStore } from "redux"

const reducer = (state=0,action)=>{
    switch(action.type){
        case "SHOW":
            return 1
        case "HIDE":
            return 0
        default :
            return state

    }
}
const IsVisible  = createStore(reducer)

export default IsVisible