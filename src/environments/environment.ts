// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: 'dev',
  customerPolicy: 'https://localhost:8080',
  customerPolicyInquiry: 'http://localhost:8080',
  customerPolicyAdd: 'http://localhost:9082',
  customerPolicyUpdate: 'http://localhost:8080',

  motorInquiry: 'http://localhost:8080',
  motorAdd: 'http://localhost:9082',
  motorUpdate: 'http://localhost:8080',
  motorDelete: 'http://localhost:8080',


  endowmentInquiry: 'http://localhost:8080',
  endowmentAdd: 'http://localhost:9082',
  endowmentUpdate: 'http://localhost:8080',
  endowmentDelete: 'http://localhost:8080',

  houseInquiry: 'http://localhost:8080',
  houseAdd: 'http://localhost:9082',
  houseUpdate: 'http://localhost:8080',
  houseDelete: 'http://localhost:8080',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
