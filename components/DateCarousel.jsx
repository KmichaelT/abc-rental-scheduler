'use client';
import React, { useState, useEffect } from 'react';
import { generateBusinessDays, getDateAvailability } from '@/lib/mockData';
import DatePicker from './DatePicker';

const DateCarousel = ({ 
  selectedDate, 
  onDateSelect,
  startDate = null
}) => {
  const [dateRange, setDateRange] = useState([]);
  const [currentStartDate, setCurrentStartDate] = useState(startDate || new Date());

  useEffect(() => {
    const dates = generateBusinessDays(currentStartDate, 6);
    setDateRange(dates);
  }, [currentStartDate]);

  const formatDateDisplay = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    let dayName = days[date.getDay()];
    
    // Replace with Today/Tomorrow if applicable
    if (date.toDateString() === today.toDateString()) {
      dayName = 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dayName = 'Tomorrow';
    }
    
    return {
      day: dayName,
      date: date.getDate(),
      month: months[date.getMonth()],
      full: `${dayName}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    };
  };

  const handleDatePickerSelect = (date) => {
    // Find the start of the week for the selected date
    const startOfWeek = new Date(date);
    const dayOfWeek = date.getDay();
    const daysToGoBack = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Start from Monday
    startOfWeek.setDate(date.getDate() - daysToGoBack);
    
    setCurrentStartDate(startOfWeek);
    onDateSelect(date);
  };


  return (
    <div className="mb-4">

      
      <div className="flex flex-wrap gap-2 mb-4 ">
        {dateRange.map((date, index) => {
          const dateInfo = formatDateDisplay(date);
          const availability = getDateAvailability(date);
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          
          return (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              disabled={availability.status === 'unavailable'}
              className={`flex-1 min-w-[110px] p-3 rounded-lg border transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : availability.status === 'unavailable'
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              aria-label={`${dateInfo.full} - ${availability.status === 'unavailable' ? 'Fully booked' : `${availability.available} slots available`}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-500">{dateInfo.day}</div>
                <div className={`text-sm font-semibold ${
                  isSelected ? 'text-blue-600' : availability.status === 'unavailable' ? 'text-gray-400' : 'text-gray-900'
                }`}>
                  {dateInfo.month} {dateInfo.date}
                </div>
              </div>
              
              <div className="flex justify-start">
                <span className="inline-flex items-center gap-x-1.5 text-xs font-medium text-gray-900">
                  <svg viewBox="0 0 6 6" aria-hidden="true" className={`size-2 ${
                    availability.status === 'unavailable' ? 'fill-gray-400' :
                    availability.status === 'limited' ? 'fill-amber-500' : 'fill-green-500'
                  }`}>
                    <circle r={3} cx={3} cy={3} />
                  </svg>
                  {availability.status === 'unavailable' ? 'Full' :
                   `${availability.available} slot${availability.available !== 1 ? 's' : ''} left`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-end mb-4">
        <DatePicker onDateSelect={handleDatePickerSelect} />
      </div>      

      <div className='flex justify-between mt-12'>
      <h2 className="text-gray-800 text-base font-bold ">
        {selectedDate ? formatDateDisplay(selectedDate).full : 'Select a Date'}
      </h2>
                    <p className="text-gray-600 text-xs ">Time Zone: EDT</p>

      </div>

    </div>
  );
};

export default DateCarousel;