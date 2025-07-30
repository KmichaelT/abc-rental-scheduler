"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import UrgencyBanner from "./UrgencyBanner";
import PropertyCard from "./PropertyCard";
import TimeSlot from "./TimeSlot";
import DateCarousel from "./DateCarousel";
import {
  timeSlots,
  getTimeSlotAvailability,
  saveBooking,
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

              <div className="text-gray-500 text-xs mb-4">Time Zone: EDT</div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {timeSlots.map((time) => (
                  <TimeSlot
                    key={time}
                    time={time}
                    isAvailable={timeSlotAvailability[time] || false}
                    isSelected={selectedTime === time}
                    onSelect={setSelectedTime}
                  />
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSchedule}
                  className={`inline-flex items-center gap-x-2 rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ${
                    selectedTime
                      ? "bg-gradient-to-br from-sky-600 to-green-700"
                      : "bg-gray-300"
                  }`}
                >
                  {" "}
                  {isRescheduling ? "RESCHEDULE TOUR" : "SCHEDULE NOW"}{" "}
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Replace Appointment Confirmation Modal */}
      <Dialog open={showReplaceModal} onClose={() => setShowReplaceModal(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              {pendingAppointment && (
                <>
                  <div>
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-100">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-amber-600 size-6"
                      >
                        <path 
                          d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Replace Existing Tour
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You already have a tour scheduled. Do you want to replace it with the new time?
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-2">
                          New appointment: {pendingAppointment.date.toLocaleDateString()} at {pendingAppointment.time}
                        </p>
                      </div>

 

                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => completeScheduling(pendingAppointment.date, pendingAppointment.time, true)}
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
                    >
                      Replace Tour
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReplaceModal(false);
                        setPendingAppointment(null);
                        setSelectedTime(null);
                      }}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    >
                      Keep Current
                    </button>
                  </div>
                </>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Success Confirmation Modal */}
      <Dialog open={showSuccessModal} onClose={() => setShowSuccessModal(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              {successMessage && (
                <>
                  <div>
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-green-600 size-6"
                      >
                        <path 
                          d="M20 6L9 17L4 12" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Tour {successMessage.action === 'rescheduled' ? 'Rescheduled' : 'Scheduled'} Successfully!
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-4">
                          Your apartment tour has been {successMessage.action} for:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 text-left">
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium text-gray-900">Date:</span>{' '}
                              <span className="text-gray-600">{successMessage.date}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium text-gray-900">Time:</span>{' '}
                              <span className="text-gray-600">{successMessage.time}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium text-gray-900">Agent:</span>{' '}
                              <span className="text-gray-600">{successMessage.agent}</span>
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                          You will receive a confirmation email shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      onClick={() => setShowSuccessModal(false)}
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Great, thanks!
                    </button>
                  </div>
                </>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ApartmentTourScheduler;
