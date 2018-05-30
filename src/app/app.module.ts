import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { RoutingModule } from './routing.module';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostModule } from './post/post.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    PostModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
