import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from '../../services/variantValueService.js'

const initialState = {
  variantValues: [],
  variantValueId: null,
  // registerSuccess: false,
  variantValueStatus: 'idle',
  variantValueError: null
}

export const createVariantValue = createAsyncThunk(
  'variantValue/create',
  async (datas, thunkAPI) => {
    try {
      const response = await dataService.createVariantValue(datas)
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

export const updateVariantValue = createAsyncThunk(
  'variantValue/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await dataService.updateVariantValue(id, datas)
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

export const getAllVariantValues = createAsyncThunk(
  'variantValue/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getAllVariantValues()
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

export const getVariantValueById = createAsyncThunk(
  'variantValue/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getVariantValueId(id)
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

export const deleteVariantValue = createAsyncThunk(
  'variantValue/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.deleteVariantValueId(id)
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

export const variantValueSlice = createSlice({
  name: 'variantValue',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createVariantValue.pending, state => {
        state.variantValueStatus = 'loading'
      })
      .addCase(createVariantValue.fulfilled, (state, action) => {
        state.variantValueStatus = 'success'
        state.variantValues.unshift(action.payload.result)
      })
      .addCase(createVariantValue.rejected, (state, action) => {
        state.variantValueStatus = 'success'
        state.variantValueError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateVariantValue.pending, state => {
        state.variantValueStatus = 'loading'
      })
      .addCase(updateVariantValue.fulfilled, (state, action) => {
        state.variantValueStatus = 'success'
        const updated = action.payload.result
        const index = state.variantValues.findIndex(
          us => us?.idValue === updated?.idValue
        )
        if (index !== -1) {
          const existing = state.variantValues[index]
          state.variantValues[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateVariantValue.rejected, (state, action) => {
        state.variantValueStatus = 'error'
        state.variantValueError = action.payload?.error || 'Modification échouée'
      })
      .addCase(getAllVariantValues.pending, state => {
        state.variantValueStatus = 'loading'
      })
      .addCase(getAllVariantValues.fulfilled, (state, action) => {
        state.variantValueStatus = 'success'
        state.variantValues = action.payload
      })
      .addCase(getAllVariantValues.rejected, (state, action) => {
        state.variantValueStatus = 'error'
        state.variantValueError = action.payload 
      })
      .addCase(getVariantValueById.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(getVariantValueById.fulfilled, (state, action) => {
        state.variantValueStatus = 'success'
        state.variantValueId = action.payload
      })
      .addCase(getVariantValueById.rejected, (state, action) => {
        state.variantValueStatus = 'error'
        state.variantValueError =
          action.payload || "Impossible de charger la catégorie"
      })
      .addCase(deleteVariantValue.pending, state => {
        state.variantValueStatus = 'loading'
      })
      .addCase(deleteVariantValue.fulfilled, (state, action) => {
        state.variantValueStatus = 'success'
        state.variantValues = state.variantValues.filter(post => post.idValue !== action.payload.id)
      })
      .addCase(deleteVariantValue.rejected, (state, action) => {
        state.variantValueStatus = 'error'
        state.variantValueError = action.payload || 'Suppression échouée'
      })
  }
})

export const { reset } = variantValueSlice.actions
export default variantValueSlice.reducer
