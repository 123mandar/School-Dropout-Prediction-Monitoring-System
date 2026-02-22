import { useEffect, useState } from 'react';
import client from '../api/client';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await client.get('/students');
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const runPrediction = async (id) => {
    await client.post(`/predictions/${id}`);
    await load();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Management</h2>
      {loading ? <p>Loading...</p> : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-2 text-left">Name</th><th className="p-2">Class</th><th className="p-2">School</th><th className="p-2">Risk</th><th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-2">{s.fullName}</td>
                  <td className="p-2 text-center">{s.classGrade}</td>
                  <td className="p-2 text-center">{s.schoolName}</td>
                  <td className="p-2 text-center">{s.latestRiskCategory} ({s.latestRiskScore})</td>
                  <td className="p-2 text-center"><button onClick={() => runPrediction(s._id)} className="bg-blue-700 text-white px-2 py-1 rounded">Predict</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
