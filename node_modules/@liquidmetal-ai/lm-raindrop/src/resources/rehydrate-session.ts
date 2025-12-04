// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class RehydrateSession extends APIResource {
  /**
   * Rehydrates a previous session from episodic memory storage. Allows resuming work
   * from where a previous session left off by restoring either all memories or just
   * a summary of the previous session.
   *
   * @example
   * ```ts
   * const response = await client.rehydrateSession.rehydrate({
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
  rehydrate(
    body: RehydrateSessionRehydrateParams,
    options?: RequestOptions,
  ): APIPromise<RehydrateSessionRehydrateResponse> {
    return this._client.post('/v1/rehydrate_session', { body, ...options });
  }
}

export interface RehydrateSessionRehydrateResponse {
  /**
   * Operation status: 'initiated' for async processing, 'failed' for immediate
   * failure
   */
  operation?: string;

  /**
   * Storage key for checking async operation status (optional)
   */
  statusKey?: string | null;

  /**
   * Indicates whether the rehydration was successful
   */
  success?: boolean;
}

export interface RehydrateSessionRehydrateParams {
  /**
   * Session identifier to restore from episodic memory
   */
  sessionId: string;

  /**
   * Smart memory locator for targeting the correct smart memory instance
   */
  smartMemoryLocation: unknown | RehydrateSessionRehydrateParams.SmartMemory;

  /**
   * If true, only restore a summary. If false, restore all memories
   */
  summaryOnly?: boolean | null;
}

export namespace RehydrateSessionRehydrateParams {
  export interface SmartMemory {
    /**
     * **EXAMPLE** {"name":"memory-name","application_name":"demo","version":"1234"}
     * **REQUIRED** FALSE
     */
    smartMemory: Shared.LiquidmetalV1alpha1SmartMemoryName;
  }
}

export declare namespace RehydrateSession {
  export {
    type RehydrateSessionRehydrateResponse as RehydrateSessionRehydrateResponse,
    type RehydrateSessionRehydrateParams as RehydrateSessionRehydrateParams,
  };
}
