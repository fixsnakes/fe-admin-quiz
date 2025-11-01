import React, { useState } from 'react';

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'Học sinh', status: 'Hoạt động', createdAt: '2024-01-15' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'Giáo viên', status: 'Hoạt động', createdAt: '2024-01-20' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'Học sinh', status: 'Bị khóa', createdAt: '2024-02-01' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', role: 'Quản trị viên', status: 'Hoạt động', createdAt: '2024-02-10' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Học sinh',
    status: 'Hoạt động',
  });

  const roles = ['Học sinh', 'Giáo viên', 'Quản trị viên'];
  const statuses = ['Hoạt động', 'Bị khóa'];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'Học sinh', status: 'Hoạt động' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Học sinh', status: 'Hoạt động' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: editingUser.id, createdAt: editingUser.createdAt } : u));
    } else {
      const newUser = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="w-full px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
          <p className="mt-1 text-sm text-gray-500">Quản lý tất cả người dùng trong hệ thống</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
          </svg>
          Thêm người dùng
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Vai trò</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Ngày tạo</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500">
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{user.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          user.status === 'Hoạt động'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="rounded-md px-3 py-1.5 text-indigo-600 transition-colors hover:bg-indigo-50"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          className="rounded-md px-3 py-1.5 text-red-600 transition-colors hover:bg-red-50"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  {editingUser ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Xác nhận xóa</h2>
            <p className="mb-6 text-sm text-gray-600">
              Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
