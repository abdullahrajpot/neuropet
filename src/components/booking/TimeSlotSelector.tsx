"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";

interface TimeSlot {
  _id: string;
  date: Date | string;
  startTime: string;
  endTime: string;
  duration: number;
  isBooked: boolean;
  isAvailable: boolean;
  consultationType?: string;
}

interface TimeSlotSelectorProps {
  consultationType: string;
  onSlotSelect: (slotId: string, date: Date, startTime: string, endTime: string) => void;
  selectedSlotId?: string;
}

export function TimeSlotSelector({ 
  consultationType, 
  onSlotSelect,
  selectedSlotId 
}: TimeSlotSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(selectedSlotId || null);

  // Fetch available time slots
  const fetchTimeSlots = async () => {
    setLoading(true);
    try {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
      
      const response = await fetch(
        `/api/timeslots/available?startDate=${startOfMonth.toISOString()}&endDate=${endOfMonth.toISOString()}&consultationType=${consultationType}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data.slots || []);
      }
    } catch (error) {
      console.error("Failed to fetch time slots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, [currentMonth, consultationType]);

  // Get dates that have available slots
  const getDatesWithSlots = () => {
    const datesSet = new Set<string>();
    availableSlots.forEach(slot => {
      const date = new Date(slot.date);
      datesSet.add(date.toDateString());
    });
    return datesSet;
  };

  const datesWithSlots = getDatesWithSlots();

  // Get slots for selected date
  const getSlotsForDate = (date: Date) => {
    return availableSlots.filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.toDateString() === date.toDateString();
    });
  };

  // Calendar generation
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const monthDays = getDaysInMonth(currentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date: Date) => {
    if (datesWithSlots.has(date.toDateString())) {
      setSelectedDate(date);
    }
  };

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlot(slot._id);
    onSlotSelect(slot._id, new Date(slot.date), slot.startTime, slot.endTime);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
        </div>
        <div>
          <h3 className="font-display text-lg md:text-xl text-primary-900">Select Appointment Time</h3>
          <p className="text-xs md:text-sm text-ink-600">Choose your preferred date and time slot</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border-2 border-primary-200 p-4 md:p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-primary-700" />
          </button>
          
          <h4 className="font-display text-base md:text-lg text-primary-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-primary-700" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {dayNames.map(day => (
            <div
              key={day}
              className="text-center text-xs font-bold text-ink-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const hasSlots = datesWithSlots.has(date.toDateString());
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isTodayDate = isToday(date);
            const isPast = isPastDate(date);

            return (
              <motion.button
                key={date.toDateString()}
                whileHover={hasSlots && !isPast ? { scale: 1.05 } : {}}
                whileTap={hasSlots && !isPast ? { scale: 0.95 } : {}}
                onClick={() => !isPast && handleDateClick(date)}
                disabled={!hasSlots || isPast}
                className={`
                  relative aspect-square rounded-lg text-sm font-semibold transition-all flex items-center justify-center
                  ${isPast ? 'text-ink-300 cursor-not-allowed bg-ink-50' : ''}
                  ${!hasSlots && !isPast ? 'text-ink-400 hover:bg-ink-50 cursor-not-allowed' : ''}
                  ${hasSlots && !isPast && !isSelected ? 'text-primary-900 hover:bg-primary-50 border-2 border-primary-200 cursor-pointer bg-white' : ''}
                  ${isSelected ? 'bg-primary-700 text-white border-2 border-primary-700 shadow-md' : ''}
                  ${isTodayDate && !isSelected ? 'ring-2 ring-accent-500' : ''}
                `}
              >
                <span className="relative z-10">{date.getDate()}</span>
                {hasSlots && !isPast && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-700 rounded-full" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 pt-4 border-t border-ink-200">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-primary-700 rounded-full" />
            <span className="text-xs text-ink-600">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 border-2 border-accent-500 rounded-full" />
            <span className="text-xs text-ink-600">Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-ink-300 rounded-full" />
            <span className="text-xs text-ink-600">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Time Slots for Selected Date */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border-2 border-primary-200 p-4 md:p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary-700 flex-shrink-0" />
              <h4 className="font-display text-base md:text-lg text-primary-900">
                Available Times for {selectedDate.toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </h4>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-primary-700 animate-spin" />
              </div>
            ) : (
              <>
                {getSlotsForDate(selectedDate).length === 0 ? (
                  <p className="text-center text-ink-600 py-8">
                    No time slots available for this date.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                    {getSlotsForDate(selectedDate).map((slot) => {
                      const isSlotSelected = selectedSlot === slot._id;
                      
                      return (
                        <motion.button
                          key={slot._id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSlotClick(slot)}
                          className={`
                            relative p-3 md:p-4 rounded-xl font-semibold text-sm transition-all
                            ${isSlotSelected
                              ? 'bg-gradient-to-br from-primary-700 to-primary-800 text-white shadow-lg'
                              : 'bg-primary-50 text-primary-900 hover:bg-primary-100 border-2 border-primary-200'
                            }
                          `}
                        >
                          <div className="flex flex-col items-center gap-0.5 md:gap-1">
                            <span className="text-sm md:text-base font-bold">{slot.startTime}</span>
                            <span className="text-xs opacity-80">{slot.duration} min</span>
                          </div>
                          
                          {isSlotSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 bg-accent-500 rounded-full flex items-center justify-center shadow-md"
                            >
                              <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Slot Confirmation */}
      <AnimatePresence>
        {selectedSlot && selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl border-2 border-accent-200 p-4 md:p-6"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-base md:text-lg text-primary-900 mb-1">
                  Appointment Time Selected
                </h4>
                <p className="text-sm md:text-base text-ink-700">
                  {selectedDate.toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric'
                  })}
                  {' at '}
                  <span className="font-semibold">{availableSlots.find(s => s._id === selectedSlot)?.startTime}</span>
                </p>
                <p className="text-xs md:text-sm text-ink-600 mt-2">
                  You can proceed to the next step to confirm your booking.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
