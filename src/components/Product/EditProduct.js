import Modal from 'react-modal';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getListCatrgory } from '../../services/categoryServices';
import { editProduct } from '../../services/productsServices';

function EditProduct(props) {
   const { item, onReload } = props;
   const [ShowModal, setShowModal] = useState(false);
   const [data, setData] = useState(item);
   const [datacategory, setDatacategory] = useState([]);

   useEffect(() => {
      const fetchApi = async () => {
         const result = await getListCatrgory();
         setDatacategory(result);
      }
      fetchApi();
   }, []);

   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         width: '70%',  // Giảm chiều rộng xuống 70%
         maxWidth: '800px',  // Giới hạn kích thước tối đa của modal là 800px
         padding: '20px',
      },
   };

   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData({
         ...data,
         [name]: value
      });
   };

   const openModal = () => {
      setShowModal(true);
   };

   const closeModal = () => {
      setShowModal(false);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await editProduct(item.id, data);
      if (result) {
         setShowModal(false);
         onReload();
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Cập Nhật Sản Phẩm Thành Công",
            showConfirmButton: false,
            timer: 2000
         });
      }
   };

   return (
      <>
         <button className="btn btn-primary" onClick={openModal}>
            <i className="fas fa-edit"></i> Sửa
         </button>
         <Modal
            isOpen={ShowModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Chỉnh Sửa Sản Phẩm"
         >
            <h2 className="text-center mb-4">Chỉnh Sửa Sản Phẩm</h2>
            <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>Tiêu Đề</label>
                        <input
                           type="text"
                           name="title"
                           className="form-control"
                           onChange={handleChange}
                           value={data.title}
                           required
                        />
                     </div>
                  </div>
                  {datacategory.length > 0 && (
                     <div className="col-md-6">
                        <div className="form-group">
                           <label>Danh Mục</label>
                           <select
                              name="category"
                              className="form-control"
                              onChange={handleChange}
                              value={data.category}
                           >
                              {datacategory.map((category, index) => (
                                 <option key={index} value={category}>
                                    {category}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                  )}
               </div>

               <div className="row">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>Giá</label>
                        <input
                           type="number"
                           name="price"
                           className="form-control"
                           onChange={handleChange}
                           value={data.price}
                           required
                        />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>Giảm Giá</label>
                        <input
                           type="number"
                           name="discountPercentage"
                           className="form-control"
                           onChange={handleChange}
                           value={data.discountPercentage}
                           required
                        />
                     </div>
                  </div>
               </div>

               <div className="row">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>Số Lượng Còn Lại</label>
                        <input
                           type="number"
                           name="stock"
                           className="form-control"
                           onChange={handleChange}
                           value={data.stock}
                           required
                        />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>Đường Dẫn ảnh</label>
                        <input
                           type="text"
                           name="thumbnail"
                           className="form-control"
                           onChange={handleChange}
                           value={data.thumbnail}
                           required
                        />
                     </div>
                  </div>
               </div>

               <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                     rows={4}
                     name="description"
                     className="form-control"
                     onChange={handleChange}
                     value={data.description}
                  ></textarea>
               </div>

               <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-secondary" onClick={closeModal}>
                     Hủy
                  </button>
                  <button type="submit" className="btn btn-success">
                     Cập Nhật
                  </button>
               </div>
            </form>
         </Modal>
      </>
   );
}

export default EditProduct;
