import React, { useState } from 'react';

function Exams() {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: 'Bài thi giữa kỳ Toán học',
      quiz: 'Đề thi Toán học lớp 10',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      duration: 90,
      maxAttempts: 2,
      status: 'Đang diễn ra',
      participants: 45,
      createdAt: '2024-03-01',
    },
    {
      id: 2,
      name: 'Bài thi cuối kỳ Vật lý',
      quiz: 'Đề thi Vật lý lớp 11',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      duration: 60,
      maxAttempts: 1,
      status: 'Sắp diễn ra',
      participants: 32,
      createdAt: '2024-03-10',
    },
    {
      id: 3,
      name: 'Bài thi thử Hóa học',
      quiz: 'Đề thi Hóa học lớp 12',
      startDate: '2024-02-10',
      endDate: '2024-02-15',
      duration: 120,
      maxAttempts: 3,
      status: 'Đã kết thúc',
      participants: 28,
      createdAt: '2024-02-01',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    quiz: '',
    startDate: '',
    endDate: '',
    duration: '',
    maxAttempts: '1',
    status: 'Sắp diễn ra',
  });

  const quizzes = ['Đề thi Toán học lớp 10', 'Đề thi Vật lý lớp 11', 'Đề thi Hóa học lớp 12', 'Đề thi Sinh học lớp 11'];
  const statuses = ['Sắp diễn ra', 'Đang diễn ra', 'Đã kết thúc', 'Đã hủy'];

  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.quiz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (exam = null) => {
    if (exam) {
      setEditingExam(exam);
      setFormData({ ...exam, duration: exam.duration.toString(), maxAttempts: exam.maxAttempts.toString() });
    } else {
      setEditingExam(null);
      setFormData({ name: '', quiz: '', startDate: '', endDate: '', duration: '', maxAttempts: '1', status: 'Sắp diễn ra' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExam(null);
    setFormData({ name: '', quiz: '', startDate: '', endDate: '', duration: '', maxAttempts: '1', status: 'Sắp diễn ra' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExam) {
      setExams(exams.map(e => e.id === editingExam.id 
        ? { ...formData, id: editingExam.id, duration: parseInt(formData.duration), maxAttempts: parseInt(formData.maxAttempts), participants: editingExam.participants, createdAt: editingExam.createdAt }
        : e
      ));
    } else {
      const newExam = {
        ...formData,
        id: exams.length > 0 ? Math.max(...exams.map(e => e.id)) + 1 : 1,
        duration: parseInt(formData.duration),
        maxAttempts: parseInt(formData.maxAttempts),
        participants: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setExams([...exams, newExam]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setExams(exams.filter(e => e.id !== id));
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

  return (
    <div className="w-full px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Bài thi</h1>
          <p className="mt-1 text-sm text-gray-500">Quản lý tất cả bài thi trong hệ thống</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
          </svg>
          Thêm bài thi
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
            placeholder="Tìm kiếm theo tên hoặc bộ đề thi..."
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Tên bài thi</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Bộ đề thi</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Thời gian</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Thời lượng (phút)</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Số lần làm</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Thí sinh</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Trạng thái</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredExams.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-sm text-gray-500">
                    Không tìm thấy bài thi nào
                  </td>
                </tr>
              ) : (
                filteredExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{exam.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{exam.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{exam.quiz}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      <div>{exam.startDate}</div>
                      <div className="text-xs text-gray-400">đến {exam.endDate}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{exam.duration}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{exam.maxAttempts}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{exam.participants}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(exam.status)}`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(exam)}
                          className="rounded-md px-3 py-1.5 text-indigo-600 transition-colors hover:bg-indigo-50"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(exam.id)}
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
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingExam ? 'Chỉnh sửa bài thi' : 'Thêm bài thi mới'}
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
                <label className="block text-sm font-medium text-gray-700">Tên bài thi</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bộ đề thi</label>
                <select
                  value={formData.quiz}
                  onChange={(e) => setFormData({ ...formData, quiz: e.target.value })}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Chọn bộ đề thi</option>
                  {quizzes.map((quiz) => (
                    <option key={quiz} value={quiz}>
                      {quiz}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Thời lượng (phút)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Số lần làm tối đa</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.maxAttempts}
                    onChange={(e) => setFormData({ ...formData, maxAttempts: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
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
                  {editingExam ? 'Cập nhật' : 'Thêm mới'}
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
              Bạn có chắc chắn muốn xóa bài thi này? Hành động này không thể hoàn tác.
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

export default Exams;
