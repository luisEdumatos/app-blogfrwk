import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/security/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  constructor(private tokenStorageService: TokenStorageService) { }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
