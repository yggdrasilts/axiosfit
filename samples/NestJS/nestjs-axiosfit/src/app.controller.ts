import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Observable } from '@yggdrasilts/axiosfit';

import { BugService } from './shared/bug.service';
import { Bug } from './shared/bug';

@Controller('nestjs-axiosfit')
export class AppController {
  constructor(private readonly bugService: BugService) {}

  @Get()
  getIssues(): Observable<Bug[]> {
    return this.bugService.getIssues();
  }

  @Get(':id')
  getIssue(@Param('id') id: string): Observable<Bug> {
    return this.bugService.getIssue(id);
  }

  @Post()
  createBug(@Body() bug: Bug): Observable<Bug> {
    return this.bugService.createBug(bug);
  }

  @Put()
  updateBug(@Param(':id') id: string, @Body() bug: Bug): Observable<Bug> {
    return this.bugService.updateBug(id, bug);
  }

  @Delete()
  deleteBug(@Param(':id') id: string): Observable<void> {
    return this.bugService.deleteBug(id);
  }
}
