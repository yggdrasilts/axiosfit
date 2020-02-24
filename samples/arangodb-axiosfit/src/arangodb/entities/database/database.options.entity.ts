import { ReplicationFactor } from '../common/replication.factor.entity';

export interface DatabaseOptions {
  replicationFactor: ReplicationFactor;
  writeConcern: number;
  sharding: string;
}
