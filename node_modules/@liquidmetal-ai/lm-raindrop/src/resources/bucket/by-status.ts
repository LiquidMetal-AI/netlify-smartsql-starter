// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as QueryAPI from '../query/query';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class ByStatus extends APIResource {
  /**
   * List objects filtered by indexing status. Efficiently queries document storage
   * across all shards to find objects matching (or excluding) specified statuses.
   * Useful for identifying objects that need attention (e.g., failed, processing) or
   * tracking indexing progress.
   *
   * @example
   * ```ts
   * const response = await client.bucket.byStatus.listObjects({
   *   bucketLocation: {
   *     bucket: {
   *       name: 'my-smartbucket',
   *       version: '01jxanr45haeswhay4n0q8340y',
   *       application_name: 'my-app',
   *     },
   *   },
   *   statuses: ['failed', 'processing'],
   * });
   * ```
   */
  listObjects(
    body: ByStatusListObjectsParams,
    options?: RequestOptions,
  ): APIPromise<ByStatusListObjectsResponse> {
    return this._client.post('/v1/list_objects_by_status', { body, ...options });
  }
}

export interface ByStatusListObjectsResponse {
  /**
   * Documents matching the status filter with their full status information
   */
  documents?: Array<ByStatusListObjectsResponse.Document>;
}

export namespace ByStatusListObjectsResponse {
  export interface Document {
    /**
     * Embedding stage information
     */
    embedding?: Document.Embedding | null;

    /**
     * Any errors encountered during indexing
     */
    errors?: Array<string>;

    /**
     * Ingest stage information
     */
    ingest?: Document.Ingest | null;

    /**
     * Document identifier (object key)
     */
    objectId?: string;

    /**
     * PII detection stage information
     */
    pii?: Document.Pii | null;

    /**
     * Relationships stage information
     */
    relationships?: Document.Relationships | null;

    /**
     * Overall document status
     */
    status?: string;

    /**
     * Vector index stage information
     */
    vectorIndex?: Document.VectorIndex | null;
  }

  export namespace Document {
    /**
     * Embedding stage information
     */
    export interface Embedding {
      /**
       * Number of items remaining to be processed
       */
      itemsRemaining?: number;

      /**
       * Total number of items expected to be processed
       */
      totalExpected?: number;
    }

    /**
     * Ingest stage information
     */
    export interface Ingest {
      /**
       * Number of chunks queued for processing
       */
      chunksQueued?: number;

      /**
       * Whether chunk creation is complete
       */
      creationComplete?: boolean;

      /**
       * Total number of chunks created
       */
      totalChunksCreated?: number;
    }

    /**
     * PII detection stage information
     */
    export interface Pii {
      /**
       * Number of items remaining to be processed
       */
      itemsRemaining?: number;

      /**
       * Total number of items expected to be processed
       */
      totalExpected?: number;
    }

    /**
     * Relationships stage information
     */
    export interface Relationships {
      /**
       * Number of items remaining to be processed
       */
      itemsRemaining?: number;

      /**
       * Total number of items expected to be processed
       */
      totalExpected?: number;
    }

    /**
     * Vector index stage information
     */
    export interface VectorIndex {
      /**
       * Number of items remaining to be processed
       */
      itemsRemaining?: number;

      /**
       * Total number of items expected to be processed
       */
      totalExpected?: number;
    }
  }
}

export interface ByStatusListObjectsParams {
  /**
   * The storage bucket to query
   */
  bucketLocation: QueryAPI.BucketLocator;

  /**
   * Status values to filter by (e.g., "completed", "failed", "processing",
   * "ingesting", "partial", "uploading", "not_found")
   */
  statuses: Array<string>;

  /**
   * If true, returns objects NOT matching the specified statuses (inverts the
   * filter)
   */
  exclude?: boolean | null;

  /**
   * Partition to query (defaults to "default")
   */
  partition?: string | null;

  /**
   * Optional prefix to filter object keys (e.g., "documents/" to only search in
   * documents folder)
   */
  prefix?: string | null;
}

export declare namespace ByStatus {
  export {
    type ByStatusListObjectsResponse as ByStatusListObjectsResponse,
    type ByStatusListObjectsParams as ByStatusListObjectsParams,
  };
}
