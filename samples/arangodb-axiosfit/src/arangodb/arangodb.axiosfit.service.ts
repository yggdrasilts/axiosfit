import { Injectable, Inject, Logger } from '@nestjs/common';

import { Axiosfit } from '@yggdrasilts/axiosfit';

import * as Characters from '../../test/resources/GameOfThrones/Characters.json';
import * as Traits from '../../test/resources/GameOfThrones/Traits.json';
import * as ChildOf from '../../test/resources/GameOfThrones/ChildOf.json';
import * as Locations from '../../test/resources/GameOfThrones/Locations.json';

import { CollectionType, QueryType } from './entities';

import { AdminService, DatabaseService, CollectionService, BulkService } from './services';

@Injectable()
export class ArangoDBService {
  private readonly logger = new Logger(ArangoDBService.name);

  private readonly db = 'GameOfThrones';
  private readonly collections: { name: string; type: CollectionType; data: object[] }[] = [
    { name: 'Characters', type: CollectionType.DOCUMENT, data: Characters },
    { name: 'Traits', type: CollectionType.DOCUMENT, data: Traits },
    { name: 'ChildOf', type: CollectionType.EDGES, data: ChildOf },
    { name: 'Locations', type: CollectionType.DOCUMENT, data: Locations },
  ];

  public adminService: AdminService;
  public databaseService: DatabaseService;
  public collectionService: CollectionService;
  public bulkService: BulkService;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    // Initialize ArangoDB services
    this.adminService = new Axiosfit<AdminService>().baseUrl(baseUrl).create(AdminService);
    this.databaseService = new Axiosfit<DatabaseService>().baseUrl(baseUrl).create(DatabaseService);
    this.collectionService = new Axiosfit<CollectionService>().baseUrl(baseUrl).create(CollectionService);
    this.bulkService = new Axiosfit<BulkService>().baseUrl(baseUrl).create(BulkService);
  }

  initGOTData() {
    const databaseResponse = await this.databaseService.createDatabase({ name: this.db });
    if (databaseResponse.data.error) {
      this.logger.error(`Error creating database '${this.db}'`, databaseResponse.data.errorMessage);
      throw new Error(`Problems creating database '${this.db}'. ${databaseResponse.data.errorMessage}`);
    }
    this.logger.debug(`Database ${this.db} created.`);

    for (const collection of this.collections) {
      const createCollectionResponse = await this.collectionService.createCollection(this.db, {
        name: collection.name,
        type: collection.type,
      });
      if (createCollectionResponse.data.error) {
        this.logger.error(`Error creating collection '${collection.name}'.`);
        throw new Error(`Error creating collection '${collection.name}'.`);
      }
      const collectionInfo = await this.collectionService.getCollectionInfo(this.db, collection.name);
      if (collectionInfo.data.error) {
        this.logger.error(`Error checking collection '${collection.name}'.`);
        throw new Error(`Error checking collection '${collection.name}'.`);
      }
      const bulkImportResponse = await this.bulkService.importJson(
        this.db,
        { type: QueryType.LIST, collection: collection.name },
        collection.data,
      );
      if (bulkImportResponse.data.error) {
        this.logger.error(`Error importing data for collection '${collection.name}'.`);
        throw new Error(`Error importing data for collection '${collection.name}'.`);
      }
    }
  }
  }
}
