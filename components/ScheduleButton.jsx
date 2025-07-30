import React, { useState, useEffect } from 'react';
import { getUserAppointment } from '@/lib/mockData';

const ScheduleButton = ({ selectedTime, isRescheduling, onSchedule, refreshKey }) => {
  const [hasExistingAppointment, setHasExistingAppointment] = useState(false);

  useEffect(() => {
    const appointment = getUserAppointment();
    setHasExistingAppointment(!!appointment);
  }, [refreshKey]);
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onSchedule}
        className={`inline-flex items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          selectedTime
            ? "bg-gradient-to-br from-sky-600 to-green-700"
            : "bg-gray-300"
        }`}
      >
        {isRescheduling ? "RESCHEDULE TOUR" : hasExistingAppointment ? "RESCHEDULE NOW" : "SCHEDULE NOW"}
        <svg
          width="19"
          height="16"
          viewBox="0 0 19 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0307 7.22125L11.6107 0.80125C11.2507 0.44125 10.6707 0.44125 10.3107 0.80125C9.95072 1.16125 9.95072 1.74125 10.3107 2.10125L15.1607 6.94125H0.950715C0.440715 6.92125 0.0207185 7.32125 0.000718527 7.83125C-0.0192815 8.34125 0.380718 8.76125 0.890718 8.78125C0.910718 8.78125 0.930716 8.78125 0.950715 8.78125H15.1507L10.3007 13.6412C9.94072 14.0012 9.94072 14.5813 10.3007 14.9413C10.6607 15.3013 11.2407 15.3013 11.6007 14.9413L18.0107 8.52125C18.3707 8.16125 18.3707 7.58125 18.0107 7.22125H18.0307Z"
            fill={selectedTime ? "#F5F5F5" : "#9CA3AF"}
          />
        </svg>
      </button>
    </div>
  );
};

export default ScheduleButton;