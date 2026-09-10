"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Clock, Edit2, Trash2, Check, X, Loader2 } from "lucide-react";

interface TimeSlot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  isBooked: boolean;
  isAvailable: boolean;
  consultationType: string;
  notes?: string;
  bookedBy?: {
    ownerName: string;
    email: string;
    petName: string;
  };
}

export default function AdminTimeSlotsPage() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  
  // Fetch time slots
  const fetchTimeSlots = async () => {
    setLoading(true);
    try {
      const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
      const response = await fetch(`/api/admin/timeslots?key=${key}`);
      if (response.ok) {
        const data = await response.json();
        setTimeSlots(data);
      }
    } catch (error) {
      console.error("Failed to fetch time slots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  // Delete slot
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this time slot?")) return;
    
    try {
      const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
      const response = await fetch(`/api/admin/timeslots/${id}?key=${key}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchTimeSlots();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete time slot");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete time slot");
    }
  };

  // Group slots by date
  const slotsByDate = timeSlots.reduce((acc, slot) => {
    const date = new Date(slot.date).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const sortedDates = Object.keys(slotsByDate).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-primary-900 mb-2">
              Time Slot Management
            </h1>
            <p className="text-ink-600">
              Create and manage appointment time slots
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowBulkModal(true)}
              className="px-6 py-3 bg-primary-100 text-primary-900 rounded-xl font-semibold hover:bg-primary-200 transition-colors"
            >
              Bulk Create
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Time Slot
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-primary-200">
            <div className="text-2xl font-bold text-primary-900 mb-1">
              {timeSlots.length}
            </div>
            <div className="text-sm text-ink-600">Total Slots</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-accent-200">
            <div className="text-2xl font-bold text-accent-700 mb-1">
              {timeSlots.filter(s => !s.isBooked && s.isAvailable).length}
            </div>
            <div className="text-sm text-ink-600">Available</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
            <div className="text-2xl font-bold text-green-700 mb-1">
              {timeSlots.filter(s => s.isBooked).length}
            </div>
            <div className="text-sm text-ink-600">Booked</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
            <div className="text-2xl font-bold text-red-700 mb-1">
              {timeSlots.filter(s => !s.isAvailable).length}
            </div>
            <div className="text-sm text-ink-600">Disabled</div>
          </div>
        </div>

        {/* Time Slots List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary-700 animate-spin" />
          </div>
        ) : timeSlots.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-primary-200">
            <Calendar className="w-16 h-16 text-ink-300 mx-auto mb-4" />
            <h3 className="font-display text-xl text-primary-900 mb-2">
              No time slots yet
            </h3>
            <p className="text-ink-600 mb-6">
              Create your first time slot to start accepting bookings
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors"
            >
              Create Time Slot
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map(date => (
              <div key={date} className="bg-white rounded-2xl border-2 border-primary-200 overflow-hidden">
                <div className="bg-primary-50 px-6 py-4 border-b-2 border-primary-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-700" />
                    <h3 className="font-display text-lg text-primary-900">
                      {new Date(date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </h3>
                    <span className="ml-auto text-sm text-ink-600">
                      {slotsByDate[date].length} slot{slotsByDate[date].length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {slotsByDate[date]
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map(slot => (
                        <div
                          key={slot._id}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            slot.isBooked
                              ? 'bg-green-50 border-green-200'
                              : !slot.isAvailable
                              ? 'bg-red-50 border-red-200'
                              : 'bg-primary-50 border-primary-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary-700" />
                              <span className="font-bold text-primary-900">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            
                            <div className="flex gap-1">
                              {!slot.isBooked && (
                                <button
                                  onClick={() => setEditingSlot(slot)}
                                  className="p-1.5 hover:bg-white rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4 text-primary-700" />
                                </button>
                              )}
                              {!slot.isBooked && (
                                <button
                                  onClick={() => handleDelete(slot._id)}
                                  className="p-1.5 hover:bg-white rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-ink-600">Duration:</span>
                              <span className="font-semibold text-ink-900">{slot.duration} min</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-ink-600">Type:</span>
                              <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded-full">
                                {slot.consultationType}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-ink-600">Status:</span>
                              {slot.isBooked ? (
                                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  Booked
                                </span>
                              ) : !slot.isAvailable ? (
                                <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-full flex items-center gap-1">
                                  <X className="w-3 h-3" />
                                  Disabled
                                </span>
                              ) : (
                                <span className="text-xs font-semibold text-accent-700 bg-accent-100 px-2 py-1 rounded-full">
                                  Available
                                </span>
                              )}
                            </div>
                            
                            {slot.isBooked && slot.bookedBy && (
                              <div className="mt-3 pt-3 border-t border-green-200">
                                <div className="text-xs text-ink-600">Booked by:</div>
                                <div className="font-semibold text-ink-900 text-sm">
                                  {slot.bookedBy.ownerName}
                                </div>
                                <div className="text-xs text-ink-600">
                                  Pet: {slot.bookedBy.petName}
                                </div>
                              </div>
                            )}
                            
                            {slot.notes && (
                              <div className="mt-2 text-xs text-ink-600 italic">
                                Note: {slot.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateSlotModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchTimeSlots();
          }}
        />
      )}

      {/* Bulk Create Modal */}
      {showBulkModal && (
        <BulkCreateModal
          onClose={() => setShowBulkModal(false)}
          onSuccess={() => {
            setShowBulkModal(false);
            fetchTimeSlots();
          }}
        />
      )}

      {/* Edit Modal */}
      {editingSlot && (
        <EditSlotModal
          slot={editingSlot}
          onClose={() => setEditingSlot(null)}
          onSuccess={() => {
            setEditingSlot(null);
            fetchTimeSlots();
          }}
        />
      )}
    </div>
  );
}

// Create Single Slot Modal Component
function CreateSlotModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "09:00",
    endTime: "10:00",
    duration: 60,
    consultationType: "all",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
      const response = await fetch(`/api/admin/timeslots?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create time slot");
      }
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create time slot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="font-display text-2xl text-primary-900 mb-6">Create Time Slot</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Start Time
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                End Time
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              required
              min="15"
              step="15"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Consultation Type
            </label>
            <select
              value={formData.consultationType}
              onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
            >
              <option value="all">All Types</option>
              <option value="discovery">Discovery Session</option>
              <option value="behavior-essentials">Behavior Essentials</option>
              <option value="behavior-intensive">Behavior Intensive</option>
              <option value="puppy-foundations">Puppy Foundations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-ink-100 text-ink-900 rounded-xl font-semibold hover:bg-ink-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Slot"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Bulk Create Modal (simplified version - you can expand this)
function BulkCreateModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    daysOfWeek: [] as number[],
    timeSlots: [{ startTime: "09:00", endTime: "10:00", duration: 60 }],
    consultationType: "all",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate all slots
      const slots: any[] = [];
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        if (formData.daysOfWeek.length === 0 || formData.daysOfWeek.includes(dayOfWeek)) {
          formData.timeSlots.forEach(timeSlot => {
            slots.push({
              date: new Date(d).toISOString().split('T')[0],
              startTime: timeSlot.startTime,
              endTime: timeSlot.endTime,
              duration: timeSlot.duration,
              consultationType: formData.consultationType,
            });
          });
        }
      }

      const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
      const response = await fetch(`/api/admin/timeslots?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulkCreate: true, slots }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Created ${result.created} slots${result.errors > 0 ? ` (${result.errors} duplicates skipped)` : ''}`);
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create time slots");
      }
    } catch (error) {
      console.error("Bulk create error:", error);
      alert("Failed to create time slots");
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day: number) => {
    setFormData(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day]
    }));
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="font-display text-2xl text-primary-900 mb-6">Bulk Create Time Slots</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                End Date
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Days of Week (leave empty for all days)
            </label>
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(index)}
                  className={`px-2 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    formData.daysOfWeek.includes(index)
                      ? 'bg-primary-700 text-white'
                      : 'bg-primary-100 text-primary-900 hover:bg-primary-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Time Slots Per Day
            </label>
            {formData.timeSlots.map((slot, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="time"
                  required
                  value={slot.startTime}
                  onChange={(e) => {
                    const newSlots = [...formData.timeSlots];
                    newSlots[index].startTime = e.target.value;
                    setFormData({ ...formData, timeSlots: newSlots });
                  }}
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-primary-200 focus:border-primary-700 outline-none text-sm"
                />
                <input
                  type="time"
                  required
                  value={slot.endTime}
                  onChange={(e) => {
                    const newSlots = [...formData.timeSlots];
                    newSlots[index].endTime = e.target.value;
                    setFormData({ ...formData, timeSlots: newSlots });
                  }}
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-primary-200 focus:border-primary-700 outline-none text-sm"
                />
                <input
                  type="number"
                  required
                  min="15"
                  step="15"
                  value={slot.duration}
                  onChange={(e) => {
                    const newSlots = [...formData.timeSlots];
                    newSlots[index].duration = parseInt(e.target.value);
                    setFormData({ ...formData, timeSlots: newSlots });
                  }}
                  className="w-20 px-3 py-2 rounded-lg border-2 border-primary-200 focus:border-primary-700 outline-none text-sm"
                  placeholder="min"
                />
                {formData.timeSlots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        timeSlots: formData.timeSlots.filter((_, i) => i !== index)
                      });
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                timeSlots: [...formData.timeSlots, { startTime: "09:00", endTime: "10:00", duration: 60 }]
              })}
              className="text-sm text-primary-700 font-semibold hover:text-primary-800 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Time Slot
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Consultation Type
            </label>
            <select
              value={formData.consultationType}
              onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none"
            >
              <option value="all">All Types</option>
              <option value="discovery">Discovery Session</option>
              <option value="behavior-essentials">Behavior Essentials</option>
              <option value="behavior-intensive">Behavior Intensive</option>
              <option value="puppy-foundations">Puppy Foundations</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-ink-100 text-ink-900 rounded-xl font-semibold hover:bg-ink-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Slots"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Edit Slot Modal (simplified)
function EditSlotModal({ 
  slot, 
  onClose, 
  onSuccess 
}: { 
  slot: TimeSlot; 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    isAvailable: slot.isAvailable,
    notes: slot.notes || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
      const response = await fetch(`/api/admin/timeslots/${slot._id}?key=${key}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update time slot");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update time slot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full"
      >
        <h2 className="font-display text-2xl text-primary-900 mb-6">Edit Time Slot</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-primary-50 rounded-xl p-4 mb-4">
            <div className="text-sm text-ink-600 mb-1">Time Slot</div>
            <div className="font-bold text-primary-900">
              {new Date(slot.date).toLocaleDateString('en-GB')} • {slot.startTime} - {slot.endTime}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-5 h-5 text-primary-700 rounded focus:ring-2 focus:ring-primary-700"
              />
              <span className="text-sm font-semibold text-primary-900">
                Slot is available for booking
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-primary-200 focus:border-primary-700 outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-ink-100 text-ink-900 rounded-xl font-semibold hover:bg-ink-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary-700 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
