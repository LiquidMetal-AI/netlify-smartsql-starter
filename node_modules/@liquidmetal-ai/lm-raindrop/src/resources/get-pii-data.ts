// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class GetPiiData extends APIResource {
  /**
   * Retrieves PII detection results for specific database records. Returns detailed
   * information about detected personally identifiable information for compliance
   * and auditing purposes.
   *
   * PII information includes:
   *
   * - Entity types detected
   * - Confidence scores
   * - Character positions
   * - Detection timestamps
   *
   * @example
   * ```ts
   * const getPiiData = await client.getPiiData.retrieve({
   *   smartSqlLocation: {
   *     smartSql: {
   *       name: 'analytics-sql',
   *       version: 'v1.2.0',
   *       application_name: 'data-analytics-app',
   *     },
   *   },
   *   tableName: 'users',
   * });
   * ```
   */
  retrieve(body: GetPiiDataRetrieveParams, options?: RequestOptions): APIPromise<GetPiiDataRetrieveResponse> {
    return this._client.post('/v1/get_pii_data', { body, ...options });
  }
}

export interface GetPiiDataRetrieveResponse {
  /**
   * List of PII detection results
   */
  piiDetections?: Array<GetPiiDataRetrieveResponse.PiiDetection>;
}

export namespace GetPiiDataRetrieveResponse {
  export interface PiiDetection {
    /**
     * When the PII detection was performed
     */
    detectedAt?: string;

    /**
     * Unique identifier for this PII detection record
     */
    detectionId?: string;

    /**
     * List of detected PII entities
     */
    entities?: Array<PiiDetection.Entity>;

    /**
     * Record identifier within the table
     */
    recordId?: string;

    /**
     * Table name where PII was detected
     */
    tableName?: string;
  }

  export namespace PiiDetection {
    export interface Entity {
      /**
       * Confidence score for this detection (0.0 to 1.0)
       */
      confidenceScore?: number;

      /**
       * The detected text/token
       */
      detectedText?: string;

      /**
       * End character position in the original text
       */
      endPosition?: number;

      /**
       * Type of PII entity detected
       */
      entityType?: string;

      /**
       * Start character position in the original text
       */
      startPosition?: number;

      /**
       * Token index in the tokenized text
       */
      tokenIndex?: number;
    }
  }
}

export interface GetPiiDataRetrieveParams {
  /**
   * Smart SQL locator for targeting the correct smart SQL instance
   */
  smartSqlLocation: unknown | GetPiiDataRetrieveParams.SmartSql;

  /**
   * Table name to retrieve PII data from
   */
  tableName: string;

  /**
   * Optional record identifier to filter PII data
   */
  recordId?: string | null;
}

export namespace GetPiiDataRetrieveParams {
  export interface SmartSql {
    /**
     * Name-based smart SQL instance identifier (recommended)
     */
    smartSql: SmartSql.SmartSql;
  }

  export namespace SmartSql {
    /**
     * Name-based smart SQL instance identifier (recommended)
     */
    export interface SmartSql {
      /**
       * The name of the smart SQL instance
       */
      name: string;

      /**
       * Optional application name that owns this smart SQL instance
       */
      applicationName?: string | null;

      /**
       * Optional version identifier for the smart SQL instance
       */
      version?: string | null;
    }
  }
}

export declare namespace GetPiiData {
  export {
    type GetPiiDataRetrieveResponse as GetPiiDataRetrieveResponse,
    type GetPiiDataRetrieveParams as GetPiiDataRetrieveParams,
  };
}
