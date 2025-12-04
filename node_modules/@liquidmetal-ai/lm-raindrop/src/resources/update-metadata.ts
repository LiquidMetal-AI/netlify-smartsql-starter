// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class UpdateMetadata extends APIResource {
  /**
   * Updates database schema metadata manually. Allows for explicit metadata
   * management when automatic detection is insufficient or needs correction.
   *
   * Use cases:
   *
   * - Manual schema corrections
   * - Bulk metadata updates
   * - Custom metadata annotations
   *
   * @example
   * ```ts
   * const updateMetadata = await client.updateMetadata.update({
   *   smartSqlLocation: {
   *     smartSql: {
   *       name: 'analytics-sql',
   *       version: 'v1.2.0',
   *       application_name: 'data-analytics-app',
   *     },
   *   },
   *   tables: [{}],
   * });
   * ```
   */
  update(
    body: UpdateMetadataUpdateParams,
    options?: RequestOptions,
  ): APIPromise<UpdateMetadataUpdateResponse> {
    return this._client.post('/v1/update_metadata', { body, ...options });
  }
}

export interface UpdateMetadataUpdateResponse {
  /**
   * Indicates whether the update was successful
   */
  success?: boolean;

  /**
   * Number of tables updated
   */
  tablesUpdated?: number;
}

export interface UpdateMetadataUpdateParams {
  /**
   * Smart SQL locator for targeting the correct smart SQL instance
   */
  smartSqlLocation: unknown | UpdateMetadataUpdateParams.SmartSql;

  /**
   * Table metadata to update or create
   */
  tables: Array<UpdateMetadataUpdateParams.Table>;

  /**
   * Update mode: replace (overwrite), merge (preserve existing), or append (only new
   * entries)
   */
  mode?:
    | 'UPDATE_MODE_UNSPECIFIED'
    | 'UPDATE_MODE_REPLACE'
    | 'UPDATE_MODE_MERGE'
    | 'UPDATE_MODE_APPEND'
    | null;
}

export namespace UpdateMetadataUpdateParams {
  export interface SmartSql {
    /**
     * Name-based smart SQL instance identifier (recommended)
     */
    smartSql: SmartSql.SmartSql;
  }

  export namespace SmartSql {
    /**
     * Name-based smart SQL instance identifier (recommended)
     */
    export interface SmartSql {
      /**
       * The name of the smart SQL instance
       */
      name: string;

      /**
       * Optional application name that owns this smart SQL instance
       */
      applicationName?: string | null;

      /**
       * Optional version identifier for the smart SQL instance
       */
      version?: string | null;
    }
  }

  export interface Table {
    /**
     * List of column information for the table
     */
    columns?: Array<Table.Column>;

    /**
     * When this table metadata was created
     */
    createdAt?: string | null;

    /**
     * Name of the database table
     */
    tableName?: string;

    /**
     * When this table metadata was last updated
     */
    updatedAt?: string | null;
  }

  export namespace Table {
    export interface Column {
      /**
       * Name of the database column
       */
      columnName?: string;

      /**
       * Data type of the column
       */
      dataType?: string;

      /**
       * Whether the column is a primary key
       */
      isPrimaryKey?: boolean;

      /**
       * Whether the column can contain null values
       */
      nullable?: boolean;

      /**
       * Sample data for AI context (nullable)
       */
      sampleData?: string | null;
    }
  }
}

export declare namespace UpdateMetadata {
  export {
    type UpdateMetadataUpdateResponse as UpdateMetadataUpdateResponse,
    type UpdateMetadataUpdateParams as UpdateMetadataUpdateParams,
  };
}
