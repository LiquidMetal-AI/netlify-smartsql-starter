// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class GetMemory extends APIResource {
  /**
   * Retrieves memories based on timeline, key, or temporal criteria. Supports
   * filtering by specific timelines, time ranges, and limiting results to the most
   * recent entries.
   *
   * Query capabilities:
   *
   * - Timeline-specific retrieval
   * - Key-based lookup
   * - Temporal range queries
   * - Most recent N entries
   *
   * @example
   * ```ts
   * const getMemory = await client.getMemory.retrieve({
   *   sessionId: '01jxanr45haeswhay4n0q8340y',
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
  retrieve(body: GetMemoryRetrieveParams, options?: RequestOptions): APIPromise<GetMemoryRetrieveResponse> {
    return this._client.post('/v1/get_memory', { body, ...options });
  }
}

export interface GetMemoryRetrieveResponse {
  /**
   * List of matching memory entries
   */
  memories?: Array<GetMemoryRetrieveResponse.Memory>;
}

export namespace GetMemoryRetrieveResponse {
  export interface Memory {
    /**
     * Unique identifier for this memory entry
     */
    id?: string;

    /**
     * Optional agent identifier
     */
    agent?: string | null;

    /**
     * When this memory was created
     */
    at?: string | null;

    /**
     * Agent that created this memory
     */
    by?: string;

    /**
     * The actual memory content
     */
    content?: string;

    /**
     * What triggered this memory creation
     */
    dueTo?: string;

    /**
     * Optional key for direct retrieval
     */
    key?: string | null;

    /**
     * Session identifier where this memory was created
     */
    sessionId?: string;

    /**
     * Timeline this memory belongs to
     */
    timeline?: string;
  }
}

export interface GetMemoryRetrieveParams {
  /**
   * Unique session identifier for the working memory instance
   */
  sessionId: string;

  /**
   * Smart memory locator for targeting the correct smart memory instance
   */
  smartMemoryLocation: unknown | GetMemoryRetrieveParams.SmartMemory;

  /**
   * End time for temporal filtering
   */
  endTime?: string | null;

  /**
   * Specific key to retrieve
   */
  key?: string | null;

  /**
   * Maximum number of most recent memories to return
   */
  nMostRecent?: number | null;

  /**
   * Start time for temporal filtering
   */
  startTime?: string | null;

  /**
   * Timeline to filter memories
   */
  timeline?: string | null;
}

export namespace GetMemoryRetrieveParams {
  export interface SmartMemory {
    /**
     * **EXAMPLE** {"name":"memory-name","application_name":"demo","version":"1234"}
     * **REQUIRED** FALSE
     */
    smartMemory: Shared.LiquidmetalV1alpha1SmartMemoryName;
  }
}

export declare namespace GetMemory {
  export {
    type GetMemoryRetrieveResponse as GetMemoryRetrieveResponse,
    type GetMemoryRetrieveParams as GetMemoryRetrieveParams,
  };
}
