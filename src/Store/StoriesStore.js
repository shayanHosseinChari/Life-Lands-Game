import {createStore} from 'redux'
const StoriesReducer = (state=[],action)=>{
    switch(action.type){
        case "ADD_STORY":
            return [...action.payload]
        default:
            return state
    }
}



export const StoriesStore = createStore(StoriesReducer)