// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as QueryAPI from './query/query';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class DocumentStatusBulk extends APIResource {
  /**
   * Get the indexing status for multiple documents in a single request. This is
   * significantly more efficient than making individual GetDocumentStatus calls, as
   * it searches shards once and returns status for all requested documents.
   *
   * @example
   * ```ts
   * const response =
   *   await client.documentStatusBulk.getStatusBulk({
   *     bucketLocation:
   *       '{{"bucket": {{"name": "my-smartbucket", "version": "01jxanr45haeswhay4n0q8340y", "application_name": "my-app"}}}}',
   *     objectIds: [
   *       'document1.pdf',
   *       'document2.pdf',
   *       'document3.pdf',
   *     ],
   *   });
   * ```
   */
  getStatusBulk(
    body: DocumentStatusBulkGetStatusBulkParams,
    options?: RequestOptions,
  ): APIPromise<DocumentStatusBulkGetStatusBulkResponse> {
    return this._client.post('/v1/document_status_bulk', { body, ...options });
  }
}

export interface DocumentStatusBulkGetStatusBulkResponse {
  /**
   * Status information for each requested document, keyed by object_id
   */
  documents?: Array<DocumentStatusBulkGetStatusBulkResponse.Document>;
}

export namespace DocumentStatusBulkGetStatusBulkResponse {
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

export interface DocumentStatusBulkGetStatusBulkParams {
  /**
   * The storage bucket containing the target documents
   */
  bucketLocation: QueryAPI.BucketLocator;

  /**
   * List of document identifiers (object keys) to get status for
   */
  objectIds: Array<string>;

  /**
   * Optional partition identifier for multi-tenant data isolation. Defaults to
   * 'default' if not specified
   */
  partition?: string | null;
}

export declare namespace DocumentStatusBulk {
  export {
    type DocumentStatusBulkGetStatusBulkResponse as DocumentStatusBulkGetStatusBulkResponse,
    type DocumentStatusBulkGetStatusBulkParams as DocumentStatusBulkGetStatusBulkParams,
  };
}
