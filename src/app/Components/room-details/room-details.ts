import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { MeetingService } from '../../Services/meeting-service';
import { RoomResponse } from '../../Model/room-response';

@Component({
  imports: [],
  selector: 'app-room-details',
  styleUrl: './room-details.css',
  templateUrl: './room-details.html',
})
export class RoomDetails implements OnInit {
  private meetingService = inject(MeetingService);

  rooms = signal<RoomResponse[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  activeRoomCount = computed(() => this.rooms().filter(room => room.isActive).length);
  selectedRoomId = signal<number | null>(null);
  roomSelected = output<RoomResponse>(); 
  
  ngOnInit() {
    this.loadRooms();
  }

  selectRoom(room: RoomResponse) {
    if (!room.isActive) return; // can't book a room that isn't available
    this.selectedRoomId.set(room.id);
    this.roomSelected.emit(room);
  }

  loadRooms(){
    this.meetingService.getAllRooms().subscribe({
      next: (rooms) => this.rooms.set(rooms),
      error: () => this.errorMessage.set('Could not load rooms. Please try again'),
    });
  }
}
