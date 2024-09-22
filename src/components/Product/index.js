import { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductList";

function Product(){
    const [reload , setReload] = useState(false);
    const handleReload = () =>{
        setReload(!reload);
    }
    return(
        <>
        <h2 className="text-center display-3 font-weight-bold my-4 text-primary">ĐANH SÁCH SẢN PHẨM</h2>
        <CreateProduct onReload={handleReload}/>
        <ProductList reload={reload}/>
        </>
    )
}
 export default Product;