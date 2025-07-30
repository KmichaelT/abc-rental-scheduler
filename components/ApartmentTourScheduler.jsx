"use client";
import React, { useState, useEffect } from "react";
import UrgencyBanner from "./UrgencyBanner";
import PropertyCard from "./PropertyCard";
import DateCarousel from "./DateCarousel";
import TimeSlotGrid from "./TimeSlotGrid";
import ScheduleButton from "./ScheduleButton";
import BookingModals from "./BookingModals";
import {
  getTimeSlotAvailability,
  getUserAppointment,
  saveUserAppointment,
} from "@/lib/mockData";

const ApartmentTourScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlotAvailability, setTimeSlotAvailability] = useState({});
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingAppointment, setPendingAppointment] = useState(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Update time slot availability when date changes
  useEffect(() => {
    if (selectedDate) {
      const availability = getTimeSlotAvailability(selectedDate);
      setTimeSlotAvailability(availability);
      // Clear selected time if it's no longer available
      if (selectedTime && !availability[selectedTime]) {
        setSelectedTime(null);
      }
    }
  }, [selectedDate, selectedTime]);

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      const existingAppointment = getUserAppointment();
      
      if (existingAppointment) {
        // Show replacement confirmation
        setPendingAppointment({ date: selectedDate, time: selectedTime });
        setShowReplaceModal(true);
      } else {
        // No existing appointment, proceed normally
        completeScheduling(selectedDate, selectedTime, false);
      }
    }
  };

  const completeScheduling = (date, time, isReplacement) => {
    // Save user appointment
    saveUserAppointment(date, time);

    // Update the time slot availability to reflect the new booking
    const newAvailability = getTimeSlotAvailability(date);
    setTimeSlotAvailability(newAvailability);

    // Clear selected time and reset states
    setSelectedTime(null);
    setIsRescheduling(false);
    setShowReplaceModal(false);
    setPendingAppointment(null);
    setRefreshKey(prev => prev + 1); // Trigger PropertyCard refresh

    // Show confirmation modal
    const action = isReplacement ? 'rescheduled' : 'scheduled';
    setSuccessMessage({
      action,
      date: date.toLocaleDateString(),
      time,
      agent: 'John Doe'
    });
    setShowSuccessModal(true);
  };

  const handleReschedule = () => {
    setIsRescheduling(true);
    // Scroll to the scheduling section or provide visual feedback
  };

  const handleAppointmentChange = () => {
    // Refresh time slot availability when appointment changes
    if (selectedDate) {
      const newAvailability = getTimeSlotAvailability(selectedDate);
      setTimeSlotAvailability(newAvailability);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Schedule Your Apartment Tour
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <PropertyCard 
            key={refreshKey} 
            onReschedule={handleReschedule} 
            onAppointmentChange={handleAppointmentChange}
          />

          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible">
            <div className="p-6 md:p-8">
              <UrgencyBanner />
                  <div className="border-b border-gray-200 pb-4 mb-8">
      <h3 className="text-base font-semibold text-gray-900">Select date and Time</h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        Choose your preferred date and time for a personalized apartment tour. Tours are 30 minutes long and include a walkthrough of all amenities.
      </p>
    </div>
    
              {isRescheduling && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 mt-6">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.3334 10.0001C18.3334 14.6025 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6025 1.66675 10.0001C1.66675 5.39771 5.39771 1.66675 10.0001 1.66675C14.6025 1.66675 18.3334 5.39771 18.3334 10.0001Z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 7.5V10.8333" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 13.3333H10.0083" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-blue-900 font-medium">Select a new time to reschedule your tour</p>
                  </div>
                </div>
              )}
              
              <DateCarousel
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />

              <div className="text-gray-600 text-xs mb-4">Time Zone: EDT</div>

              <TimeSlotGrid
                timeSlotAvailability={timeSlotAvailability}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
              />

              <ScheduleButton
                selectedTime={selectedTime}
                isRescheduling={isRescheduling}
                onSchedule={handleSchedule}
                refreshKey={refreshKey}
              />
            </div>
          </div>
        </div>
      </div>
      
      <BookingModals
        showReplaceModal={showReplaceModal}
        setShowReplaceModal={setShowReplaceModal}
        pendingAppointment={pendingAppointment}
        setPendingAppointment={setPendingAppointment}
        setSelectedTime={setSelectedTime}
        completeScheduling={completeScheduling}
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        successMessage={successMessage}
      />
    </div>
  );
};

export default ApartmentTourScheduler;
