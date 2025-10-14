import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import usersReducer from './slices/user.slice';
import vendeurReducer from './slices/vendeur.slice';
// import RevueReducer from './slices/revue.slice';
import ActualiteReducer from './slices/actualites.slice';
// import EvenementsReducer from './slices/evenements.slice';

export const store = configureStore ({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    vendeur: vendeurReducer,
    // revue: RevueReducer,
    actualites: ActualiteReducer,
    // evenements: EvenementsReducer,
  },
  devTools: true,
});
