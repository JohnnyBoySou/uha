import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'd9f8c85aa05cdb0f75c4af010f51f858b7b991ed',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'uha-342a5',
    storageBucket: 'project-id.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
