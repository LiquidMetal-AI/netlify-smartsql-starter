// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as QueryAPI from './query';
import * as Shared from '../shared';
import * as EpisodicMemoryAPI from './episodic-memory';
import { EpisodicMemory, EpisodicMemorySearchParams, EpisodicMemorySearchResponse } from './episodic-memory';
import * as MemoryAPI from './memory';
import { Memory, MemorySearchParams, MemorySearchResponse } from './memory';
import * as ProceduresAPI from './procedures';
import { ProcedureSearchParams, ProcedureSearchResponse, Procedures } from './procedures';
import * as SemanticMemoryAPI from './semantic-memory';
import { SemanticMemory, SemanticMemorySearchParams, SemanticMemorySearchResponse } from './semantic-memory';
import { APIPromise } from '../../core/api-promise';
import { PageNumber, type PageNumberParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';

export class Query extends APIResource {
  memory: MemoryAPI.Memory = new MemoryAPI.Memory(this._client);
  episodicMemory: EpisodicMemoryAPI.EpisodicMemory = new EpisodicMemoryAPI.EpisodicMemory(this._client);
  procedures: ProceduresAPI.Procedures = new ProceduresAPI.Procedures(this._client);
  semanticMemory: SemanticMemoryAPI.SemanticMemory = new SemanticMemoryAPI.SemanticMemory(this._client);

  /**
   * Chunk Search provides search capabilities that serve as a complete drop-in
   * replacement for traditional RAG pipelines. This system enables AI agents to
   * leverage private data stored in SmartBuckets with zero additional configuration.
   *
   * Each input query is processed by our AI agent to determine the best way to
   * search the data. The system will then return the most relevant results from the
   * data ranked by relevance on the input query.
   *
   * @example
   * ```ts
   * const response = await client.query.chunkSearch({
   *   bucketLocations: [
   *     {
   *       bucket: {
   *         name: 'my-smartbucket',
   *         version: '01jxanr45haeswhay4n0q8340y',
   *         application_name: 'my-app',
   *       },
   *     },
   *   ],
   *   input: 'Find documents about revenue in Q4 2023',
   *   requestId: '<YOUR-REQUEST-ID>',
   * });
   * ```
   */
  chunkSearch(body: QueryChunkSearchParams, options?: RequestOptions): APIPromise<QueryChunkSearchResponse> {
    return this._client.post('/v1/chunk_search', { body, ...options });
  }

  /**
   * Enables natural conversational interactions with documents stored in
   * SmartBuckets. This endpoint allows users to ask questions, request summaries,
   * and explore document content through an intuitive conversational interface. The
   * system understands context and can handle complex queries about document
   * contents.
   *
   * The query system maintains conversation context throught the request_id,
   * enabling follow-up questions and deep exploration of document content. It works
   * across all supported file types and automatically handles multi-page documents,
   * making complex file interaction as simple as having a conversation.
   *
   * The system will:
   *
   * - Maintain conversation history for context when using the same request_id
   * - Process questions against file content
   * - Generate contextual, relevant responses
   *
   * Document query is supported for all file types, including PDFs, images, and
   * audio files.
   *
   * @example
   * ```ts
   * const response = await client.query.documentQuery({
   *   bucketLocation: {
   *     bucket: {
   *       name: 'my-smartbucket',
   *       version: '01jxanr45haeswhay4n0q8340y',
   *       application_name: 'my-app',
   *     },
   *   },
   *   input: 'What are the key points in this document?',
   *   objectId: 'document.pdf',
   *   requestId: '<YOUR-REQUEST-ID>',
   * });
   * ```
   */
  documentQuery(
    body: QueryDocumentQueryParams,
    options?: RequestOptions,
  ): APIPromise<QueryDocumentQueryResponse> {
    return this._client.post('/v1/document_query', { body, ...options });
  }

  /**
   * Retrieve additional pages from a previous search. This endpoint enables
   * navigation through large result sets while maintaining search context and result
   * relevance. Retrieving paginated results requires a valid request_id from a
   * previously completed search.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const liquidmetalV1alpha1TextResult of client.query.getPaginatedSearch(
   *   { page: 1, pageSize: 10, requestId: '<YOUR-REQUEST-ID>' },
   * )) {
   *   // ...
   * }
   * ```
   */
  getPaginatedSearch(
    body: QueryGetPaginatedSearchParams,
    options?: RequestOptions,
  ): PagePromise<LiquidmetalV1alpha1TextResultsPageNumber, LiquidmetalV1alpha1TextResult> {
    return this._client.getAPIList('/v1/search_get_page', PageNumber<LiquidmetalV1alpha1TextResult>, {
      body,
      method: 'post',
      ...options,
    });
  }

  /**
   * Primary search endpoint that provides advanced search capabilities across all
   * document types stored in SmartBuckets.
   *
   * Supports recursive object search within objects, enabling nested content search
   * like embedded images, text content, and personally identifiable information
   * (PII).
   *
   * The system supports complex queries like:
   *
   * - 'Show me documents containing credit card numbers or social security numbers'
   * - 'Find images of landscapes taken during sunset'
   * - 'Get documents mentioning revenue forecasts from Q4 2023'
   * - 'Find me all PDF documents that contain pictures of a cat'
   * - 'Find me all audio files that contain information about the weather in SF in
   *   2024'
   *
   * Key capabilities:
   *
   * - Natural language query understanding
   * - Content-based search across text, images, and audio
   * - Automatic PII detection
   * - Multi-modal search (text, images, audio)
   *
   * @example
   * ```ts
   * const response = await client.query.search({
   *   bucketLocations: [
   *     {
   *       bucket: {
   *         name: 'my-smartbucket',
   *         version: '01jxanr45haeswhay4n0q8340y',
   *         application_name: 'my-app',
   *       },
   *     },
   *   ],
   *   input: 'All my files',
   *   requestId: '<YOUR-REQUEST-ID>',
   * });
   * ```
   */
  search(body: QuerySearchParams, options?: RequestOptions): APIPromise<QuerySearchResponse> {
    return this._client.post('/v1/search', { body, ...options });
  }

  /**
   * Generates intelligent summaries of search result pages, helping users quickly
   * understand large result sets without reading through every document. The system
   * analyzes the content of all results on a given page and generates a detailed
   * overview.
   *
   * The summary system:
   *
   * - Identifies key themes and topics
   * - Extracts important findings
   * - Highlights document relationships
   * - Provides content type distribution
   * - Summarizes metadata patterns
   *
   * This is particularly valuable when dealing with:
   *
   * - Large document collections
   * - Mixed content types
   * - Technical documentation
   * - Research materials
   *
   * @example
   * ```ts
   * const response = await client.query.sumarizePage({
   *   page: 1,
   *   pageSize: 10,
   *   requestId: '<YOUR-REQUEST-ID>',
   * });
   * ```
   */
  sumarizePage(
    body: QuerySumarizePageParams,
    options?: RequestOptions,
  ): APIPromise<QuerySumarizePageResponse> {
    return this._client.post('/v1/summarize_page', { body, ...options });
  }
}

export type LiquidmetalV1alpha1TextResultsPageNumber = PageNumber<LiquidmetalV1alpha1TextResult>;

export type BucketLocator = BucketLocator.Bucket | unknown;

export namespace BucketLocator {
  export interface Bucket {
    /**
     * **EXAMPLE** { name: 'my-smartbucket', version: '01jtryx2f2f61ryk06vd8mr91p',
     * application_name: 'my-app' } **REQUIRED** FALSE
     */
    bucket: QueryAPI.LiquidmetalV1alpha1BucketName;
  }
}

/**
 * BucketName represents a bucket name with version and application name
 */
export interface LiquidmetalV1alpha1BucketName {
  /**
   * The application name **EXAMPLE** "my-app" **REQUIRED** TRUE
   */
  applicationName: string;

  /**
   * The name of the bucket **EXAMPLE** "my-bucket" **REQUIRED** TRUE
   */
  name: string;

  /**
   * The version of the bucket **EXAMPLE** "01jtryx2f2f61ryk06vd8mr91p" **REQUIRED**
   * TRUE
   */
  version: string;
}

export interface LiquidmetalV1alpha1SourceResult {
  /**
   * The bucket information containing this result
   */
  bucket?: Shared.LiquidmetalV1alpha1BucketResponse;

  /**
   * The object key within the bucket
   */
  object?: string;
}

export interface LiquidmetalV1alpha1TextResult {
  /**
   * Unique identifier for this text segment. Used for deduplication and result
   * tracking
   */
  chunkSignature?: string | null;

  /**
   * Vector representation for similarity matching. Used in semantic search
   * operations
   */
  embed?: string | null;

  /**
   * Parent document identifier. Links related content chunks together
   */
  payloadSignature?: string | null;

  /**
   * Relevance score (0.0 to 1.0). Higher scores indicate better matches
   */
  score?: number | null;

  /**
   * Source document references. Contains bucket and object information
   */
  source?: LiquidmetalV1alpha1SourceResult;

  /**
   * The actual content of the result. May be a document excerpt or full content
   */
  text?: string | null;

  /**
   * Content MIME type. Helps with proper result rendering
   */
  type?: string | null;
}

export interface QueryChunkSearchResponse {
  /**
   * Ordered list of relevant text segments. Each result includes full context and
   * metadata
   */
  results?: Array<LiquidmetalV1alpha1TextResult>;
}

export interface QueryDocumentQueryResponse {
  /**
   * AI-generated response that may include direct document quotes, content
   * summaries, contextual explanations, references to specific sections, and related
   * content suggestions
   */
  answer?: string;
}

export interface QuerySearchResponse {
  /**
   * Pagination details for result navigation
   */
  pagination?: QuerySearchResponse.Pagination;

  /**
   * Matched results with metadata
   */
  results?: Array<LiquidmetalV1alpha1TextResult>;
}

export namespace QuerySearchResponse {
  /**
   * Pagination details for result navigation
   */
  export interface Pagination {
    /**
     * Current page number (1-based)
     */
    page: number;

    /**
     * Results per page. May be adjusted for performance
     */
    pageSize: number;

    /**
     * Indicates more results available. Used for infinite scroll implementation
     */
    hasMore?: boolean;

    /**
     * Total number of available results
     */
    total?: number;

    /**
     * Total available pages. Calculated as ceil(total/pageSize)
     */
    totalPages?: number;
  }
}

export interface QuerySumarizePageResponse {
  /**
   * AI-generated summary including key themes and topics, content type distribution,
   * important findings, and document relationships
   */
  summary?: string;
}

export interface QueryChunkSearchParams {
  /**
   * The buckets to search. If provided, the search will only return results from
   * these buckets
   */
  bucketLocations: Array<BucketLocator>;

  /**
   * Natural language query or question. Can include complex criteria and
   * relationships. The system will optimize the search strategy based on this input
   */
  input: string;

  /**
   * Client-provided search session identifier. Required for pagination and result
   * tracking. We recommend using a UUID or ULID for this value
   */
  requestId: string;

  /**
   * Optional partition identifier for multi-tenant data isolation. Defaults to
   * 'default' if not specified
   */
  partition?: string | null;
}

export interface QueryDocumentQueryParams {
  /**
   * The storage bucket containing the target document. Must be a valid, registered
   * Smart Bucket. Used to identify which bucket to query against
   */
  bucketLocation: BucketLocator;

  /**
   * User's input or question about the document. Can be natural language questions,
   * commands, or requests. The system will process this against the document content
   */
  input: string;

  /**
   * Document identifier within the bucket. Typically matches the storage path or
   * key. Used to identify which document to chat with
   */
  objectId: string;

  /**
   * Client-provided conversation session identifier. Required for maintaining
   * context in follow-up questions. We recommend using a UUID or ULID for this value
   */
  requestId: string;

  /**
   * Optional partition identifier for multi-tenant data isolation. Defaults to
   * 'default' if not specified
   */
  partition?: string | null;
}

export interface QueryGetPaginatedSearchParams extends PageNumberParams {
  /**
   * Original search session identifier from the initial search
   */
  requestId: string;

  /**
   * Optional partition identifier for multi-tenant data isolation. Defaults to
   * 'default' if not specified
   */
  partition?: string | null;
}

export interface QuerySearchParams {
  /**
   * The buckets to search. If provided, the search will only return results from
   * these buckets
   */
  bucketLocations: Array<BucketLocator>;

  /**
   * Natural language search query that can include complex criteria. Supports
   * queries like finding documents with specific content types, PII, or semantic
   * meaning
   */
  input: string;

  /**
   * Client-provided search session identifier. Required for pagination and result
   * tracking. We recommend using a UUID or ULID for this value
   */
  requestId: string;

  /**
   * Optional partition identifier for multi-tenant data isolation. Defaults to
   * 'default' if not specified
   */
  partition?: string | null;
}

export interface QuerySumarizePageParams {
  /**
   * Target page number (1-based)
   */
  page: number;

  /**
   * Results per page. Affects summary granularity
   */
  pageSize: number;

  /**
   * Original search session identifier from the initial search
   */
  requestId: string;

  /**
   * Optional partition identifier for multi-tenant data isolation. Defaults to
   * 'default' if not specified
   */
  partition?: string | null;
}

Query.Memory = Memory;
Query.EpisodicMemory = EpisodicMemory;
Query.Procedures = Procedures;
Query.SemanticMemory = SemanticMemory;

export declare namespace Query {
  export {
    type BucketLocator as BucketLocator,
    type LiquidmetalV1alpha1BucketName as LiquidmetalV1alpha1BucketName,
    type LiquidmetalV1alpha1SourceResult as LiquidmetalV1alpha1SourceResult,
    type LiquidmetalV1alpha1TextResult as LiquidmetalV1alpha1TextResult,
    type QueryChunkSearchResponse as QueryChunkSearchResponse,
    type QueryDocumentQueryResponse as QueryDocumentQueryResponse,
    type QuerySearchResponse as QuerySearchResponse,
    type QuerySumarizePageResponse as QuerySumarizePageResponse,
    type LiquidmetalV1alpha1TextResultsPageNumber as LiquidmetalV1alpha1TextResultsPageNumber,
    type QueryChunkSearchParams as QueryChunkSearchParams,
    type QueryDocumentQueryParams as QueryDocumentQueryParams,
    type QueryGetPaginatedSearchParams as QueryGetPaginatedSearchParams,
    type QuerySearchParams as QuerySearchParams,
    type QuerySumarizePageParams as QuerySumarizePageParams,
  };

  export {
    Memory as Memory,
    type MemorySearchResponse as MemorySearchResponse,
    type MemorySearchParams as MemorySearchParams,
  };

  export {
    EpisodicMemory as EpisodicMemory,
    type EpisodicMemorySearchResponse as EpisodicMemorySearchResponse,
    type EpisodicMemorySearchParams as EpisodicMemorySearchParams,
  };

  export {
    Procedures as Procedures,
    type ProcedureSearchResponse as ProcedureSearchResponse,
    type ProcedureSearchParams as ProcedureSearchParams,
  };

  export {
    SemanticMemory as SemanticMemory,
    type SemanticMemorySearchResponse as SemanticMemorySearchResponse,
    type SemanticMemorySearchParams as SemanticMemorySearchParams,
  };
}
