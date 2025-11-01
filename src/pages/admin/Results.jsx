import React, { useState } from 'react';

function Results() {
  const [results, setResults] = useState([
    {
      id: 1,
      studentName: 'Nguyễn Văn A',
      exam: 'Bài thi giữa kỳ Toán học',
      score: 85,
      maxScore: 100,
      correctAnswers: 25,
      totalQuestions: 30,
      timeSpent: 75,
      submittedAt: '2024-03-15 14:30:00',
      status: 'Đã hoàn thành',
    },
    {
      id: 2,
      studentName: 'Trần Thị B',
      exam: 'Bài thi cuối kỳ Vật lý',
      score: 92,
      maxScore: 100,
      correctAnswers: 36,
      totalQuestions: 40,
      timeSpent: 55,
      submittedAt: '2024-04-02 09:15:00',
      status: 'Đã hoàn thành',
    },
    {
      id: 3,
      studentName: 'Lê Văn C',
      exam: 'Bài thi giữa kỳ Toán học',
      score: 65,
      maxScore: 100,
      correctAnswers: 19,
      totalQuestions: 30,
      timeSpent: 88,
      submittedAt: '2024-03-15 16:45:00',
      status: 'Đã hoàn thành',
    },
    {
      id: 4,
      studentName: 'Phạm Thị D',
      exam: 'Bài thi thử Hóa học',
      score: 0,
      maxScore: 100,
      correctAnswers: 0,
      totalQuestions: 50,
      timeSpent: 0,
      submittedAt: '-',
      status: 'Chưa hoàn thành',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExam, setFilterExam] = useState('');
  const [showDetails, setShowDetails] = useState(null);

  const exams = ['Bài thi giữa kỳ Toán học', 'Bài thi cuối kỳ Vật lý', 'Bài thi thử Hóa học'];

  const filteredResults = results.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.exam.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = !filterExam || result.exam === filterExam;
    return matchesSearch && matchesExam;
  });

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status) => {
    return status === 'Đã hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const handleDelete = (id) => {
    setResults(results.filter(r => r.id !== id));
  };

  return (
    <div className="w-full px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Kết quả</h1>
        <p className="mt-1 text-sm text-gray-500">Xem và quản lý kết quả thi của tất cả thí sinh</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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
            placeholder="Tìm kiếm theo tên thí sinh hoặc bài thi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <select
          value={filterExam}
          onChange={(e) => setFilterExam(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">Tất cả bài thi</option>
          {exams.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      {/* Statistics Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Tổng số kết quả</div>
          <div className="mt-2 text-2xl font-bold text-gray-900">{results.length}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Đã hoàn thành</div>
          <div className="mt-2 text-2xl font-bold text-green-600">
            {results.filter(r => r.status === 'Đã hoàn thành').length}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Điểm trung bình</div>
          <div className="mt-2 text-2xl font-bold text-indigo-600">
            {results.filter(r => r.status === 'Đã hoàn thành').length > 0
              ? Math.round(
                  results
                    .filter(r => r.status === 'Đã hoàn thành')
                    .reduce((sum, r) => sum + (r.score / r.maxScore) * 100, 0) /
                    results.filter(r => r.status === 'Đã hoàn thành').length
                )
              : 0}
            %
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-sm text-gray-600">Chưa hoàn thành</div>
          <div className="mt-2 text-2xl font-bold text-gray-600">
            {results.filter(r => r.status === 'Chưa hoàn thành').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Thí sinh</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Bài thi</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Điểm số</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Câu đúng</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Thời gian (phút)</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Nộp bài</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-sm text-gray-500">
                    Không tìm thấy kết quả nào
                  </td>
                </tr>
              ) : (
                filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{result.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{result.studentName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="max-w-xs truncate">{result.exam}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`font-semibold ${getScoreColor(result.score, result.maxScore)}`}>
                        {result.score}/{result.maxScore}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {result.correctAnswers}/{result.totalQuestions}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{result.timeSpent}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {result.submittedAt !== '-' ? (
                        <div>
                          <div className="text-xs">{result.submittedAt.split(' ')[0]}</div>
                          <div className="text-xs text-gray-400">{result.submittedAt.split(' ')[1]}</div>
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowDetails(result.id)}
                          className="rounded-md px-3 py-1.5 text-indigo-600 transition-colors hover:bg-indigo-50"
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={() => handleDelete(result.id)}
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

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Chi tiết kết quả</h2>
              <button
                onClick={() => setShowDetails(null)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
            {(() => {
              const result = results.find(r => r.id === showDetails);
              if (!result) return null;
              const percentage = result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 0;
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Thí sinh</div>
                      <div className="mt-1 text-base font-medium text-gray-900">{result.studentName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Bài thi</div>
                      <div className="mt-1 text-base font-medium text-gray-900">{result.exam}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Điểm số</div>
                      <div className={`mt-1 text-2xl font-bold ${getScoreColor(result.score, result.maxScore)}`}>
                        {result.score}/{result.maxScore} ({percentage}%)
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Câu đúng</div>
                      <div className="mt-1 text-base font-medium text-gray-900">
                        {result.correctAnswers}/{result.totalQuestions}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Thời gian làm bài</div>
                      <div className="mt-1 text-base font-medium text-gray-900">{result.timeSpent} phút</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Trạng thái</div>
                      <div className="mt-1">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-gray-600">Thời gian nộp bài</div>
                      <div className="mt-1 text-base font-medium text-gray-900">
                        {result.submittedAt !== '-' ? result.submittedAt : 'Chưa nộp bài'}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowDetails(null)}
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
