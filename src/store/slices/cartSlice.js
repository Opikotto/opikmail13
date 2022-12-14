import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
     name:'cart',
     initialState: {
          cartItems:[]
     },
     reducers: {
          addItem:(state,action) => {
               if(state.cartItems.length ===0) {
                    let payloadItem = {
                        ...action.payload,
                        quantity:1,
                        totalPrice:action.payload.price,
                    };
                  state.cartItems.push(payloadItem)
               } else {
                    let isAdd = state.cartItems.findIndex((item) => item.id === action.payload.id)
                   if(isAdd > - 1) {
                    let cartItem = state.cartItems.map((item) => {
                        if(item.id === action.payload.id) {
                              let quantity = item.quantity + 1
                              let totalPrice = quantity + item.price
                              return {
                                   ...item,
                                   quantity,
                                   totalPrice,
                              };
                        } else {
                         return item
                        }
                    });
                    state.cartItems = cartItem
                   }else {
                    let pItem = {
                         ...action.payload,
                         quantity: 1,
                         totalPrice: action.payload.price,
                    };
                    state.cartItems.push(pItem)
                   }
               }
          },
          removeItem: (state, action) => {
			let isAdded = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			);
			if (isAdded > -1) {
				if (action.payload.quantity <= 1) {
					state.cartItems = state.cartItems.filter(
						(item) => item.id !== action.payload.id
					);
				} else {
					let cItems = state.cartItems.map((item) => {
						if (item.id === action.payload.id) {
							let quantity = item.quantity - 1;
							let totalPrice = quantity * item.price;
							return {
								...item,
								quantity,
								totalPrice,
							};
						} else {
							return item;
						}
					});
					state.cartItems = cItems;
				}
			}
		},
     }
})

export const {addItem,removeItem} = cartSlice.actions;
export default cartSlice.reducer;
