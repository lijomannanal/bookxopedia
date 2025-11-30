export interface ErrorBody {
  code: number;
  details: object[];
  errors: object[];
  message: string;
  status: APIErros;
}

export type APIError = {
  error: ErrorBody;
};

export enum APIErros {
  RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED',
}
