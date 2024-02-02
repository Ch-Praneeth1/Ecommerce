
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({data})
  });
}


export function fetchProductsByFilters(filter,sort) {
    //filter = {"cateogry":"smartphone"}
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
  // console.log(queryString)
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products?'+queryString)
    const data = await response.json()
    resolve({data})
  });
}


export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({data})
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json()
    resolve({data})
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+id)
    const data = await response.json()
    resolve({data})
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/',{
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