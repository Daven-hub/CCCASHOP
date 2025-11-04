import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/infoSupService'

const initialState = {
  infoSups: [],
  infoSupId: null,
  // registerSuccess: false,
  infoSupStatus: 'idle',
  infoSupError: null
}

export const createInfoSups = createAsyncThunk(
  'infoSup/create',
  async (datas, thunkAPI) => {
    try {
      const response = await userService.createInfoSup(datas)
      if (!response.success) {
        return thunkAPI.rejectWithValue(response.error)
      } else {
        return response
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateInfoSups = createAsyncThunk(
  'infoSups/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await userService.updateInfoSup(id, datas)
      if (!response.success) {
        return thunkAPI.rejectWithValue(response.error)
      } else {
        return response
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAllInfoSups = createAsyncThunk(
  'infoSups/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getAllInfoSups()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getInfoSupsById = createAsyncThunk(
  'infoSups/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getInfoSupId(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const removeInfoSups = createAsyncThunk(
  'infoSups/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.deleteInfoSupId(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const infoSupSlice = createSlice({
  name: 'infoSup',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createInfoSups.pending, state => {
        state.infoSupStatus = 'loading'
      })
      .addCase(createInfoSups.fulfilled, (state, action) => {
        state.infoSupStatus = 'success'
        state.infoSups.unshift(action.payload.result)
      })
      .addCase(createInfoSups.rejected, (state, action) => {
        state.infoSupStatus = 'success'
        state.infoSupError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateInfoSups.pending, state => {
        state.infoSupStatus = 'loading'
      })
      .addCase(updateInfoSups.fulfilled, (state, action) => {
        state.infoSupStatus = 'success'
        const updated = action.payload.result
        const index = state.infoSups.findIndex(
          us => us?.idInfo === updated?.idInfo
        )
        if (index !== -1) {
          const existing = state.infoSups[index]
          state.infoSups[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateInfoSups.rejected, (state, action) => {
        state.infoSupStatus = 'error'
        state.infoSupError = action.payload?.error
      })
      .addCase(getAllInfoSups.pending, state => {
        state.infoSupStatus = 'loading'
      })
      .addCase(getAllInfoSups.fulfilled, (state, action) => {
        state.infoSupStatus = 'success'
        state.infoSups = action.payload
      })
      .addCase(getAllInfoSups.rejected, (state, action) => {
        state.infoSupStatus = 'error'
        state.infoSupError = action.payload 
      })
      .addCase(getInfoSupsById.pending, state => {
        state.infoSupStatus = 'loading'
      })
      .addCase(getInfoSupsById.fulfilled, (state, action) => {
        state.infoSupStatus = 'success'
        state.infoSupId = action.payload
      })
      .addCase(getInfoSupsById.rejected, (state, action) => {
        state.infoSupStatus = 'error'
        state.infoSupError = action.payload
      })
      .addCase(removeInfoSups.pending, state => {
        state.infoSupStatus = 'loading'
      })
      .addCase(removeInfoSups.fulfilled, (state, action) => {
        state.infoSupStatus = 'success'
        state.infoSups = state.infoSups.filter(post => post.idInfo !== action.payload.id)
      })
      .addCase(removeInfoSups.rejected, (state, action) => {
        state.infoSupStatus = 'error'
        state.infoSupError = action.payload
      })
  }
})

export const { reset } = infoSupSlice.actions
export default infoSupSlice.reducer
