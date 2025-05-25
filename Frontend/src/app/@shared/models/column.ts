export enum ColumnType {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
}

type BaseColumn = {
  label: string;
  header: string;
  sortable: boolean;
  filterable: boolean;
  visible: boolean;
}

type InputColumn = {
  type: ColumnType.INPUT;
}

type SelectColumn = {
  type: ColumnType.SELECT;
  options: any[];
  optionTranslatePath?: string;
  multiselect: boolean;
}

export type Column = BaseColumn & (InputColumn | SelectColumn);