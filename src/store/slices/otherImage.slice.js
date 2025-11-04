import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/otherImageService'

const initialState = {
  ortherImages: [],
  ortherImageId: null,
  // registerSuccess: false,
  otherStatus: 'idle',
  otherError: null
}

export const createOtherImages = createAsyncThunk(
  'OtherImage/create',
  async (datas, thunkAPI) => {
    try {
      const response = await userService.createOtherImage(datas)
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

export const updateOtherImages = createAsyncThunk(
  'OtherImage/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await userService.updateOtherImage(id, datas)
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

export const getAllOtherImages = createAsyncThunk(
  'OtherImage/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getAllOtherImages()
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

export const getOtherImagesById = createAsyncThunk(
  'OtherImage/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getOtherImageId(id)
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

export const removeOtherImages = createAsyncThunk(
  'OtherImage/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.deleteOtherImageId(id)
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

export const otherImageSlice = createSlice({
  name: 'otherImage',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createOtherImages.pending, state => {
        state.otherStatus = 'loading'
      })
      .addCase(createOtherImages.fulfilled, (state, action) => {
        state.otherStatus = 'success'
        state.ortherImages.unshift(action.payload.result)
      })
      .addCase(createOtherImages.rejected, (state, action) => {
        state.otherStatus = 'success'
        state.otherError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateOtherImages.pending, state => {
        state.otherStatus = 'loading'
      })
      .addCase(updateOtherImages.fulfilled, (state, action) => {
        state.otherStatus = 'success'
        const updated = action.payload.result
        const index = state.ortherImages.findIndex(
          us => us?.id === updated?.id
        )
        if (index !== -1) {
          const existing = state.ortherImages[index]
          state.ortherImages[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateOtherImages.rejected, (state, action) => {
        state.otherStatus = 'error'
        state.otherError = action.payload?.error
      })
      .addCase(getAllOtherImages.pending, state => {
        state.otherStatus = 'loading'
      })
      .addCase(getAllOtherImages.fulfilled, (state, action) => {
        state.otherStatus = 'success'
        state.ortherImages = action.payload
      })
      .addCase(getAllOtherImages.rejected, (state, action) => {
        state.otherStatus = 'error'
        state.otherError = action.payload 
      })
      .addCase(getOtherImagesById.pending, state => {
        state.otherStatus = 'loading'
      })
      .addCase(getOtherImagesById.fulfilled, (state, action) => {
        state.otherStatus = 'success'
        state.ortherImageId = action.payload
      })
      .addCase(getOtherImagesById.rejected, (state, action) => {
        state.otherStatus = 'error'
        state.otherError = action.payload
      })
      .addCase(removeOtherImages.pending, state => {
        state.otherStatus = 'loading'
      })
      .addCase(removeOtherImages.fulfilled, (state, action) => {
        state.otherStatus = 'success'
        state.ortherImages = state.ortherImages.filter(post => post.id !== action.payload.id)
      })
      .addCase(removeOtherImages.rejected, (state, action) => {
        state.otherStatus = 'error'
        state.otherError = action.payload
      })
  }
})

export const { reset } = otherImageSlice.actions
export default otherImageSlice.reducer
