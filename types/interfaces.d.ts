export interface IBlock {
  link: string;
  linked: boolean;
  line_index: number;
  key: string | '*';
  mode?: 'headers' | 'cookies' | 'params' | 'query' | 'body' | 'property';
}
