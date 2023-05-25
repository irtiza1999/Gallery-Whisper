import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import store from './store.js'
import {Provider} from 'react-redux'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CategoryScreen from './screens/CategoryScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import ShippingScreen from './screens/ShippingScreen.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/:category' element={<CategoryScreen />} />
      <Route path='' element={<PrivateRoute/>}> <Route path='/profile' element={<ProfileScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/shipping' element={<ShippingScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/payment' element={<PaymentScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/placeorder' element={<PlaceOrderScreen />} /> </Route>
      <Route path='' element={<PrivateRoute/>}> <Route path='/order/:id' element={<OrderScreen />} /> </Route>

    </Route> 
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
)
