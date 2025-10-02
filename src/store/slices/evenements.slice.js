import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EvenementsService from '../../services/evenementsService';

const initialState = {
  Evenements: [],
  EvenementId: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createEvenement = createAsyncThunk(
  'Evenement/create',
  async (data, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await EvenementsService.createEvenement(data);
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

export const getAllEvenement = createAsyncThunk(
  'Evenement/getAll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await EvenementsService.getAllEvenement();
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

export const updateEvenement = createAsyncThunk(
  'Evenement/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await EvenementsService.updateEvenement(data,token);
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

export const getEvenementById = createAsyncThunk(
  'Evenement/id',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await EvenementsService.getEvenementById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const DeleteEvenement = createAsyncThunk(
  'Evenement/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await EvenementsService.DeleteEvenement(id);
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

export const EvenementSlice = createSlice({
  name: 'evenements',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createEvenement.pending, state => {
        state.isLoading = true;
      })
      .addCase(createEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Evenements.unshift(action.payload.result);
      })
      .addCase(createEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllEvenement.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        state.Evenements = action.payload.result;
      })
      .addCase(getAllEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateEvenement.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.region = action.payload;
      })
      .addCase(updateEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEvenementById.pending, state => {
        state.isLoading = true;
      })
      .addCase(getEvenementById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.EvenementId = action.payload.result;
      })
      .addCase(getEvenementById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(DeleteEvenement.pending, state => {
        state.isLoading = true;
      })
      .addCase(DeleteEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Evenements = state.Evenements.filter(
          goal => goal.id !== action.payload.result.id
        );
      })
      .addCase(DeleteEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = EvenementSlice.actions;
export default EvenementSlice.reducer;
