// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class DeleteMemory extends APIResource {
  /**
   * Removes a specific memory entry from storage. This operation is permanent and
   * cannot be undone.
   *
   * @example
   * ```ts
   * const deleteMemory = await client.deleteMemory.create({
   *   memoryId: '01jxanr45haeswhay4n0q8340y',
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
  create(body: DeleteMemoryCreateParams, options?: RequestOptions): APIPromise<DeleteMemoryCreateResponse> {
    return this._client.post('/v1/delete_memory', { body, ...options });
  }
}

export interface DeleteMemoryCreateResponse {
  /**
   * Indicates whether the deletion was successful
   */
  success?: boolean;
}

export interface DeleteMemoryCreateParams {
  /**
   * Unique identifier of the memory entry to delete
   */
  memoryId: string;

  /**
   * Unique session identifier for the working memory instance
   */
  sessionId: string;

  /**
   * Smart memory locator for targeting the correct smart memory instance
   */
  smartMemoryLocation: unknown | DeleteMemoryCreateParams.SmartMemory;
}

export namespace DeleteMemoryCreateParams {
  export interface SmartMemory {
    /**
     * **EXAMPLE** {"name":"memory-name","application_name":"demo","version":"1234"}
     * **REQUIRED** FALSE
     */
    smartMemory: Shared.LiquidmetalV1alpha1SmartMemoryName;
  }
}

export declare namespace DeleteMemory {
  export {
    type DeleteMemoryCreateResponse as DeleteMemoryCreateResponse,
    type DeleteMemoryCreateParams as DeleteMemoryCreateParams,
  };
}
