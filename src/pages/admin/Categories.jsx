import React, { useState } from 'react';

function Categories() {
  // Dữ liệu bài thi mẫu (sẽ được lấy từ Exams page hoặc API)
  const allExams = [
    { id: 1, name: 'Bài thi giữa kỳ Toán học', category: 'Toán học', duration: 90, status: 'Đang diễn ra', participants: 45 },
    { id: 2, name: 'Bài thi cuối kỳ Vật lý', category: 'Vật lý', duration: 60, status: 'Sắp diễn ra', participants: 32 },
    { id: 3, name: 'Bài thi thử Hóa học', category: 'Hóa học', duration: 120, status: 'Đã kết thúc', participants: 28 },
    { id: 4, name: 'Bài thi văn học lớp 10', category: 'Văn học', duration: 90, status: 'Sắp diễn ra', participants: 15 },
    { id: 5, name: 'Bài thi văn học lớp 11', category: 'Văn học', duration: 90, status: 'Đang diễn ra', participants: 20 },
  ];

  const [categories, setCategories] = useState([
    { id: 1, name: 'Toán học', description: 'Các đề thi và câu hỏi về Toán học', status: 'Hoạt động', createdAt: '2024-01-15' },
    { id: 2, name: 'Vật lý', description: 'Các đề thi và câu hỏi về Vật lý', status: 'Hoạt động', createdAt: '2024-01-20' },
    { id: 3, name: 'Hóa học', description: 'Các đề thi và câu hỏi về Hóa học', status: 'Hoạt động', createdAt: '2024-02-01' },
    { id: 4, name: 'Văn học', description: 'Các đề thi và câu hỏi về Văn học', status: 'Bị khóa', createdAt: '2024-02-10' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showExams, setShowExams] = useState(null); // ID của category đang xem bài thi
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Hoạt động',
  });

  const statuses = ['Hoạt động', 'Bị khóa'];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lấy danh sách bài thi theo category
  const getExamsByCategory = (categoryName) => {
    return allExams.filter(exam => exam.category === categoryName);
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, description: category.description, status: category.status });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', status: 'Hoạt động' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', status: 'Hoạt động' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id 
        ? { ...formData, id: editingCategory.id, createdAt: editingCategory.createdAt }
        : c
      ));
    } else {
      const newCategory = {
        ...formData,
        id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCategories([...categories, newCategory]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    setDeleteConfirm(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang diễn ra':
        return 'bg-blue-100 text-blue-800';
      case 'Sắp diễn ra':
        return 'bg-yellow-100 text-yellow-800';
      case 'Đã kết thúc':
        return 'bg-gray-100 text-gray-800';
      case 'Đã hủy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categoryWithExams = showExams ? categories.find(c => c.id === showExams) : null;
  const examsList = categoryWithExams ? getExamsByCategory(categoryWithExams.name) : [];

  return (
    <div className="w-full px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Danh mục</h1>
          <p className="mt-1 text-sm text-gray-500">Xem bài thi theo từng danh mục</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
          </svg>
          Thêm danh mục
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
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full rounded-xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-sm text-gray-500">Không tìm thấy danh mục nào</p>
          </div>
        ) : (
          filteredCategories.map((category) => {
            const examsCount = getExamsByCategory(category.name).length;
            return (
              <div key={category.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{category.description}</p>
                  </div>
                  <span
                    className={`ml-3 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      category.status === 'Hoạt động'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {category.status}
                  </span>
                </div>
                <div className="mb-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Số lượng bài thi</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">{examsCount}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowExams(category.id)}
                    className="flex-1 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                  >
                    Xem bài thi
                  </button>
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(category.id)}
                    className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal hiển thị danh sách bài thi */}
      {showExams && categoryWithExams && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Bài thi thuộc danh mục: {categoryWithExams.name}</h2>
                <p className="mt-1 text-sm text-gray-500">Tổng số: {examsList.length} bài thi</p>
              </div>
              <button
                onClick={() => setShowExams(null)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
            
            {examsList.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-500">Chưa có bài thi nào thuộc danh mục này</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Tên bài thi</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Thời lượng (phút)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Thí sinh</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {examsList.map((exam) => (
                      <tr key={exam.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{exam.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{exam.name}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{exam.duration}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{exam.participants}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(exam.status)}`}>
                            {exam.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowExams(null)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
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
                <label className="block text-sm font-medium text-gray-700">Tên danh mục</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
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
                  {editingCategory ? 'Cập nhật' : 'Thêm mới'}
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
              Bạn có chắc chắn muốn xóa danh mục này? Tất cả câu hỏi và bộ đề thi trong danh mục này sẽ bị ảnh hưởng. Hành động này không thể hoàn tác.
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

export default Categories;
