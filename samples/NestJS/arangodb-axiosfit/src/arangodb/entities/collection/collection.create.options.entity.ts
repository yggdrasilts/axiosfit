import { ReplicationFactor, MinReplicationFactor, CollectionType, KeyOptions } from '../common';

export interface CollectionCreateOptions {
  name: string;
  type: CollectionType;
  journalSize?: number;
  replicationFactor?: ReplicationFactor;
  minReplicationFactor?: MinReplicationFactor;
  keyOptions?: KeyOptions;
  waitForSync?: boolean;
  doCompact?: boolean;
  isVolatile?: boolean;
  shardKeys?: string[];
  numberOfShards?: number;
  isSystem?: boolean;
  indexBuckets?: number;
  distributeShardsLike?: string;

  shardingStrategy?: string; // cluster option
  smartJoinAttribute?: string; // enterprise option
}
