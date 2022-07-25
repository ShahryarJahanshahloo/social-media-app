import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from './redux/rootReducer'

const container = document.getElementById('root')
const store = createStore(rootReducer)

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
