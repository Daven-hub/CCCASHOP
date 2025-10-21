import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/produitServices'

const initialState = {
  produits: [],
  produitId: null,
  // registerSuccess: false,
  ProduitStatus: 'idle',
  ProduitError: null
}

export const createProduitSimple = createAsyncThunk(
  'Produit/createSimple',
  async (datas, thunkAPI) => {
    try {
      const response = await userService.createProduitS(datas)
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
export const createProduitVariant = createAsyncThunk(
  'Produit/createVariant',
  async (datas, thunkAPI) => {
    try {
      const response = await userService.createProduitV(datas)
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

export const updateProduits = createAsyncThunk(
  'Produit/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await userService.updateProduit(id, datas)
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

export const getAllProduits = createAsyncThunk(
  'Produit/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getAllproduits()
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

export const getProduitById = createAsyncThunk(
  'Produit/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getProduitId(id)
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

export const deleteProduit = createAsyncThunk(
  'Produit/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.deleteProduitId(id)
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

export const produitSlice = createSlice({
  name: 'produit',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createProduitSimple.pending, state => {
        state.ProduitStatus = 'loading'
      })
      .addCase(createProduitSimple.fulfilled, (state, action) => {
        state.ProduitStatus = 'success'
        state.produits.unshift(action.payload.result)
      })
      .addCase(createProduitSimple.rejected, (state, action) => {
        state.ProduitStatus = 'success'
        state.ProduitError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(createProduitVariant.pending, state => {
        state.ProduitStatus = 'loading'
      })
      .addCase(createProduitVariant.fulfilled, (state, action) => {
        state.ProduitStatus = 'success'
        state.produits.unshift(action.payload.result)
      })
      .addCase(createProduitVariant.rejected, (state, action) => {
        state.ProduitStatus = 'success'
        state.ProduitError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateProduits.pending, state => {
        state.ProduitStatus = 'loading'
      })
      .addCase(updateProduits.fulfilled, (state, action) => {
        state.ProduitStatus = 'success'
        const updated = action.payload.result
        const index = state.produits.findIndex(
          us => us?.idproduits === updated?.idproduits
        )
        if (index !== -1) {
          const existing = state.produits[index]
          state.produits[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateProduits.rejected, (state, action) => {
        state.ProduitStatus = 'error'
        state.ProduitError = action.payload?.error || 'Modification échouée'
      })
      .addCase(getAllProduits.pending, state => {
        state.ProduitStatus = 'loading'
      })
      .addCase(getAllProduits.fulfilled, (state, action) => {
        state.ProduitStatus = 'success'
        state.produits = action.payload
      })
      .addCase(getAllProduits.rejected, (state, action) => {
        state.ProduitStatus = 'error'
        state.ProduitError = action.payload 
      })
      .addCase(getProduitById.pending, state => {
        state.ProduitStatus = 'loading'
      })
      .addCase(getProduitById.fulfilled, (state, action) => {
        state.ProduitStatus = 'success'
        state.produitId = action.payload
      })
      .addCase(getProduitById.rejected, (state, action) => {
        state.ProduitStatus = 'error'
        state.ProduitError =
          action.payload || "Impossible de charger la catégorie"
      })
      .addCase(deleteProduit.pending, state => {
        state.ProduitStatus = 'loading'
      })
      .addCase(deleteProduit.fulfilled, (state, action) => {
        state.ProduitStatus = 'success'
        state.produits = state.produits.filter(post => post.idproduits !== action.payload.id)
      })
      .addCase(deleteProduit.rejected, (state, action) => {
        state.ProduitStatus = 'error'
        state.ProduitError = action.payload || 'Suppression échouée'
      })
  }
})

export const { reset } = produitSlice.actions
export default produitSlice.reducer
