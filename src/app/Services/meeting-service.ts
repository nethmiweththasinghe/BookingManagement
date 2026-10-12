import { inject, Service } from '@angular/core';
import { RoomResponse } from '../Model/room-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class MeetingService {
    private http = inject(HttpClient);
    private readonly baseUrl = 'https://localhost:7006/api/Rooms';

    getAllRooms(): Observable<RoomResponse[]>{
        return this.http.get<RoomResponse[]>(this.baseUrl);
    }

}
