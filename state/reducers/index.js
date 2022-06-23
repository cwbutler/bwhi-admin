import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import notifications from './notifications'
import facts from './facts'
import schools from './schools'

export default combineReducers({ auth, notifications, facts, schools })