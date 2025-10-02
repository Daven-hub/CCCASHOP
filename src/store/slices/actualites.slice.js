import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ActualitesService from '../../services/actualitesService';

const initialState = {
  Actualites: [],
  ActualiteId: {},
  isError: null,
  isStatut:"idle",
  message: '',
};

// Create new Villes
export const createActualite= createAsyncThunk(
  'Actualites/create',
  async (data, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await ActualitesService.createActualite(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user Villess
export const getAllActualite = createAsyncThunk(
  'Actualite/getAll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await ActualitesService.getAllActualite();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateActualite = createAsyncThunk(
  'Actualite/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ActualitesService.updateActualite(data,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user Villess
export const getActualiteById = createAsyncThunk(
  'Actualite/id',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await ActualitesService.getActualiteById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user Villes
export const deleteActualite = createAsyncThunk(
  'Actualite/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await ActualitesService.DeleteActualite(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ActualiteSlice = createSlice({
  name: 'actualites',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createActualite.pending, state => {
        state.isStatut = "loading";
      })
      .addCase(createActualite.fulfilled, (state, action) => {
        state.isStatut = "success";
        state.Actualites.unshift(action.payload?.data);
      })
      .addCase(createActualite.rejected, (state, action) => {
        state.isStatut = "error";
        state.isError = action.payload.message;
        state.message = action.payload.message;
      })
      .addCase(getAllActualite.pending, state => {
        state.isStatut = "loading";
      })
      .addCase(getAllActualite.fulfilled, (state, action) => {
        state.isStatut = "success";
        // state.isSuccess = true;
        state.Actualites = action.payload.data;
      })
      .addCase(getAllActualite.rejected, (state, action) => {
        state.isStatut = "error";
        state.message = action.payload.message;
      })
      .addCase(updateActualite.pending, state => {
        state.isStatut = "loading";
      })
      .addCase(updateActualite.fulfilled, (state, action) => {
        state.isStatut = "success";
        state.Actualites = action.payload;
      })
      .addCase(updateActualite.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(getActualiteById.pending, state => {
        // state.isLoading = true;
      })
      .addCase(getActualiteById.fulfilled, (state, action) => {
        // state.isStatut = "loading";
        state.ActualiteId = action.payload.data;
      })
      .addCase(getActualiteById.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(deleteActualite.pending, state => {
        state.isStatut = "loading";
      })
      .addCase(deleteActualite.fulfilled, (state, action) => {
        state.isStatut = "success";
        state.Actualites = state.Actualites.filter(
          goal => goal.id !== action.payload.id
        );
      })
      .addCase(deleteActualite.rejected, (state, action) => {
        state.isStatut = "error";
        state.isError = action.payload.message;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = ActualiteSlice.actions;
export default ActualiteSlice.reducer;
