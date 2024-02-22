export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders',{
      method: "POST",
      body: JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }); 
}

export function fetchAllOrderByUserId(){
  return new Promise(async(resolve) => {
    const response = await fetch('http://localhost:8080/orders/mine');
    const data = await response.json();
    resolve({data})
  });
}

export function fetchAllOrders(){
  return new Promise(async(resolve) => {
    const response = await fetch('http://localhost:8080/orders/admin');
    const data = await response.json();
    resolve({data})
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('/orders/'+order.id,{
      method: "PATCH",
      body: JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }); 
}
