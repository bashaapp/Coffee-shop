import React, {useReducer, useContext,createContext} from 'react';
import { ProductData } from '../constants/dummyData';


const CartStateContext = createContext();
const CartDispatchContext = createContext();


const initialState = {
  
  products: ProductData,
    cart: [],
    cartItem
  };
 
const reducer = (state = initialState, action)=>{
    switch(action.type){
        case 'ADD':
          let found = false;
          let cartItem;
          for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id == cartItem.id) {
              found = true;
              let size = false;
              for (let j = 0; j < state.cart[i].prices.length; j++) {
                if (
                  state.cart[i].prices[j].size == cartItem.prices[0].size
                ) {
                  size = true;
                  state.cart[i].prices[j].quantity++;
                  break;
                }
              }
              if (size == false) {
                state.cart[i].prices.push(cartItem.prices[0]);
              }
              state.cart[i].prices.sort((a, b) => {
                if (a.size > b.size) {
                  return -1;
                }
                if (a.size < b.size) {
                  return 1;
                }
                return 0;
              });
              break;
            }
          }
          if (found == false) {
            state.cart.push(cartItem);
          }
           
        case 'DELETE':
        return {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload.id),
          };
       
        case 'INCREASE':
          for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id == id) {
              for (let j = 0; j < state.cart[i].prices.length; j++) {
                if (state.cart[i].prices[j].size == size) {
                  state.cart[i].prices[j].quantity++;
                  break;
                }
              }
            }
          }
        
        case 'DECREASE':
          for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].id == id) {
              for (let j = 0; j < state.cart[i].prices.length; j++) {
                if (state.cart[i].prices[j].size == size) {
                  if (state.cart[i].prices.length > 1) {
                    if (state.cart[i].prices[j].quantity > 1) {
                      state.cart[i].prices[j].quantity--;
                    } else {
                      state.cart[i].prices.splice(j, 1);
                    }
                  } else {
                    if (state.cart[i].prices[j].quantity > 1) {
                      state.cart[i].prices[j].quantity--;
                    } else {
                      state.cart.splice(i, 1);
                    }
                  }
                  break;
                }
              }
            }
          }
              
              
        case 'CLEAR':
              return {cart :[]}
           
        default:
            throw new Error(`unknow action.${action.type}`)
    }

}

export const CartProvider =({children})=>{
    const [state, dispatch] = useReducer(reducer,initialState)
    return(
        <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>

        </CartDispatchContext.Provider>
    )
}

export const useCart = ()=>useContext(CartStateContext);
export const useDispatch =()=> useContext(CartDispatchContext);