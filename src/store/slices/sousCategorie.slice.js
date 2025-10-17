import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from '../../services/sousCategorieService'

const initialState = {
  subcategories: [],
  subcategorieId: null,
  // registerSuccess: false,
  subcategorieStatus: 'idle',
  subcategorieError: null
}

export const createSubCateg = createAsyncThunk(
  'subCategorie/create',
  async (datas, thunkAPI) => {
    try {
      const response = await dataService.createSousCategorie(datas)
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

export const updateSubCateg = createAsyncThunk(
  'subCategorie/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await dataService.updateSousCategorie(id, datas)
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

export const getAllSubCateg = createAsyncThunk(
  'subCategorie/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getAllSousCategories()
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

export const getSubCategById = createAsyncThunk(
  'subCategorie/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.getSousCategorieId(id)
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

export const deleteSubCateg = createAsyncThunk(
  'subCategorie/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await dataService.deleteSousCategorieId(id)
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

export const sousCategorieSlice = createSlice({
  name: 'souscategorie',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createSubCateg.pending, state => {
        state.subcategorieStatus = 'loading'
      })
      .addCase(createSubCateg.fulfilled, (state, action) => {
        state.subcategorieStatus = 'success'
        state.subcategories.unshift(action.payload.result)
      })
      .addCase(createSubCateg.rejected, (state, action) => {
        state.subcategorieStatus = 'success'
        state.subcategorieError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateSubCateg.pending, state => {
        state.subcategorieStatus = 'loading'
      })
      .addCase(updateSubCateg.fulfilled, (state, action) => {
        state.subcategorieStatus = 'success'
        const updated = action.payload.result
        const index = state.subcategories.findIndex(
          us => us?.idsubcateg === updated?.idsubcateg
        )
        if (index !== -1) {
          const existing = state.subcategories[index]
          state.subcategories[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateSubCateg.rejected, (state, action) => {
        state.subcategorieStatus = 'error'
        state.subcategorieError = action.payload?.error || 'Modification échouée'
      })
      .addCase(getAllSubCateg.pending, state => {
        state.subcategorieStatus = 'loading'
      })
      .addCase(getAllSubCateg.fulfilled, (state, action) => {
        state.subcategorieStatus = 'success'
        state.subcategories = action.payload
      })
      .addCase(getAllSubCateg.rejected, (state, action) => {
        state.subcategorieStatus = 'error'
        state.subcategorieError = action.payload 
      })
      .addCase(getSubCategById.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(getSubCategById.fulfilled, (state, action) => {
        state.subcategorieStatus = 'success'
        state.subcategorieId = action.payload
      })
      .addCase(getSubCategById.rejected, (state, action) => {
        state.subcategorieStatus = 'error'
        state.subcategorieError =
          action.payload || "Impossible de charger la catégorie"
      })
      .addCase(deleteSubCateg.pending, state => {
        state.subcategorieStatus = 'loading'
      })
      .addCase(deleteSubCateg.fulfilled, (state, action) => {
        state.subcategorieStatus = 'success'
        state.subcategories = state.subcategories.filter(post => post.idsubcateg !== action.payload.id)
      })
      .addCase(deleteSubCateg.rejected, (state, action) => {
        state.subcategorieStatus = 'error'
        state.subcategorieError = action.payload || 'Suppression échouée'
      })
  }
})

export const { reset } = sousCategorieSlice.actions
export default sousCategorieSlice.reducer
