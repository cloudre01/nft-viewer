export interface NFT {
  id: string;
  name: string;
  collection: string;
  token_standard: string;
  image: string;
  contract: string;
  metadata_url?: string;
  description?: string;
  opensea_url?: string;
}

export interface Metadata {
  attributes: { trait_type: string; value: string }[];
}
