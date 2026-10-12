import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRequest } from '../Model/booking-request';

@Service()
export class BookingService {
    private http = inject(HttpClient);
    private baseUrl = "https://localhost:7006/api/Booking";

    getAllBookings(): Observable<BookingRequest[]> {
        return this.http.get<BookingRequest[]>(this.baseUrl);
    }

    createBooking(booking: BookingRequest): Observable<BookingRequest> {
        return this.http.post<BookingRequest>(this.baseUrl, booking)
    }
}
