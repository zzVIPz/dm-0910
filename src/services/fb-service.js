import * as firebase from 'firebase/app';
import 'firebase/database';

export default class FirebaseService {
  _firebaseConfig = {
    apiKey: 'AIzaSyAe-E4h21eWIMsiCLuW9qJ-5bjNDJdJI0s',
    authDomain: 'dm-0910.firebaseapp.com',
    databaseURL: 'https://dm-0910.firebaseio.com',
    projectId: 'dm-0910',
    storageBucket: 'dm-0910.appspot.com',
    messagingSenderId: '450497879081',
    appId: '1:450497879081:web:e46425b69170b49ced1038',
    measurementId: 'G-4MG04CPLX7',
  };

  constructor() {
    this.firebaseConfig = this._firebaseConfig;
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
  }

  addCompany(name, address, phone, registrationDate, siteUrl) {
    const newCompanyRef = name.push();
    this.database.ref(`companies/${newCompanyRef}`).set({
      address,
      phone,
      registrationDate,
      siteUrl,
    });
  }
}
