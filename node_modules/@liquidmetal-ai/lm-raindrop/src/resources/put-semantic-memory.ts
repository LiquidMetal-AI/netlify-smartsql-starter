// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class PutSemanticMemory extends APIResource {
  /**
   * Stores a semantic memory document for long-term knowledge retrieval. Semantic
   * memory is used for storing structured knowledge, facts, and information that can
   * be searched and retrieved across different sessions.
   *
   * @example
   * ```ts
   * const putSemanticMemory =
   *   await client.putSemanticMemory.create({
   *     document: 'document',
   *     smartMemoryLocation: {
   *       smartMemory: {
   *         name: 'memory-name',
   *         application_name: 'demo',
   *         version: '1234',
   *       },
   *     },
   *   });
   * ```
   */
  create(
    body: PutSemanticMemoryCreateParams,
    options?: RequestOptions,
  ): APIPromise<PutSemanticMemoryCreateResponse> {
    return this._client.post('/v1/put_semantic_memory', { body, ...options });
  }
}

export interface PutSemanticMemoryCreateResponse {
  /**
   * Error message if the operation failed
   */
  error?: string | null;

  /**
   * Unique object identifier for the stored document
   */
  objectId?: string | null;

  /**
   * Indicates whether the document was stored successfully
   */
  success?: boolean;
}

export interface PutSemanticMemoryCreateParams {
  /**
   * JSON-encoded document content to store in semantic memory
   */
  document: string;

  /**
   * Smart memory locator for targeting the correct smart memory instance
   */
  smartMemoryLocation: unknown | PutSemanticMemoryCreateParams.SmartMemory;
}

export namespace PutSemanticMemoryCreateParams {
  export interface SmartMemory {
    /**
     * **EXAMPLE** {"name":"memory-name","application_name":"demo","version":"1234"}
     * **REQUIRED** FALSE
     */
    smartMemory: Shared.LiquidmetalV1alpha1SmartMemoryName;
  }
}

export declare namespace PutSemanticMemory {
  export {
    type PutSemanticMemoryCreateResponse as PutSemanticMemoryCreateResponse,
    type PutSemanticMemoryCreateParams as PutSemanticMemoryCreateParams,
  };
}
