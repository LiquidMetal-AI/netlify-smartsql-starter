// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Raindrop } from '../client';

export abstract class APIResource {
  protected _client: Raindrop;

  constructor(client: Raindrop) {
    this._client = client;
  }
}
