export type BlockMode ='headers' | 'cookies' | 'params' | 'query' | 'body' | 'property'

export interface IBlock {
  link: string;
  linked: boolean;
  line_index: number;
  key: string | '*';
  mode: BlockMode;
}
