import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import notifications from './notifications'
import facts from './facts'

export default combineReducers({ auth, notifications, facts })