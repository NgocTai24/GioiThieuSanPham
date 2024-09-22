import { useEffect, useState } from "react";
import "./Product.scss";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { getProductList } from "../../services/productsServices";

function ProductList(props) {
  const { reload } = props;
  const [data, setData] = useState([]);
  const [editReload, setEditReload] = useState(false);

  const handleReload = () => {
    setEditReload(!editReload);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getProductList();
      setData(result.reverse());
    };
    fetchApi();
  }, [reload, editReload]);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {data.map(item => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card h-100 product__card">
                <img
                  src={item.thumbnail}
                  className="card-img-top product__image"
                  alt={item.title}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title product__title">{item.title}</h5>
                    <p className="card-text">Price: {item.price}$</p>
                    <p className="card-text">Discount: {item.discountPercentage}%</p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <EditProduct item={item} onReload={handleReload} />
                    <DeleteProduct item={item} onReload={handleReload} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
