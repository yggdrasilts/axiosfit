import { Injectable, Logger } from '@nestjs/common';

import { Axiosfit, Observable, throwError } from '@yggdrasilts/axiosfit';
import { map, catchError } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';

import { Bug } from './bug';
import { RestBugService } from './bug.axiosfit.service';

@Injectable()
export class BugService {
  private restBugService: RestBugService;

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.restBugService = new Axiosfit<RestBugService>()
      .baseUrl(this.configService.get('DATABASE_URL'))
      .create(RestBugService);
  }

  // POST
  createBug(data): Observable<Bug> {
    return this.restBugService.createBug(data).pipe(
      map(axiosResponse => axiosResponse.data),
      catchError(this.errorHandl),
    );
  }

  // GET
  getIssue(id): Observable<Bug> {
    return this.restBugService.getIssue(id).pipe(
      map(axiosResponse => axiosResponse.data),
      catchError(this.errorHandl),
    );
  }

  // GET
  getIssues(): Observable<Bug[]> {
    return this.restBugService.getIssues().pipe(
      map(axiosResponse => axiosResponse.data),
      catchError(this.errorHandl),
    );
  }

  // PUT
  updateBug(id, data): Observable<Bug> {
    return this.restBugService.updateBug(id, data).pipe(
      map(axiosResponse => axiosResponse.data),
      catchError(this.errorHandl),
    );
  }

  // DELETE
  deleteBug(id) {
    return this.restBugService.deleteBug(id).pipe(
      map(axiosResponse => axiosResponse.data),
      catchError(this.errorHandl),
    );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.logger.error(errorMessage);
    return throwError(errorMessage);
  }
}
