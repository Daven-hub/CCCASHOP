import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/categorieService'

const initialState = {
  categories: [],
  categorieId: null,
  // registerSuccess: false,
  categorieStatus: 'idle',
  categorieError: null
}

export const createCateg = createAsyncThunk(
  'Categorie/create',
  async (datas, thunkAPI) => {
    try {
      const response = await userService.createCategorie(datas)
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

export const updateCateg = createAsyncThunk(
  'Categorie/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await userService.updateCategorie(id, datas)
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

export const getAllCateg = createAsyncThunk(
  'categorie/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getAllCategories()
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

export const getCategById = createAsyncThunk(
  'categorie/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getCategorieId(id)
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

export const deleteCateg = createAsyncThunk(
  'categorie/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.deleteCategorieId(id)
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

export const categorieSlice = createSlice({
  name: 'categorie',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createCateg.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(createCateg.fulfilled, (state, action) => {
        state.categorieStatus = 'success'
        state.categories.unshift(action.payload.result)
      })
      .addCase(createCateg.rejected, (state, action) => {
        state.categorieStatus = 'success'
        state.categorieError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateCateg.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(updateCateg.fulfilled, (state, action) => {
        state.categorieStatus = 'success'
        const updated = action.payload.result
        const index = state.categories.findIndex(
          us => us?.idcategorie === updated?.idcategorie
        )
        if (index !== -1) {
          const existing = state.categories[index]
          state.categories[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateCateg.rejected, (state, action) => {
        state.categorieStatus = 'error'
        state.categorieError = action.payload?.error || 'Modification échouée'
      })
      .addCase(getAllCateg.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(getAllCateg.fulfilled, (state, action) => {
        state.categorieStatus = 'success'
        state.categories = action.payload
      })
      .addCase(getAllCateg.rejected, (state, action) => {
        state.categorieStatus = 'error'
        state.categorieError = action.payload 
      })
      .addCase(getCategById.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(getCategById.fulfilled, (state, action) => {
        state.categorieStatus = 'success'
        state.categorieId = action.payload
      })
      .addCase(getCategById.rejected, (state, action) => {
        state.categorieStatus = 'error'
        state.categorieError =
          action.payload || "Impossible de charger la catégorie"
      })
      .addCase(deleteCateg.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(deleteCateg.fulfilled, (state, action) => {
        state.categorieStatus = 'success'
        state.categories = state.categories.filter(post => post.idcategorie !== action.payload.id)
      })
      .addCase(deleteCateg.rejected, (state, action) => {
        state.categorieStatus = 'error'
        state.categorieError = action.payload || 'Suppression échouée'
      })
  }
})

export const { reset } = categorieSlice.actions
export default categorieSlice.reducer
