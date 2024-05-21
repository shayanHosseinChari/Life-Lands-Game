import {createStore} from 'redux'
import { NotifcationReducer } from '../Reducer/NotifcationReducer'

export const NotifcationStore = createStore(NotifcationReducer)