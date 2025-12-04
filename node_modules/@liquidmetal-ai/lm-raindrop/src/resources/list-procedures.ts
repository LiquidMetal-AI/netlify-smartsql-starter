// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ListProcedures extends APIResource {
  /**
   * Lists all procedures stored in procedural memory. Returns metadata about each
   * procedure including creation and modification times.
   *
   * @example
   * ```ts
   * const listProcedure = await client.listProcedures.create({
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
  create(body: ListProcedureCreateParams, options?: RequestOptions): APIPromise<ListProcedureCreateResponse> {
    return this._client.post('/v1/list_procedures', { body, ...options });
  }
}

export interface ListProcedureCreateResponse {
  /**
   * List of all stored procedures
   */
  procedures?: Array<ListProcedureCreateResponse.Procedure>;
}

export namespace ListProcedureCreateResponse {
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

export interface ListProcedureCreateParams {
  /**
   * Smart memory locator for targeting the correct smart memory instance
   */
  smartMemoryLocation: unknown | ListProcedureCreateParams.SmartMemory;

  /**
   * Optional procedural memory ID to use for actor isolation
   */
  proceduralMemoryId?: string | null;
}

export namespace ListProcedureCreateParams {
  export interface SmartMemory {
    /**
     * **EXAMPLE** {"name":"memory-name","application_name":"demo","version":"1234"}
     * **REQUIRED** FALSE
     */
    smartMemory: Shared.LiquidmetalV1alpha1SmartMemoryName;
  }
}

export declare namespace ListProcedures {
  export {
    type ListProcedureCreateResponse as ListProcedureCreateResponse,
    type ListProcedureCreateParams as ListProcedureCreateParams,
  };
}
