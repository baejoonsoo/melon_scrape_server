export interface ChartListType {
  rank: number;
  title: string;
  singer: string;
  album: string;
  url: string;
}

export interface ChartType {
  timestemp: string;
  rank: ChartListType[];
}
