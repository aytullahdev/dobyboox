# DOBYBOX API
    link :- https://young-beach-37066.herokuapp.com
    
## Functionality and End points;
    1) /products -> return all the products
    2) /products/:id -> return single product by :id
    3) /productsby/:id -> reutrn product by supplier ( Secure with middleWare)
    4) /updates -> update a All the product attribuites (Post request)
    5) /update -> update product restock and order quantity (Post request, Secure with middleware)
    6) /products -> Delete a single product (DELETE Request with ID , Secure with MiddleWare)
    ** Add product
        1) /addproduct -> Add a single product to database (POST Request);

## User Functiionality with token
    1) /login -> provide a Valide User Token (JWT TOKEN);