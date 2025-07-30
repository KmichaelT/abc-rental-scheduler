import React from 'react';
import TimeSlot from './TimeSlot';
import { timeSlots } from '@/lib/mockData';

const TimeSlotGrid = ({ 
  timeSlotAvailability, 
  selectedTime, 
  onTimeSelect 
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
      {timeSlots.map((time) => (
        <TimeSlot
          key={time}
          time={time}
          isAvailable={timeSlotAvailability[time] || false}
          isSelected={selectedTime === time}
          onSelect={onTimeSelect}
        />
      ))}
    </div>
  );
};

export default TimeSlotGrid;