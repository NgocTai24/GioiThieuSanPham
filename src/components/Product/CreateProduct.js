import Modal from 'react-modal';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { getListCatrgory } from '../../services/categoryServices';
import { createProduct } from '../../services/productsServices';

function CreateProduct(props) {
    const { onReload } = props;
    const [ShowModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
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
            width: '600px', // Chiều rộng modal
        },
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [name]: value,
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
        const result = await createProduct(data);
        if (result) {
            setShowModal(false);
            onReload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Tạo Mới Sản Phẩm Thành Công",
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    return (
        <>
            <button className="btn btn-primary" onClick={openModal}>Tạo Mới Sản Phẩm</button>
            <Modal
                isOpen={ShowModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create New Product"
            >
                <form onSubmit={handleSubmit} className="p-3">
                    <h5 className="mb-4">Tạo Mới Sản Phẩm</h5>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Tiêu Đề</label>
                            <input type='text' className="form-control" name='title' onChange={handleChange} required />
                        </div>

                        {datacategory.length > 0 && (
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Danh Mục</label>
                                <select className="form-select" name='category' onChange={handleChange}>
                                    {datacategory.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Giá</label>
                            <input type='text' className="form-control" name='price' onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Giảm Giá</label>
                            <input type='text' className="form-control" name='discountPercentage' onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Số Lượng Còn Lại</label>
                            <input type='text' className="form-control" name='stock' onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Đường Dẫn ảnh</label>
                            <input type='text' className="form-control" name='thumbnail' onChange={handleChange} required />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label className="form-label">Mô tả</label>
                            <textarea className="form-control" rows={4} name='description' onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
                        <button type="submit" className="btn btn-success">Tạo Mới</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default CreateProduct;
