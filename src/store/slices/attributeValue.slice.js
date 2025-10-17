import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from '../../services/attributeValueService.js'

const initialState = {
  attributeValues: [],
  attributeValueId: null,
  // registerSuccess: false,
  attributeValueStatus: 'idle',
  attributeValueError: null
}

export const createAttrValue = createAsyncThunk(
  'attributeValue/create',
  async (datas, thunkAPI) => {
    try {
      const response = await dataService.createAttributeValue(datas)
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

export const updateAttrValue = createAsyncThunk(
  'attributeValue/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await dataService.updateAttributeValue(id, datas)
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

export const getAllAttrValues = createAsyncThunk(
  'attributeValue/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getAllAttributeValues()
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

export const getAttrValueById = createAsyncThunk(
  'attributeValue/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getAttributeValueId(id)
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

export const deleteAttrValue = createAsyncThunk(
  'attributeValue/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.deleteAttributeValueId(id)
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

export const attributeValueSlice = createSlice({
  name: 'attributeValue',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createAttrValue.pending, state => {
        state.attributeValueStatus = 'loading'
      })
      .addCase(createAttrValue.fulfilled, (state, action) => {
        state.attributeValueStatus = 'success'
        state.attributeValues.unshift(action.payload.result)
      })
      .addCase(createAttrValue.rejected, (state, action) => {
        state.attributeValueStatus = 'success'
        state.attributeValueError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateAttrValue.pending, state => {
        state.attributeValueStatus = 'loading'
      })
      .addCase(updateAttrValue.fulfilled, (state, action) => {
        state.attributeValueStatus = 'success'
        const updated = action.payload.result
        const index = state.attributeValues.findIndex(
          us => us?.idValue === updated?.idValue
        )
        if (index !== -1) {
          const existing = state.attributeValues[index]
          state.attributeValues[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateAttrValue.rejected, (state, action) => {
        state.attributeValueStatus = 'error'
        state.attributeValueError = action.payload?.error || 'Modification échouée'
      })
      .addCase(getAllAttrValues.pending, state => {
        state.attributeValueStatus = 'loading'
      })
      .addCase(getAllAttrValues.fulfilled, (state, action) => {
        state.attributeValueStatus = 'success'
        state.attributeValues = action.payload
      })
      .addCase(getAllAttrValues.rejected, (state, action) => {
        state.attributeValueStatus = 'error'
        state.attributeValueError = action.payload 
      })
      .addCase(getAttrValueById.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(getAttrValueById.fulfilled, (state, action) => {
        state.attributeValueStatus = 'success'
        state.attributeValueId = action.payload
      })
      .addCase(getAttrValueById.rejected, (state, action) => {
        state.attributeValueStatus = 'error'
        state.attributeValueError =
          action.payload || "Impossible de charger la catégorie"
      })
      .addCase(deleteAttrValue.pending, state => {
        state.attributeValueStatus = 'loading'
      })
      .addCase(deleteAttrValue.fulfilled, (state, action) => {
        state.attributeValueStatus = 'success'
        state.attributeValues = state.attributeValues.filter(post => post.idValue !== action.payload.id)
      })
      .addCase(deleteAttrValue.rejected, (state, action) => {
        state.attributeValueStatus = 'error'
        state.attributeValueError = action.payload || 'Suppression échouée'
      })
  }
})

export const { reset } = attributeValueSlice.actions
export default attributeValueSlice.reducer
