import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class MockApiService implements InMemoryDbService {
  createDb(): any {
    const devices = [
      { id: '1', name: 'Device 1', manufacturer: 'Manufacturer A', url: '/device/1' },
      { id: '2', name: 'Device 2', manufacturer: 'Manufacturer B', url: '/device/2' },
    ];

    const commands = [
      { operation: 'Operation 1', description: 'Description of operation 1', command: 'Command 1', result: 'Result 1', format: 'Format 1' },
      { operation: 'Operation 2', description: 'Description of operation 2', command: 'Command 2', result: 'Result 2', format: 'Format 2' },
    ];

    return { devices, commands };
  }

}
