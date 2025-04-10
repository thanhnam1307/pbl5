import { useState } from "react";
import { useUsers, deleteUser } from "../../hooks/useUsers";
import Button from "../../components/ui/Button";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";

export default function Users() {
  const { users, loading, error, refetch } = useUsers(); // ✅ Gọi hook đúng chỗ
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(userToDelete._id);
      setShowDeleteModal(false);
      setUserToDelete(null);
      await refetch(); // ⏳ chờ load lại
      toast.success("🗑️ Xoá người dùng thành công!"); // ✅ giờ toast mới chạy
    } catch (err) {
      toast.error("❌ Xoá thất bại: " + err.message);
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi khi tải dữ liệu: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      user.is_company
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {user.is_company ? "Công ty" : "Cá nhân"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">
                    Sửa
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Xoá
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal xác nhận xoá */}
      <ConfirmDeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
