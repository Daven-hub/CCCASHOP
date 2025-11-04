import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/favorisService'

const initialState = {
  favoris: [],
  favorisId: {},
  // registerSuccess: false,
  favorisStatus: 'idle',
  favorisError: null
}

export const createFavoris = createAsyncThunk(
  'favori/create',
  async (datas, thunkAPI) => {
    try {
      const response = await userService.createFavori(datas)
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

export const updateFavoris = createAsyncThunk(
  'favoris/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await userService.updateFavori(id, datas)
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

export const getAllFavoris = createAsyncThunk(
  'favoris/getAll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getAllFavoris()
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

export const getFavorisById = createAsyncThunk(
  'favoris/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getFavoriId(id)
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

export const removeFavoris = createAsyncThunk(
  'favoris/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.deleteFavoriId(id)
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

export const favoriSlice = createSlice({
  name: 'favori',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createFavoris.pending, state => {
        state.favorisStatus = 'loading'
      })
      .addCase(createFavoris.fulfilled, (state, action) => {
        state.favorisStatus = 'success'
        state.favoris.unshift(action.payload.result)
      })
      .addCase(createFavoris.rejected, (state, action) => {
        state.favorisStatus = 'success'
        state.favorisError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateFavoris.pending, state => {
        state.favorisStatus = 'loading'
      })
      .addCase(updateFavoris.fulfilled, (state, action) => {
        state.favorisStatus = 'success'
        const updated = action.payload.result
        const index = state.favoris.findIndex(
          us => us?.idFavoris === updated?.idFavoris
        )
        if (index !== -1) {
          const existing = state.favoris[index]
          state.favoris[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateFavoris.rejected, (state, action) => {
        state.favorisStatus = 'error'
        state.favorisError = action.payload?.error
      })
      .addCase(getAllFavoris.pending, state => {
        state.favoriStatus = 'loading'
      })
      .addCase(getAllFavoris.fulfilled, (state, action) => {
        state.favorisStatus = 'success'
        state.favoris = action.payload
      })
      .addCase(getAllFavoris.rejected, (state, action) => {
        state.favorisStatus = 'error'
        state.favorisError = action.payload 
      })
      .addCase(getFavorisById.pending, state => {
        state.favorisStatus = 'loading'
      })
      .addCase(getFavorisById.fulfilled, (state, action) => {
        state.favorisStatus = 'success'
        state.favorisId = action.payload
      })
      .addCase(getFavorisById.rejected, (state, action) => {
        state.favorisStatus = 'error'
        state.favorisError = action.payload
      })
      .addCase(removeFavoris.pending, state => {
        state.favorisStatus = 'loading'
      })
      .addCase(removeFavoris.fulfilled, (state, action) => {
        state.favorisStatus = 'success'
        state.favoris = state.favoris.filter(post => post.idFavoris !== action.payload.id)
      })
      .addCase(removeFavoris.rejected, (state, action) => {
        state.favorisStatus = 'error'
        state.favorisError = action.payload
      })
  }
})

export const { reset } = favoriSlice.actions
export default favoriSlice.reducer
