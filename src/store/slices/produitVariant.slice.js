import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from '../../services/produitVariantService.js'

const initialState = {
  produitVariants: [],
  produitVariantId: null,
  // registerSuccess: false,
  produitVariantStatus: 'idle',
  produitVariantError: null
}

export const createProduitVariant = createAsyncThunk(
  'produitVariant/create',
  async (datas, thunkAPI) => {
    try {
      const response = await dataService.createProduitV(datas)
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

export const updateProduitVariant = createAsyncThunk(
  'produitVariant/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await dataService.updateProduitV(id, datas)
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

export const getAllProduitVariants = createAsyncThunk(
  'produitVariant/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getAllProduitVs()
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

export const getProduitVariantId = createAsyncThunk(
  'produitVariant/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getProduitVId(id)
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

export const deleteProduitVariant = createAsyncThunk(
  'produitVariant/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.deleteProduitVId(id)
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

export const produitVariantSlice = createSlice({
  name: 'produitVariant',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createProduitVariant.pending, state => {
        state.produitVariantStatus = 'loading'
      })
      .addCase(createProduitVariant.fulfilled, (state, action) => {
        state.produitVariantStatus = 'success'
        state.produitVariants.unshift(action.payload.result)
      })
      .addCase(createProduitVariant.rejected, (state, action) => {
        state.produitVariantStatus = 'success'
        state.produitVariantError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateProduitVariant.pending, state => {
        state.produitVariantStatus = 'loading'
      })
      .addCase(updateProduitVariant.fulfilled, (state, action) => {
        state.produitVariantStatus = 'success'
        const updated = action.payload.result
        const index = state.produitVariants.findIndex(
          us => us?.idVariant === updated?.idVariant
        )
        if (index !== -1) {
          const existing = state.produitVariants[index]
          state.produitVariants[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateProduitVariant.rejected, (state, action) => {
        state.produitVariantStatus = 'error'
        state.produitVariantError = action.payload?.error || 'Modification échouée'
      })
      .addCase(getAllProduitVariants.pending, state => {
        state.produitVariantStatus = 'loading'
      })
      .addCase(getAllProduitVariants.fulfilled, (state, action) => {
        state.produitVariantStatus = 'success'
        state.produitVariants = action.payload
      })
      .addCase(getAllProduitVariants.rejected, (state, action) => {
        state.produitVariantStatus = 'error'
        state.produitVariantError = action.payload 
      })
      .addCase(getProduitVariantId.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(getProduitVariantId.fulfilled, (state, action) => {
        state.produitVariantStatus = 'success'
        state.produitVariantId = action.payload
      })
      .addCase(getProduitVariantId.rejected, (state, action) => {
        state.produitVariantStatus = 'error'
        state.produitVariantError = action.payload
      })
      .addCase(deleteProduitVariant.pending, state => {
        state.produitVariantStatus = 'loading'
      })
      .addCase(deleteProduitVariant.fulfilled, (state, action) => {
        state.produitVariantStatus = 'success'
        state.produitVariants = state.produitVariants.filter(post => post.idVariant !== action.payload.id)
      })
      .addCase(deleteProduitVariant.rejected, (state, action) => {
        state.produitVariantStatus = 'error'
        state.produitVariantError = action.payload
      })
  }
})

export const { reset } = produitVariantSlice.actions
export default produitVariantSlice.reducer
