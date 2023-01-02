import React from "react";

const initialContextValues = {
  listCustomerPlates: [],
  shoppingCartModelState: false,
  removeOnePlateFromCart: () => {},
  addOnePlateToCart: () => {},
  deletePlateFromCart: () => {},
  getPlateQuantity: () => {},
  getTotalPrice: () => {}
};
const ShoppingCartContext = React.createContext(initialContextValues);

const ShoppingCartContextProvider = (props) => {
  // [{id:1, name:"pizza", quantity:4, price:200}]
  const [listCustomerPlates, getListCustomerPlates] = React.useState(
    initialContextValues.listCustomerPlates
  );
  const [shoppingCartModelState, openShoppingCartModel] = React.useState(initialContextValues.shoppingCartModelState)

  const toggleShoppingCartModel = () => {
    openShoppingCartModel(!shoppingCartModelState);
  };

  const closeShoppingCartModel = () => {
    openShoppingCartModel(false);
  };

  const getPlateQuantity = (id) => {
    // plate with current id may not exist, add ?
    const quantity = listCustomerPlates.find(plate => plate.id === id)?.quantity

    if (quantity === undefined) {
        return 0
    } else {
        return quantity
    }
  }

  const addOnePlateToCart = (id, name, price) => {
    // add plate quantity
    const quantity = getPlateQuantity(id);

    // plate not in shopping cart
    if (quantity === 0) {
      getListCustomerPlates([
        // @ts-ignore
        ...listCustomerPlates,
        { id: id, name:name, price:price, quantity: 1 },
      ]);
    } else {
      // create new list of plates with the new quantity
      getListCustomerPlates(
        // @ts-ignore
        listCustomerPlates.map(
            plate =>
            plate.id === id                               
            ? { ...plate, quantity: plate.quantity + 1 }
            : plate                                     
        ))
    }
  };

  const removeOnePlateFromCart = (id) => {
    // reduce plate quantity
    const quantity = getPlateQuantity(id);

    // reduce quantity to 0
    if (quantity === 1) {
      deletePlateFromCart(id);
    } else {
      // create new list of plates with the new quantity
      getListCustomerPlates(
        // @ts-ignore
        listCustomerPlates.map(
            plate =>
            plate.id === id                               
            ? { ...plate, quantity: plate.quantity - 1 }
            : plate                                     
        ))
    }
  };

  const deletePlateFromCart = (id) => {
    // delete plate from shopping cart
    getListCustomerPlates(
        listCustomerPlates.filter((plate) => {
            return plate.id !== id
        })
    )
  }

  const getTotalPrice = () => {
    let totalPrice = 0

    listCustomerPlates.map(plate => {
        totalPrice = totalPrice +  (plate.price * plate.quantity)
    })

    return totalPrice
  }

  let contextValues = {
    listCustomerPlates,
    shoppingCartModelState, 
    openShoppingCartModel,
    toggleShoppingCartModel,
    closeShoppingCartModel,
    getListCustomerPlates,
    getPlateQuantity,
    addOnePlateToCart,
    removeOnePlateFromCart,
    deletePlateFromCart,
    getTotalPrice,
  };
  return (
    <ShoppingCartContext.Provider value={contextValues}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartContextProvider };

