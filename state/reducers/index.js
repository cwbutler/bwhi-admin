import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import notifications from './notifications'
import facts from './facts'
import schools from './schools'
import resources from './resources'
import schoolRequests from './schoolRequests'

export default combineReducers({ auth, notifications, facts, schools, resources, schoolRequests })