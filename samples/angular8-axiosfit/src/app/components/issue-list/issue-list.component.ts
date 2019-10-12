import { Component, OnInit } from '@angular/core';
import { BugService } from '../../shared/bug.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issuesList: any = [];

  ngOnInit() {
    this.loadEmployees();
  }

  constructor(public bugService: BugService) {}

  // Issues list
  loadEmployees() {
    return this.bugService.getIssues().subscribe((data: {}) => {
      this.issuesList = data;
    });
  }

  // Delete issue
  deleteIusse(data) {
    const index = this.issuesList
      .map(x => {
        return x.issue_name;
      })
      .indexOf(data.issue_name);
    return this.bugService.deleteBug(data.id).subscribe(res => {
      this.issuesList.splice(index, 1);
      console.log('Issue deleted!');
    });
  }
}
