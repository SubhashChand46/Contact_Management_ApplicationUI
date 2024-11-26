import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { RootRoutingModule } from './root-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NoWhitespaceDirective } from './directive/no-whitespace.directive';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenIntercepterInterceptor } from './authentication/token-intercepter.interceptor';



@NgModule({
  declarations: [
    RootComponent,
    NoWhitespaceDirective
  ],
  imports: [
    BrowserModule, RootRoutingModule, CommonModule, HttpClientModule, FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }), BrowserAnimationsModule
  ],
  exports: [NoWhitespaceDirective, ToastrModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenIntercepterInterceptor,
    multi: true
  }],
  bootstrap: [RootComponent]
})
export class RootModule { }
