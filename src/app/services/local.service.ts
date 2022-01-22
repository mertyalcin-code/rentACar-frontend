import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private storageService: StorageService) { }
  // Set the json data to local storage
  setJsonValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }
  // Get the json value from local storage
  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }
  // Clear the local storage
  clearToken() {
    return this.storageService.secureStorage.clear();
  }
}
