// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Procedures extends APIResource {
  /**
   * Searches procedures using text matching across keys and values. Supports
   * filtering by procedure keys, values, or both with fuzzy matching and relevance
   * scoring.
   *
   * TODO: Future enhancement will include vector search for semantic similarity.
   *
   * @example
   * ```ts
   * const response = await client.query.procedures.search({
   *   smartMemoryLocation: {
   *     smartMemory: {
   *       name: 'memory-name',
   *       application_name: 'demo',
   *       version: '1234',
   *     },
   *   },
   *   terms: 'system prompt',
   * });
   * ```
   */
  search(body: ProcedureSearchParams, options?: RequestOptions): APIPromise<ProcedureSearchResponse> {
    return this._client.post('/v1/search_procedures', { body, ...options });
  }
}

export interface ProcedureSearchResponse {
  /**
   * List of matching procedures ordered by relevance
   */
  procedures?: Array<ProcedureSearchResponse.Procedure>;
}

export namespace ProcedureSearchResponse {
  export interface Procedure {
    /**
     * When this procedure was first created
     */
    createdAt?: string;

    /**
     * Unique key for this procedure
     */
    key?: string;

    /**
     * When this procedure was last updated
     */
    updatedAt?: string;

    /**
     * The procedure content
     */
    value?: string;
  }
}

export interface ProcedureSearchParams {
  /**
   * Smart memory locator for targeting the correct smart memory instance
   */
  smartMemoryLocation: unknown | ProcedureSearchParams.SmartMemory;

  /**
   * Search terms to match against procedure keys and values
   */
  terms: string;

  /**
   * Maximum number of results to return
   */
  nMostRecent?: number | null;

  /**
   * Optional procedural memory ID to use for actor isolation
   */
  proceduralMemoryId?: string | null;

  /**
   * Whether to search in procedure keys
   */
  searchKeys?: boolean | null;

  /**
   * Whether to search in procedure values
   */
  searchValues?: boolean | null;
}

export namespace ProcedureSearchParams {
  export interface SmartMemory {
    /**
     * **EXAMPLE** {"name":"memory-name","application_name":"demo","version":"1234"}
     * **REQUIRED** FALSE
     */
    smartMemory: Shared.LiquidmetalV1alpha1SmartMemoryName;
  }
}

export declare namespace Procedures {
  export {
    type ProcedureSearchResponse as ProcedureSearchResponse,
    type ProcedureSearchParams as ProcedureSearchParams,
  };
}
