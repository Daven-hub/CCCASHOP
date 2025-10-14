import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import seviceData from '../../services/vendeurService';

const initialState = {
  vendeurs:[],
  vendeurId:null,
  vendeurStatus: "idle",
  vendeurError: null,
};


export const updateVendor = createAsyncThunk (
  'vendor/update',
  async ({id,datas}, thunkAPI) => {
    try {
          const response= await seviceData.updateVendeur (id,datas);
          if (!response.success) {
            return thunkAPI.rejectWithValue(response.error);
          }else{
            return response;
          }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString ();
      return thunkAPI.rejectWithValue (message);
    }
  }
);

export const getAllVendor = createAsyncThunk (
  'vendor/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await seviceData.getAllVendeurs ();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString ();
      return thunkAPI.rejectWithValue (message);
    }
  }
);

export const getVendorById = createAsyncThunk (
  'vendor/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await seviceData.getVendeurId (id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString ();
      return thunkAPI.rejectWithValue (message);
    }
  }
);

export const deleteVendor = createAsyncThunk (
  'vendor/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await seviceData.deleteVendeurId (id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString ();
      return thunkAPI.rejectWithValue (message);
    }
  }
);

export const vendeurSlice = createSlice ({
  name: 'vendeur',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase (updateVendor.pending, state => {
        state.userStatus= "loading";
      })
      .addCase (updateVendor.fulfilled, (state, action) => {
        state.vendeurStatus= "success";
        const updated = action.payload.result;
        const index = state.vendeurs.findIndex(us => us?.id === updated?.id);
        if (index !== -1) {
          const existing = state.vendeurs[index];
          state.vendeurs[index] = {
            ...existing,
            ...updated, 
            created_at: existing.created_at 
          };
        }
      })
      .addCase (updateVendor.rejected, (state, action) => {
        state.vendeurStatus= "error";
        state.vendeurError = action.payload || "Modification échouée";
      })
      .addCase (getAllVendor.pending, state => {
        state.vendeurStatus= "loading";
      })
      .addCase (getAllVendor.fulfilled, (state, action) => {
        state.vendeurStatus= "success";
        state.vendeurs = action.payload;
      })
      .addCase (getAllVendor.rejected, (state, action) => {
        state.vendeurStatus= "error";
        state.vendeurError = action.payload;
      })
      .addCase (getVendorById.pending, state => {
        state.vendeurStatus= "loading";
      })
      .addCase (getVendorById.fulfilled, (state, action) => {
        state.vendeurStatus= "success";
        state.vendeurId = action.payload;
      })
      .addCase (getVendorById.rejected, (state, action) => {
        state.vendeurStatus= "error";
        state.vendeurError = action.payload;
      })
      .addCase (deleteVendor.pending, state => {
        state.vendeurStatus= "loading";
      })
      .addCase (deleteVendor.fulfilled, (state, action) => {
        state.vendeurStatus = "success";
      state.vendeurs = state.vendeurs.filter((post) => post.id !== action.payload.id);
      })
      .addCase (deleteVendor.rejected, (state, action) => {
        state.vendeurStatus= "error";
        state.vendeurError = action.payload || "Suppression échouée";
      })
  },
});

export const {reset} = vendeurSlice.actions;
export default vendeurSlice.reducer;
