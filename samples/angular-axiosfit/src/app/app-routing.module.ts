import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-issue' },
  { path: 'add-issue', component: AddIssueComponent },
  { path: 'edit-issue/:id', component: EditIssueComponent },
  { path: 'issues-list', component: IssueListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
