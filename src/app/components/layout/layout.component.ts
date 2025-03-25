import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MaterialModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
