export type NFTMetadata = {
  name?: string;
  description?: string;
  image: string;
  ['video/mp4']?: string;
  animation_url?: string;
  external_url?: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
};
