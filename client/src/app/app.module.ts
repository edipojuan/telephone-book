import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Routing } from './app.routes';
import { AuthGuard } from './guards/auth.guard';
import { httpInterceptorProviders } from './interceptors/http-interceptor.providers';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

import { AuthService } from './services/auth.service';
import { TelephoneBookService } from './services/telephone-book.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeNewComponent } from './home/home-new/home-new.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent, HomeNewComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Routing,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [AuthService, TelephoneBookService, AuthGuard, httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [HomeNewComponent]
})
export class AppModule {}
