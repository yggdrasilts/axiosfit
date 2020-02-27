import { Role } from '../common/role.enum';

export interface ServerInfo {
  maintenance: boolean;
  role: Role;
  writeOpsEnable: boolean;
}
