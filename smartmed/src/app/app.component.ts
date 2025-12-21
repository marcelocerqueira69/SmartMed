import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartmed';

  redirect(page: string) {
    this.router.navigate(['medication', page])
  }

  constructor(private router: Router) {

  }
}
