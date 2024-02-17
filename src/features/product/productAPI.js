
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('/products')
    const data = await response.json()
    resolve({data})
  });
}


export function fetchProductsByFilters(filter,sort) {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    //TODO: support multiple values to filter at a time
    //TODO: Server will filter the deleted products in case on non-admins
  let queryString = '';
  for(let key in filter){
      const categoryValues = filter[key];
      if(categoryValues.length){
        const lastcategoryValue = categoryValues[categoryValues.length-1]
        queryString += `${key}=${lastcategoryValue}&`
    }
  }
  for(let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }
  console.log(queryString)
  return new Promise(async (resolve) => {
    const response = await fetch('/products?'+queryString)
    const data = await response.json()
    resolve({data})
  });
}


export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('/brands')
    const data = await response.json()
    resolve({data})
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('/categories')
    const data = await response.json()
    resolve({data})
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/'+id)
    const data = await response.json()
    resolve({data})
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/',{
      method: 'POST',
      body: JSON.stringify(product),
      headers: {'content-type': 'application/json'},
    })
    const data = await response.json()
    resolve({data})
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/'+ update.id,{
      method: "PATCH",
      body: JSON.stringify(update),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }); 
}