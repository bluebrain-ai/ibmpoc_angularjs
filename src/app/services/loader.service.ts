import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  showloader() {
    this.keepAfterNavigationChange = true;
    this.subject.next(true);
  }
  hideLoader() {
    this.keepAfterNavigationChange = true;
    this.subject.next(false);
  }
  activateLoader(): Observable<any> {
    return this.subject.asObservable();
  }


}
