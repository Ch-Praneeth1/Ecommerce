
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart',{
      method: "POST",
      body: JSON.stringify(item),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }); 
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart?user='+userId)
    const data = await response.json()
    resolve({data})
  });
}


export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/cart/'+ update.id,{
      method: "PATCH",
      body: JSON.stringify(update),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }); 
}


export function deleteItemFromCart(itemid) {
  return new Promise(async (resolve) => {
    const response = await fetch('/cart/'+itemid,{
      method: "DELETE",
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data:{id:itemid}})
  }); 
}


export async function clearCart(userId) {
  return new Promise(async (resolve) => {
    const cartItems = await fetchItemsByUserId(userId)
    const Items = cartItems.data
    for(const item of Items){
      await deleteItemFromCart(item.id)
    }
    resolve({message: "Cart cleared "})
  }); 
}