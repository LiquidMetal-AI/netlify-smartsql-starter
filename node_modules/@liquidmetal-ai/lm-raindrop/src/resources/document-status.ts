// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as QueryAPI from './query/query';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class DocumentStatus extends APIResource {
  /**
   * Get the indexing status of a document by its object key. This endpoint returns
   * the current indexing status of a document including progress through various
   * processing stages.
   *
   * @example
   * ```ts
   * const response = await client.documentStatus.getStatus({
   *   bucketLocation:
   *     '{{"bucket": {{"name": "my-smartbucket", "version": "01jxanr45haeswhay4n0q8340y", "application_name": "my-app"}}}}',
   *   objectId: 'document.pdf',
   * });
   * ```
   */
  getStatus(
    body: DocumentStatusGetStatusParams,
    options?: RequestOptions,
  ): APIPromise<DocumentStatusGetStatusResponse> {
    return this._client.post('/v1/document_status', { body, ...options });
  }
}

export interface DocumentStatusGetStatusResponse {
  /**
   * Embedding stage information
   */
  embedding?: DocumentStatusGetStatusResponse.Embedding | null;

  /**
   * Any errors encountered during indexing
   */
  errors?: Array<string>;

  /**
   * Ingest stage information
   */
  ingest?: DocumentStatusGetStatusResponse.Ingest | null;

  /**
   * PII detection stage information
   */
  pii?: DocumentStatusGetStatusResponse.Pii | null;

  /**
   * Relationships stage information
   */
  relationships?: DocumentStatusGetStatusResponse.Relationships | null;

  /**
   * Overall document status
   */
  status?: string;

  /**
   * Vector index stage information
   */
  vectorIndex?: DocumentStatusGetStatusResponse.VectorIndex | null;
}

export namespace DocumentStatusGetStatusResponse {
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

export interface DocumentStatusGetStatusParams {
  /**
   * The storage bucket containing the target document
   */
  bucketLocation: QueryAPI.BucketLocator;

  /**
   * Document identifier within the bucket (object key)
   */
  objectId: string;

  /**
   * Optional partition identifier for multi-tenant data isolation. Defaults to
   * 'default' if not specified
   */
  partition?: string | null;
}

export declare namespace DocumentStatus {
  export {
    type DocumentStatusGetStatusResponse as DocumentStatusGetStatusResponse,
    type DocumentStatusGetStatusParams as DocumentStatusGetStatusParams,
  };
}
