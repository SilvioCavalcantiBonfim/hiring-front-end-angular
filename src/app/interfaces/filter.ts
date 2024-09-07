export interface Filter {
  attribute: string;
  value: string[];
}

export const NULL_FILTER: Filter = { attribute: 'name', value: [''] };