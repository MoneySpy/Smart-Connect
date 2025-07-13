import React, { useEffect, useState } from 'react';

type ProgressItem = {
  feature: string;
  status: string;
  percent: number;
};

export default function ProgressDashboard() {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [overall, setOverall] = useState(0);

  useEffect(() => {
    // Mock API call (replace with real API in production)
    const fetchProgress = async () => {
      // ตัวอย่างข้อมูล mock
      const data = {
        overall: 42,
        items: [
          { feature: 'หน้า Register', status: 'กำลังดำเนินการ', percent: 60 },
          { feature: 'หน้า Login', status: 'กำลังดำเนินการ', percent: 60 },
          { feature: 'Backend Auth API', status: 'กำลังดำเนินการ', percent: 50 },
          { feature: 'ระบบ Role/Redirect', status: 'กำลังดำเนินการ', percent: 40 },
          { feature: 'ทดสอบ flow/UX', status: 'ยังไม่เริ่ม', percent: 0 },
          { feature: 'Commit & Push GitHub', status: 'ยังไม่เริ่ม', percent: 0 },
        ],
      };
      setProgress(data.items);
      setOverall(data.overall);
    };
    fetchProgress();
    const interval = setInterval(fetchProgress, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">ความคืบหน้าระบบ (Real-time)</h2>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>รวมความคืบหน้า</span>
          <span>{overall}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">ฟีเจอร์</th>
            <th className="p-2 border">สถานะ</th>
            <th className="p-2 border">% ความคืบหน้า</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((item) => (
            <tr key={item.feature}>
              <td className="p-2 border">{item.feature}</td>
              <td className="p-2 border">{item.status}</td>
              <td className="p-2 border">{item.percent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 