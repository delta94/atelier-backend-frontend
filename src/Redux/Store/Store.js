import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from 'redux'
// import { persistStore, autoRehydrate} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../Reducers';

const persistConfig = {
  key: 'refresh_aesthetic',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = compose(applyMiddleware(thunk))(createStore)(persistedReducer),
    persistor = persistStore(store),
    coustomStore = createStore(rootReducer, applyMiddleware(thunk))
  return { store, persistor, coustomStore }
}