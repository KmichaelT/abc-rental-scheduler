import React from 'react';

const TimeSlot = ({ 
  time, 
  isAvailable = true, 
  isSelected = false, 
  onSelect,
  disabled = false 
}) => {
  const isDisabled = disabled || !isAvailable;

  const getButtonClasses = () => {
    const baseClasses = "w-full h-11 rounded-sm flex items-center justify-center text-base transition-all relative";
    
    if (isSelected && !isDisabled) {
      return `${baseClasses} bg-gradient-to-br from-blue-100 to-purple-100 outline outline-1 outline-violet-500 text-gray-800 font-medium`;
    }
    
    if (isDisabled) {
      return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed`;
    }
    
    // Available slots
    return `${baseClasses} bg-white text-gray-900 hover:bg-gray-50 border border-gray-200`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => !isDisabled && onSelect(time)}
        disabled={isDisabled}
        className={getButtonClasses()}
        aria-label={`${time} - ${isAvailable ? 'Available' : 'Booked'}`}
      >
        {time}
      </button>
    </div>
  );
};

export default TimeSlot;