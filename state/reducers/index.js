import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import notifications from './notifications'

export default combineReducers({ auth, notifications })