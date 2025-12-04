// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class GetMetadata extends APIResource {
  /**
   * Retrieves database schema metadata for a smart SQL instance. Returns table
   * structures, column information, and sample data that can be used for AI context
   * or application development.
   *
   * Metadata includes:
   *
   * - Table names and structures
   * - Column names and data types
   * - Sample data for AI context
   * - Schema versioning information
   *
   * @example
   * ```ts
   * const getMetadata = await client.getMetadata.retrieve({
   *   smartSqlLocation: {
   *     smartSql: {
   *       name: 'analytics-sql',
   *       version: 'v1.2.0',
   *       application_name: 'data-analytics-app',
   *     },
   *   },
   * });
   * ```
   */
  retrieve(
    body: GetMetadataRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<GetMetadataRetrieveResponse> {
    return this._client.post('/v1/get_metadata', { body, ...options });
  }
}

export interface GetMetadataRetrieveResponse {
  /**
   * Timestamp when metadata was last updated
   */
  lastUpdated?: string | null;

  /**
   * List of table metadata entries
   */
  tables?: Array<GetMetadataRetrieveResponse.Table>;
}

export namespace GetMetadataRetrieveResponse {
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

export interface GetMetadataRetrieveParams {
  /**
   * Smart SQL locator for targeting the correct smart SQL instance
   */
  smartSqlLocation: unknown | GetMetadataRetrieveParams.SmartSql;

  /**
   * Optional table name to filter metadata
   */
  tableName?: string | null;
}

export namespace GetMetadataRetrieveParams {
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
}

export declare namespace GetMetadata {
  export {
    type GetMetadataRetrieveResponse as GetMetadataRetrieveResponse,
    type GetMetadataRetrieveParams as GetMetadataRetrieveParams,
  };
}
