import { createStore, applyMiddleware, combineReducers, Store } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { createLogger } from "redux-logger"

import common from "./modules/common"
import api from "./modules/api"

interface Props {
  store: Store
  persistor: any
}

const logger = createLogger({
  diff: true,
  collapsed: true
})
const middlewares = [logger, thunk]
const reducer = combineReducers({ common, api })
const persistConfig = {
  key: "root",
  storage,
  whitelist: []
}
const persistedReducer = persistReducer(persistConfig, reducer)

export default (): Props => {
  const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(...middlewares)
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
