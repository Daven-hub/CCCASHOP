import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RevueService from '../../services/revueService';

const initialState = {
  Revues: [],
  RevueId: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new Villes
export const createRevue = createAsyncThunk(
  'Revue/create',
  async (data, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await RevueService.createRevue(data);
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
export const getAllRevue = createAsyncThunk(
  'Revue/getAll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await RevueService.getAllRevue();
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

export const updateRevue = createAsyncThunk(
  'Revue/update',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await RevueService.updateRevue(data,token);
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
export const getRevueById = createAsyncThunk(
  'Revue/id',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await RevueService.getRevueById(id);
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

// Delete user Villes
export const deleteRevue = createAsyncThunk(
  'Revue/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await RevueService.DeleteRevue(id);
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

export const RevueSlice = createSlice({
  name: 'revue',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createRevue.pending, state => {
        state.isLoading = true;
      })
      .addCase(createRevue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Revues.unshift(action.payload.result);
      })
      .addCase(createRevue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllRevue.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllRevue.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        state.Revues = action.payload.result;
      })
      .addCase(getAllRevue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRevue.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateRevue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.region = action.payload;
      })
      .addCase(updateRevue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRevueById.pending, state => {
        state.isLoading = true;
      })
      .addCase(getRevueById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.RevueId = action.payload.result;
      })
      .addCase(getRevueById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRevue.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteRevue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Revues = state.Revues.filter(
          goal => goal.id !== action.payload.result.id
        );
      })
      .addCase(deleteRevue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = RevueSlice.actions;
export default RevueSlice.reducer;
