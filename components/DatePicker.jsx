'use client';
import React, { useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DatePicker = ({ onDateSelect, minDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonth = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (day, close) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Don't allow selection of past dates
    if (selectedDate < minDate) return;
    
    // Don't allow selection of Sundays
    if (selectedDate.getDay() === 0) return;
    
    onDateSelect(selectedDate);
    close();
  };

  const isDateDisabled = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date < minDate || date.getDay() === 0; // Past dates or Sundays
  };

  const renderCalendarDays = (close) => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateClick(day, close)}
          disabled={isDisabled}
          className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
            isDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : isToday
              ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
        <CalendarDaysIcon className="h-4 w-4" />
        Show More Dates
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute right-0 z-50 mt-2 bg-transparent transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {({ close }) => (
          <div className="w-80 flex-auto overflow-hidden rounded-xl bg-white text-sm shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
                <button
                  onClick={close}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                
                <span className="font-medium text-gray-900">{formatMonth(currentMonth)}</span>
                
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="h-10 flex items-center justify-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {renderCalendarDays(close)}
              </div>
              
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                Note: Sundays are not available for tours
              </div>
            </div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
};

export default DatePicker;