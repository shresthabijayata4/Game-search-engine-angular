import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-video-game-db';

  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
}
