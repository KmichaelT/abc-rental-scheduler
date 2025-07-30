import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const BookingModals = ({
  showReplaceModal,
  setShowReplaceModal,
  pendingAppointment,
  setPendingAppointment,
  setSelectedTime,
  completeScheduling,
  showSuccessModal,
  setShowSuccessModal,
  successMessage
}) => {
  return (
    <>
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
                      className="inline-flex w-full justify-center rounded-md bg-gradient-to-br from-sky-600 to-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-sky-700 hover:to-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:col-start-2"
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
                      className="inline-flex w-full justify-center rounded-md bg-gradient-to-br from-sky-600 to-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-sky-700 hover:to-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
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
    </>
  );
};

export default BookingModals;