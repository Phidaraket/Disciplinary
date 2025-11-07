import React, { useState } from 'react';
import Icon from './Icon';

interface InfoFormProps {
  onSubmit: () => void;
}

const InfoForm: React.FC<InfoFormProps> = ({ onSubmit }) => {
  const [idNumber, setIdNumber] = useState('');
  const [dob, setDob] = useState('');
  const [chatbotQuery, setChatbotQuery] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idNumber.trim() && dob.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">วินัยประจำปี</h1>
        </header>

        <form onSubmit={handleSubmit} className="shadow-lg rounded-xl">
          {/* Chatbot Input Section */}
          <div className="bg-white p-8 rounded-t-xl">
            <label htmlFor="chatbotQuery" className="block text-xl font-semibold text-gray-800 mb-3">คำถามที่ท่านต้องการ</label>
            <textarea
              id="chatbotQuery"
              rows={4}
              value={chatbotQuery}
              onChange={(e) => setChatbotQuery(e.target.value)}
              placeholder="กรุณาพิมพ์คำถามของคุณที่นี่..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow resize-none"
            />
          </div>

          {/* Header Section */}
          <div className="bg-slate-100 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">วินัยพนักงานประจำปี 2568</h1>
                <p className="text-gray-600 mt-2 text-sm">ข้อมูลระหว่างวันที่ 1 พฤศจิกายน พ.ศ. 2567 - 31 ตุลาคม พ.ศ. 2568</p>
                <p className="text-gray-600 text-sm">ขอสงวนสิทธิ์การแก้ไขทุกกรณี เนื่องจากมีการเน้นย้ำตรวจสอบข้อมูลและแก้ไขวินัยพนักงานประจำเดือนในวันที่ 2 - 5 ของทุกเดือน (ข้อมูลวินัย updated ถึงวันที่ 31/10/2568)</p>
              </div>
              <button
                type="button"
                className="flex-shrink-0 flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-1 text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Icon icon="globe" className="w-5 h-5" />
                <span>TH</span>
              </button>
            </div>
          </div>

          {/* Personal Info Form Section */}
          <div className="bg-white p-8 rounded-b-xl">
            <div className="flex items-center mb-8">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <Icon icon="person" className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">กรุณากรอกข้อมูลของท่าน</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-600 mb-1">เลขประจำตัวประชาชน</label>
                <input
                  id="idNumber"
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="กรุณากรอกเลขประจำตัวประชาชนในช่องนี้"
                  className="w-full px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-600 mb-1">วันเดือนปีเกิด</label>
                <input
                  id="dob"
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="กรุณากรอก วัน-เดือน-ปี ค.ศ. เกิดของคุณ เช่น 11/10/1981"
                  className="w-full px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-shadow"
                  required
                />
              </div>
            </div>

            {/* Employee Information Section */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">ข้อมูลพนักงานของท่าน</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-600 mb-1">รหัสพนักงาน</label>
                  <input
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="รหัสพนักงาน 6 หลัก"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1">ชื่อ - นามสกุล</label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ชื่อและสกุลของคุณ"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-600 mb-1">ตำแหน่ง</label>
                  <input
                    id="position"
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="ตำแหน่งของคุณ"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-600 mb-1">แผนก</label>
                  <input
                    id="department"
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="ชื่อแผนกของคุณ"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                disabled={!idNumber.trim() || !dob.trim()}
              >
                ดำเนินการต่อ
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoForm;