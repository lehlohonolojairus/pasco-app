import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App } from './app';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, CommonModule, RouterModule.forRoot(routes)],
  exports: [App],
  bootstrap: [App],
})
export class AppModule {}
