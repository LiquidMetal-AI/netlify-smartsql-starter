// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class SemanticMemory extends APIResource {
  /**
   * Searches across semantic memory documents using natural language queries. Uses
   * vector embeddings and semantic similarity to find relevant knowledge documents
   * regardless of exact keyword matches.
   *
   * @example
   * ```ts
   * const response = await client.query.semanticMemory.search({
   *   needle: 'AI development best practices',
   *   smartMemoryLocation: {
   *     smartMemory: {
   *       name: 'memory-name',
   *       application_name: 'demo',
   *       version: '1234',
   *     },
   *   },
   * });
   * ```
   */
  search(
    body: SemanticMemorySearchParams,
    options?: RequestOptions,
  ): APIPromise<SemanticMemorySearchResponse> {
    return this._client.post('/v1/search_semantic_memory', { body, ...options });
  }
}

export interface SemanticMemorySearchResponse {
  /**
   * Search results with matching documents
   */
  documentSearchResponse?: SemanticMemorySearchResponse.DocumentSearchResponse | null;

  /**
   * Error message if the search failed
   */
  error?: string | null;

  /**
   * Indicates whether the search was performed successfully
   */
  success?: boolean;
}

export namespace SemanticMemorySearchResponse {
  /**
   * Search results with matching documents
   */
  export interface DocumentSearchResponse {
    /**
     * List of matching documents ordered by relevance
     */
    results?: Array<DocumentSearchResponse.Result>;
  }

  export namespace DocumentSearchResponse {
    export interface Result {
      /**
       * Unique signature for this search result chunk
       */
      chunkSignature?: string | null;

      /**
       * Embedding vector information (if available)
       */
      embed?: string | null;

      /**
       * Payload signature for the original document
       */
      payloadSignature?: string | null;

      /**
       * Relevance score for this search result
       */
      score?: number | null;

      /**
       * Source reference for the matched content
       */
      source?: string | null;

      /**
       * Matched text content from the document
       */
      text?: string | null;

      /**
       * Type of the matched content
       */
      type?: string | null;
    }
  }
}

export interface SemanticMemorySearchParams {
  /**
   * Natural language search query to find relevant documents
   */
  needle: string;

  /**
   * Smart memory locator for targeting the correct smart memory instance
   */
  smartMemoryLocation: unknown | SemanticMemorySearchParams.SmartMemory;
}

export namespace SemanticMemorySearchParams {
  export interface SmartMemory {
    /**
     * **EXAMPLE** {"name":"memory-name","application_name":"demo","version":"1234"}
     * **REQUIRED** FALSE
     */
    smartMemory: Shared.LiquidmetalV1alpha1SmartMemoryName;
  }
}

export declare namespace SemanticMemory {
  export {
    type SemanticMemorySearchResponse as SemanticMemorySearchResponse,
    type SemanticMemorySearchParams as SemanticMemorySearchParams,
  };
}
