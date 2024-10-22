import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp({
      projectId: "fir-ionic-project-7f8c2",
      appId: "1:769063483414:web:0b402d09efd31d324dca57",
      storageBucket: "fir-ionic-project-dc52e.appspot.com",
      apiKey: "AIzaSyB621en7sfWalLcbfmW84uWPP6JOy9IXGw",
      authDomain: "fir-ionic-project-dc52e.firebaseapp.com",
      messagingSenderId: "769063383314"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
});
