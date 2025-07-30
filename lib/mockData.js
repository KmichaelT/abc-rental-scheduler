// Mock data for apartment tour scheduling
// Single agent (John Doe) - 30min tours with 15min buffer between sessions

// Generate hourly time slots from 9 AM to 5 PM (simpler approach)
export const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM (last slot at 5:00 PM)
  
  for (let hour = startHour; hour <= endHour; hour++) {
    const timeString = hour <= 12 ? `${hour}:00 ${hour === 12 ? 'PM' : 'AM'}` : `${hour - 12}:00 PM`;
    slots.push(timeString);
  }
  
  return slots;
};

export const timeSlots = generateTimeSlots();

// localStorage keys
const BOOKINGS_KEY = 'apartmentTourBookings';
const USER_APPOINTMENT_KEY = 'userScheduledAppointment';

// Get bookings from localStorage
export const getStoredBookings = () => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return {};
  }
};

// Save booking to localStorage
export const saveBooking = (date, time) => {
  if (typeof window === 'undefined') return;
  try {
    const bookings = getStoredBookings();
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (!bookings[dateKey]) {
      bookings[dateKey] = [];
    }
    
    if (!bookings[dateKey].includes(time)) {
      bookings[dateKey].push(time);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    }
  } catch (error) {
    console.error('Error saving booking to localStorage:', error);
  }
};

// Generate mock bookings with urgency - more bookings on closer dates
const generateMockBookings = () => {
  const mockBookings = {};
  const today = new Date();
  
  // Add mock bookings for the next 14 days with decreasing availability for closer dates
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    if (date.getDay() !== 0) { // Not Sunday
      let numBookings;
      
      // Create urgency by booking more slots on closer dates
      if (i <= 2) { // Next 3 days - high urgency
        numBookings = Math.floor(Math.random() * 2) + 6; // 6-7 bookings out of 9 slots
      } else if (i <= 5) { // Days 3-6 - medium urgency  
        numBookings = Math.floor(Math.random() * 2) + 4; // 4-5 bookings
      } else if (i <= 9) { // Days 6-10 - some urgency
        numBookings = Math.floor(Math.random() * 2) + 2; // 2-3 bookings
      } else { // Days 10+ - more availability
        numBookings = Math.floor(Math.random() * 2) + 1; // 1-2 bookings
      }
      
      // Ensure we don't book more slots than available
      numBookings = Math.min(numBookings, timeSlots.length);
      
      const bookedSlots = [];
      const availableSlots = [...timeSlots];
      
      for (let j = 0; j < numBookings; j++) {
        if (availableSlots.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableSlots.length);
          const selectedSlot = availableSlots.splice(randomIndex, 1)[0];
          bookedSlots.push(selectedSlot);
        }
      }
      
      if (bookedSlots.length > 0) {
        mockBookings[dateKey] = bookedSlots;
      }
    }
  }
  
  return mockBookings;
};

const mockBookings = generateMockBookings();

// Helper function to get availability for a specific date
export const getDateAvailability = (date) => {
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  // Check if it's Sunday (no tours)
  if (date.getDay() === 0) {
    return {
      available: 0,
      total: timeSlots.length,
      percentage: 0,
      status: 'unavailable'
    };
  }
  
  // Get bookings from localStorage and mock data
  const storedBookings = getStoredBookings();
  const allBookings = [...(storedBookings[dateKey] || []), ...(mockBookings[dateKey] || [])];
  const uniqueBookings = [...new Set(allBookings)]; // Remove duplicates
  
  const available = timeSlots.length - uniqueBookings.length;
  const total = timeSlots.length;
  const percentage = total > 0 ? (available / total) * 100 : 0;
  
  return {
    available,
    total,
    percentage,
    status: available === 0 ? 'unavailable' : percentage <= 25 ? 'limited' : 'good'
  };
};

// Helper function to get time slot availability for a specific date
export const getTimeSlotAvailability = (date) => {
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  // Get bookings from localStorage and mock data
  const storedBookings = getStoredBookings();
  const allBookings = [...(storedBookings[dateKey] || []), ...(mockBookings[dateKey] || [])];
  const uniqueBookings = [...new Set(allBookings)]; // Remove duplicates
  
  const availability = {};
  
  timeSlots.forEach(slot => {
    // Sunday or booked slots are unavailable
    availability[slot] = date.getDay() !== 0 && !uniqueBookings.includes(slot);
  });
  
  return availability;
};

// Generate business days (excluding Sundays) starting from a given date
export const generateBusinessDays = (startDate, count = 6) => {
  const days = [];
  let currentDate = new Date(startDate);
  
  while (days.length < count) {
    if (currentDate.getDay() !== 0) { // Skip Sundays
      days.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};

// User appointment management functions
export const getUserAppointment = () => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(USER_APPOINTMENT_KEY);
    if (stored) {
      const appointment = JSON.parse(stored);
      // Convert date string back to Date object
      appointment.date = new Date(appointment.date);
      return appointment;
    }
    return null;
  } catch (error) {
    console.error('Error reading user appointment from localStorage:', error);
    return null;
  }
};

export const saveUserAppointment = (date, time) => {
  if (typeof window === 'undefined') return;
  try {
    const appointment = {
      date: date.toISOString(),
      time,
      scheduledAt: new Date().toISOString()
    };
    localStorage.setItem(USER_APPOINTMENT_KEY, JSON.stringify(appointment));
    
    // Also save to bookings to block the slot
    saveBooking(date, time);
  } catch (error) {
    console.error('Error saving user appointment to localStorage:', error);
  }
};

export const cancelUserAppointment = () => {
  if (typeof window === 'undefined') return null;
  try {
    const appointment = getUserAppointment();
    if (appointment) {
      // Remove from localStorage
      localStorage.removeItem(USER_APPOINTMENT_KEY);
      
      // TODO: In a real app, you'd want to remove from bookings too
      // For now, we'll leave the slot blocked to maintain consistency
      
      return appointment;
    }
    return null;
  } catch (error) {
    console.error('Error canceling user appointment:', error);
    return null;
  }
};