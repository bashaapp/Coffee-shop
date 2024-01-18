import React, {useReducer, useContext,createContext} from 'react';
import { ProductData } from '../constants/dummyData';


const CartStateContext = createContext();
const CartDispatchContext = createContext();


const initialState = {
  
    products: ProductData,
    cart: [],
    favorites: [],
  };
 
const reducer = (state = initialState, action)=>{
    switch(action.type){
      case 'ADD':
        const newItem = { ...action.payload, qty: 1 };
        const existingItemIndex = state.cart.findIndex(
          (item) => item.id === action.payload.id && item.size === action.payload.size
        );
      
        if (existingItemIndex !== -1) {
          // Product with the same specifications is already in the cart, increment quantity
          const updatedCart = state.cart.map((item, index) =>
            index === existingItemIndex ? { ...item, qty: item.qty + 1 } : item
          );
      
          return { ...state, cart: updatedCart };
        } else {
          // Product with different specifications or not in the cart, add a new item
          return { ...state, cart: [...state.cart, newItem] };
        }
        case 'ADD_PRODUCT_TO_FAVORITE':{
          const product = action.payload;
    
          const favorited = state.favorites.find(
            (item) => item?.id === product?.id
          );
    
          if (!favorited) {
            // Not favorited, add to favorites list
            return {
              ...state,
              favorites: state.favorites.concat(product),
            };
          }
          // Otherwise return current state
          return state;
        }
    
        case 'DELETE_FAVORITE_PRODUCT':
          const { product } = action.payload; // <-- get product from payload

          const favorited = state.favorites.find(
            (item) => item?.id === product?.id
          );
          if (favorited) {
            // Favorited, remove from favorites list
            return {
              ...state,
              favorites: state.favorites.filter((item)=> item.id !== product.id)
              
            };
          }
          // Otherwise return current state
          return state;
        
        case 'DELETE':
        return {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload.id),
          };
       
        case 'INCREASE':
               const tempCart = state.cart.map((cartItem) => {
                if (cartItem.id === action.payLoad.id) {
                  return { ...cartItem, qty: cartItem.qty + 1 };
                }
                return cartItem;
              });
              return { ...state, cart: tempCart };
        
        case 'DECREASE':
                const temp = state.cart.map((cartItem) => {
                    if (cartItem.id === action.payLoad.id) {
                      return { ...cartItem, qty: cartItem.qty - 1 };
                    }
                 return cartItem;
                  })
                  .filter((cartItem) => cartItem.qty !== 0);
                return { ...state, cart: temp };
              
        case 'CLEAR':
              return {cart :[],favorites: {}}
           
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



