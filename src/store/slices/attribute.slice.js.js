import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from '../../services/attributeService.js'

const initialState = {
  attributes: [],
  attributeId: null,
  // registerSuccess: false,
  attributeStatus: 'idle',
  attributeError: null
}

export const createAttr = createAsyncThunk(
  'attribute/create',
  async (datas, thunkAPI) => {
    try {
      const response = await dataService.createAttribute(datas)
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

export const updateAttr = createAsyncThunk(
  'attribute/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await dataService.updateAttribute(id, datas)
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

export const getAllAttrs = createAsyncThunk(
  'attribute/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getAllAttributes()
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

export const getAttrById = createAsyncThunk(
  'attribute/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getAttributeId(id)
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

export const deleteAttr = createAsyncThunk(
  'attribute/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.deleteAttributeId(id)
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

export const attributeSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createAttr.pending, state => {
        state.attributeStatus = 'loading'
      })
      .addCase(createAttr.fulfilled, (state, action) => {
        state.attributeStatus = 'success'
        state.attributes.unshift(action.payload.result)
      })
      .addCase(createAttr.rejected, (state, action) => {
        state.attributeStatus = 'success'
        state.attributeError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateAttr.pending, state => {
        state.attributeStatus = 'loading'
      })
      .addCase(updateAttr.fulfilled, (state, action) => {
        state.attributeStatus = 'success'
        const updated = action.payload.result
        const index = state.attributes.findIndex(
          us => us?.idAttribute === updated?.idAttribute
        )
        if (index !== -1) {
          const existing = state.attributes[index]
          state.attributes[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateAttr.rejected, (state, action) => {
        state.attributeStatus = 'error'
        state.attributeError = action.payload?.error || 'Modification échouée'
      })
      .addCase(getAllAttrs.pending, state => {
        state.attributeStatus = 'loading'
      })
      .addCase(getAllAttrs.fulfilled, (state, action) => {
        state.attributeStatus = 'success'
        state.attributes = action.payload
      })
      .addCase(getAllAttrs.rejected, (state, action) => {
        state.attributeStatus = 'error'
        state.attributeError = action.payload 
      })
      .addCase(getAttrById.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(getAttrById.fulfilled, (state, action) => {
        state.attributeStatus = 'success'
        state.attributeId = action.payload
      })
      .addCase(getAttrById.rejected, (state, action) => {
        state.attributeStatus = 'error'
        state.attributeError =
          action.payload || "Impossible de charger la catégorie"
      })
      .addCase(deleteAttr.pending, state => {
        state.attributeStatus = 'loading'
      })
      .addCase(deleteAttr.fulfilled, (state, action) => {
        state.attributeStatus = 'success'
        state.attributes = state.attributes.filter(post => post.idAttribute !== action.payload.id)
      })
      .addCase(deleteAttr.rejected, (state, action) => {
        state.attributeStatus = 'error'
        state.attributeError = action.payload || 'Suppression échouée'
      })
  }
})

export const { reset } = attributeSlice.actions
export default attributeSlice.reducer
