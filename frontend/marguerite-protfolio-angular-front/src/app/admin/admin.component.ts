import {Component, OnInit} from '@angular/core';
import {GenericHttpClient} from "../../lib/requests/generic-http-client";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: false
})
export class AdminComponent implements OnInit {

  authenticated: boolean = true

  constructor() {}

  ngOnInit(): void {
    this.authenticated = GenericHttpClient.getBearer() !== null
  }

}
