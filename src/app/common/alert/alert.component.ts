import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    console.log("Calling init function");
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      this.hideAlert();
    });
  }
  closeAlert() {
    this.message = ''
  }
  async hideAlert() {
    await this.timeout(30000);
    this.message = ''

  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
