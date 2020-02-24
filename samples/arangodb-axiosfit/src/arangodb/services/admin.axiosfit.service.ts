import { AxiosResponse, HTTP, GET } from '@yggdrasilts/axiosfit';

import { Status } from '../entities/administration/status.entity';

@HTTP({ usePromises: true, enableAxiosLogger: true })
export class AdminService {
  /**
   * Return status information.
   *
   * @returns {Promise<AxiosResponse<Status>>} {@link Status}
   * @memberof AdminService
   */
  @GET('/_admin/status')
  public getStatus(): Promise<AxiosResponse<Status>> {
    return null;
  }
}
