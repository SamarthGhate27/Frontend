export type Media = {
  id: string;
  assetId?: string;
  publicId: string;
  url: string;
  filename: string;
};

export type Category = {
  id: string;
  name: string;
  resourceCount: number;
  imageId: string | null;
  image: Media | null;
  createdAt?: string;
  updatedAt?: string;
};
