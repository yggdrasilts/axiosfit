import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Service */
import { BugService } from './shared/bug.service';

/* Forms module */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddIssueComponent,
    EditIssueComponent,
    IssueListComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [BugService],
  bootstrap: [AppComponent]
})
export class AppModule {}
