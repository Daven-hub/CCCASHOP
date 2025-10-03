import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const userFromStorage= localStorage.getItem("user")


const initialState = {
  usershop: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: localStorage.getItem("token") || null,
  csrf: localStorage.getItem("csrf") || null,
  usershops:[],
  authStatus: "ndle",
  statusR:false,
  error: null,
}

export const register = createAsyncThunk (
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register (user);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString ();
      return thunkAPI.rejectWithValue (message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      const response= await authService.login(payload);
      if (!response.success) {
        return thunkAPI.rejectWithValue(response.error || "Login failed");
      }else{
        return response;
      }
    } catch (err) {
      console.log("err",err)
      const message =
        err.response?.data?.message ||
        err.message ||
        "Problem de connexion au serveur";
      return thunkAPI.rejectWithValue(message);
    }
    
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.csrf = null;
      localStorage.removeItem('token');
      localStorage.removeItem('csrf');
      localStorage.removeItem('user');
    },
  },
  extraReducers: builder => {
    builder
      .addCase (register.pending, state => {
        state.authStatus = "loading";
      })
      .addCase (register.fulfilled, (state, action) => {
        state.authStatus = "success";
        state.isSuccess = true;
        state.usershops.unshift (action.payload.result);
      })
      .addCase (register.rejected, (state, action) => {
        state.authStatus = "success";
        state.error = action.payload || action.error.message || "Erreur de connexion";
        state.message = action.payload.message;
      })
      .addCase(login.pending, (state) => {
        state.authStatus = "error";
        state.statusR=false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = "success";
        state.usershop = action.payload.user;
        state.token = action.payload.token;
        state.csrf = action.payload.csrf;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('csrf', action.payload.csrf);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        // if (action.payload && action.payload.token && action.payload.user) {
        //   state.usershop = action.payload.user;
        //   state.token = action.payload.token;
        //   state.csrf = action.payload.csrf;
      
        //   localStorage.setItem("token", action.payload.token);
        //   localStorage.setItem("csrf", action.payload.csrf);
        //   localStorage.setItem("user", JSON.stringify(action.payload.user));
        // } else {

        //   state.authStatus = "error";
        //   state.error = action.payload?.error || "Réponse invalide du serveur";
        // }
      })
      .addCase(login.rejected, (state, action) => {
        state.authStatus = "error";
        state.error = action.payload.error || action.error.message || "Erreur de connexion";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
