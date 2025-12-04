// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as Shared from '../shared';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class EpisodicMemory extends APIResource {
  /**
   * Searches across episodic memory documents stored in the SmartBucket. Allows
   * finding relevant past sessions based on natural language queries. Returns
   * summaries and metadata from stored episodic memory sessions.
   *
   * @example
   * ```ts
   * const response = await client.query.episodicMemory.search({
   *   smartMemoryLocation: {
   *     smartMemory: {
   *       name: 'memory-name',
   *       application_name: 'demo',
   *       version: '1234',
   *     },
   *   },
   *   terms: 'sessions about user interface preferences',
   * });
   * ```
   */
  search(
    body: EpisodicMemorySearchParams,
    options?: RequestOptions,
  ): APIPromise<EpisodicMemorySearchResponse> {
    return this._client.post('/v1/search_episodic_memory', { body, ...options });
  }
}

export interface EpisodicMemorySearchResponse {
  /**
   * List of matching episodic memory entries ordered by relevance
   */
  entries?: Array<EpisodicMemorySearchResponse.Entry>;

  /**
   * Pagination information for the search results
   */
  pagination?: EpisodicMemorySearchResponse.Pagination | null;
}

export namespace EpisodicMemorySearchResponse {
  export interface Entry {
    /**
     * Agent that created this episodic memory
     */
    agent?: string;

    /**
     * When this episodic memory was created
     */
    createdAt?: string;

    /**
     * Duration of the session in milliseconds
     */
    duration?: number | string;

    /**
     * Number of individual memory entries in this session
     */
    entryCount?: number;

    /**
     * Relevance score for this search result
     */
    score?: number | null;

    /**
     * Session identifier for this episodic memory
     */
    sessionId?: string;

    /**
     * AI-generated summary of the session
     */
    summary?: string;

    /**
     * Number of different timelines in this session
     */
    timelineCount?: number;
  }

  /**
   * Pagination information for the search results
   */
  export interface Pagination {
    /**
     * Whether there are more results available
     */
    hasMore?: boolean;

    /**
     * Current page number
     */
    page?: number;

    /**
     * Number of results per page
     */
    pageSize?: number;

    /**
     * Total number of results available
     */
    total?: number;

    /**
     * Total number of pages available
     */
    totalPages?: number;
  }
}

export interface EpisodicMemorySearchParams {
  /**
   * Smart memory locator for targeting the correct smart memory instance
   */
  smartMemoryLocation: unknown | EpisodicMemorySearchParams.SmartMemory;

  /**
   * Natural language search query to find relevant episodic memory sessions
   */
  terms: string;

  /**
   * End time for temporal filtering
   */
  endTime?: string | null;

  /**
   * Maximum number of most recent results to return
   */
  nMostRecent?: number | null;

  /**
   * Start time for temporal filtering
   */
  startTime?: string | null;
}

export namespace EpisodicMemorySearchParams {
  export interface SmartMemory {
    /**
     * **EXAMPLE** {"name":"memory-name","application_name":"demo","version":"1234"}
     * **REQUIRED** FALSE
     */
    smartMemory: Shared.LiquidmetalV1alpha1SmartMemoryName;
  }
}

export declare namespace EpisodicMemory {
  export {
    type EpisodicMemorySearchResponse as EpisodicMemorySearchResponse,
    type EpisodicMemorySearchParams as EpisodicMemorySearchParams,
  };
}
