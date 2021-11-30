// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: 'dev',
  customerPolicyInquiry: 'http://localhost:9981',
  customerPolicyAdd: 'http://localhost:9982',
  customerPolicyUpdate: 'http://localhost:9983',

  motorInquiry: 'http://localhost:9984',
  motorAdd: 'http://localhost:9985',
  motorUpdate: 'http://localhost:9987',
  motorDelete: 'http://localhost:9986',

  endowmentInquiry: 'http://localhost:9984',
  endowmentAdd: 'http://localhost:9985',
  endowmentUpdate: 'http://localhost:9987',
  endowmentDelete: 'http://localhost:9986',

  houseInquiry: 'http://localhost:9984',
  houseAdd: 'http://localhost:9985',
  houseUpdate: 'http://localhost:9987',
  houseDelete: 'http://localhost:9986',

  commercialInquiry: 'http://localhost:9984',
  commercialAdd: 'http://localhost:9985',
  commercialDelete: 'http://localhost:9986',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
