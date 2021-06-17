import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public authService: AuthService
  ) { }
}
