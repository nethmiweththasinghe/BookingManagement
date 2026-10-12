export interface BookingRequest {
  bookingId: number;
  roomId: number;
  staffId: number;
  bookingDate: string;
  bookingTime: string;
  meetingHours: number;
  title: string;
  noAttendees: number;
  status: string;
  createdTime: string;
}
