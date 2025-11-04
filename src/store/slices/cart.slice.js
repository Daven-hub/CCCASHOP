import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../services/cartService'

const initialState = {
  carts: [],
  cartId: null,
  // registerSuccess: false,
  cartStatus: 'idle',
  cartError: null
}

export const createCarts = createAsyncThunk(
  'Cart/create',
  async (datas, thunkAPI) => {
    try {
      const response = await userService.createCart(datas)
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

export const updateCarts = createAsyncThunk(
  'Carts/update',
  async ({ id, datas }, thunkAPI) => {
    try {
      const response = await userService.updateCart(id, datas)
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

export const getAllCarts = createAsyncThunk(
  'Carts/getAlll',
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getAllCarts()
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

export const getCartsById = createAsyncThunk(
  'Carts/getById',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.getCartId(id)
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

export const removeCarts = createAsyncThunk(
  'Carts/delete',
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState ().auth.user.token;
      return await userService.deleteCartId(id)
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createCarts.pending, state => {
        state.cartStatus = 'loading'
      })
      .addCase(createCarts.fulfilled, (state, action) => {
        state.cartStatus = 'success'
        state.carts.unshift(action.payload.result)
      })
      .addCase(createCarts.rejected, (state, action) => {
        state.cartStatus = 'success'
        state.cartError = action.payload || action.error.message || 'Erreur de connexion'
      })
      .addCase(updateCarts.pending, state => {
        state.categorieStatus = 'loading'
      })
      .addCase(updateCarts.fulfilled, (state, action) => {
        state.cartStatus = 'success'
        const updated = action.payload.result
        const index = state.carts.findIndex(
          us => us?.id === updated?.id
        )
        if (index !== -1) {
          const existing = state.carts[index]
          state.carts[index] = {
            ...existing,
            ...updated
          }
        }
      })
      .addCase(updateCarts.rejected, (state, action) => {
        state.cartStatus = 'error'
        state.cartError = action.payload?.error
      })
      .addCase(getAllCarts.pending, state => {
        state.cartStatus = 'loading'
      })
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.cartStatus = 'success'
        state.carts = action.payload
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.cartStatus = 'error'
        state.cartError = action.payload 
      })
      .addCase(getCartsById.pending, state => {
        state.cartStatus = 'loading'
      })
      .addCase(getCartsById.fulfilled, (state, action) => {
        state.cartStatus = 'success'
        state.cartId = action.payload
      })
      .addCase(getCartsById.rejected, (state, action) => {
        state.cartStatus = 'error'
        state.cartError = action.payload
      })
      .addCase(removeCarts.pending, state => {
        state.cartStatus = 'loading'
      })
      .addCase(removeCarts.fulfilled, (state, action) => {
        state.cartStatus = 'success'
        state.carts = state.carts.filter(post => post.id !== action.payload.id)
      })
      .addCase(removeCarts.rejected, (state, action) => {
        state.cartStatus = 'error'
        state.cartError = action.payload
      })
  }
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer
