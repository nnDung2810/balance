import {createAsyncThunk} from "@reduxjs/toolkit";
import {API, routerLinks} from "@utils";
import Action from '../action'

const action = new Action('UserRole');
export default {
 ...action,
  getPermission: createAsyncThunk(action.name + '/permission', async () => API.get(`${routerLinks(action.name, 'api')}/permission`)),
};
