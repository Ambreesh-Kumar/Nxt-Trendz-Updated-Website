import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = itemId => {
    const {cartList} = this.state
    const removedItem = cartList.find(item => item.id === itemId)
    const filteredItemList = cartList.filter(item => item.id !== removedItem.id)
    this.setState({cartList: filteredItemList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = itemId => {
    const {cartList} = this.state
    const incrementedCartList = cartList.map(item => {
      if (itemId === item.id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    this.setState({cartList: incrementedCartList})
  }

  decrementCartItemQuantity = itemId => {
    const {cartList} = this.state
    const decrementedItem = cartList.find(item => item.id === itemId)
    if (decrementedItem.quantity === 1) {
      this.removeCartItem(itemId)
    } else {
      const decrementedCartList = cartList.map(item => {
        if (itemId === item.id) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      this.setState({cartList: decrementedCartList})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isItemExist = cartList.find(item => item.id === product.id)
    if (isItemExist !== undefined) {
      const newCartList = cartList.map(item => {
        if (item.id === product.id) {
          return {...item, quantity: item.quantity + product.quantity}
        }
        return item
      })
      this.setState({cartList: newCartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
