import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { getUserAppointment, cancelUserAppointment } from '@/lib/mockData';

const PropertyCard = ({ 
  image = "/apartment.png",
  address = "123 Main St, Pittsburgh, PA 12345",
  agentName = "John Doe",
  onReschedule,
  onAppointmentChange
}) => {
  const [userAppointment, setUserAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const appointment = getUserAppointment();
    setUserAppointment(appointment);
  }, []);

  const handleCancel = () => {
    const canceledAppointment = cancelUserAppointment();
    if (canceledAppointment) {
      setUserAppointment(null);
      setShowCancelModal(false);
      // Notify parent component if callback provided
      if (onAppointmentChange) {
        onAppointmentChange();
      }
    }
  };

  const handleReschedule = () => {
    if (onReschedule) {
      onReschedule();
    }
  };


  const formatAppointmentDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative h-48 md:h-64">
        <img 
          src={image} 
          alt="Property" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mt-0.5 flex-shrink-0"
          >
            <path 
              d="M10 10.625C11.3807 10.625 12.5 9.50571 12.5 8.125C12.5 6.74429 11.3807 5.625 10 5.625C8.61929 5.625 7.5 6.74429 7.5 8.125C7.5 9.50571 8.61929 10.625 10 10.625Z" 
              stroke="#6B7280" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M16.25 8.125C16.25 13.75 10 18.125 10 18.125C10 18.125 3.75 13.75 3.75 8.125C3.75 6.4674 4.40848 4.87769 5.58058 3.70558C6.75269 2.53348 8.3424 1.875 10 1.875C11.6576 1.875 13.2473 2.53348 14.4194 3.70558C15.5915 4.87769 16.25 6.4674 16.25 8.125Z" 
              stroke="#6B7280" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Address</h3>
            <p className="text-base font-medium text-gray-900">{address}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 -mx-6 mb-4"></div>
        
        <div className="flex items-center gap-3">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path 
              d="M10 10C11.8409 10 13.3333 8.50761 13.3333 6.66667C13.3333 4.82572 11.8409 3.33333 10 3.33333C8.15905 3.33333 6.66667 4.82572 6.66667 6.66667C6.66667 8.50761 8.15905 10 10 10Z" 
              stroke="#6B7280" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M4.16667 16.6667C4.16667 15.3406 4.69345 14.0688 5.63113 13.1311C6.56881 12.1934 7.84058 11.6667 9.16667 11.6667H10.8333C12.1594 11.6667 13.4312 12.1934 14.3689 13.1311C15.3065 14.0688 15.8333 15.3406 15.8333 16.6667" 
              stroke="#6B7280" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <h3 className="text-sm text-gray-600 mb-0.5">Your Rental Agent</h3>
            <p className="text-base font-medium text-gray-900">{agentName}</p>
          </div>
        </div>
        
        {userAppointment && (
          <>
            <div className="border-t border-gray-200 -mx-6 mt-4 mb-4"></div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 mt-0.5"
                >
                  <path 
                    d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" 
                    stroke="#16A34A" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M7.5 10L9.16667 11.6667L12.5 8.33333" 
                    stroke="#16A34A" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Tour Scheduled</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    {formatAppointmentDate(userAppointment.date)}
                  </p>
                  <p className="text-sm text-gray-700">
                    {userAppointment.time} with {agentName}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleReschedule}
                  className="flex-1 bg-white border border-green-300 text-green-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-50 transition-colors"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="flex-1 bg-white border border-red-300 text-red-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Cancel Confirmation Modal */}
      <Dialog open={showCancelModal} onClose={() => setShowCancelModal(false)} className="relative z-50">
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
              <div>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-600 size-6"
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
                    Cancel Tour
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to cancel your scheduled tour for{' '}
                      {userAppointment && formatAppointmentDate(userAppointment.date)} at{' '}
                      {userAppointment?.time}? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex w-full justify-center rounded-md bg-gradient-to-br from-red-800 to-orange-950 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:from-red-600 hover:to-orange-850 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:col-start-2"
                >
                  Cancel Tour
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                  Keep Tour
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PropertyCard;