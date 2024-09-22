import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { deleteProduct } from '../../services/productsServices';

function DeleteProduct(props) {
  const { item, onReload } = props;
  const deleteItem = async () => {
    const result = await deleteProduct(item.id);
    if (result) {
      onReload();
      Swal.fire({
        title: "Đã Xóa!",
        text: "Bạn đã xóa Thành Công.",
        icon: "success"
      });
    }
  }
  const handleDelete = () => {
    Swal.fire({
      title: "Bạn Có Chắc Muốn Xóa ?",
      text: "Nếu xóa thì sẽ không khôi phục được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn Xóa!",
      cencelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
      }
    });
  }
  return (
    <>
      <button className="btn btn-primary" onClick={handleDelete}>
        <i className="fas fa-edit"></i> Xóa
      </button>
    </>
  )
}
export default DeleteProduct;