// Write your code here
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalItem = cartList.length
      let totalAmount = 0
      cartList.forEach(item => {
        totalAmount += item.price * item.quantity
      })
      return (
        <div className="cart-summary-bg-container">
          <div className="cart_summary_main_container">
            <div>
              <h1 className="cart_summary_main_heading">
                Order Total:{' '}
                <span className="amount_span">Rs {totalAmount}/- </span>
              </h1>
              <p className="item_count_paragraph">{totalItem} Items in cart</p>
            </div>
          </div>
          <Link to="/">
            <button className="checkout_button" type="button">
              Checkout
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
