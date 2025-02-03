import mongoose, { Schema, model, models } from "mongoose";

// creating dimensoioon for videos in format of reels only
export const VIDEO_DIMENSION = {
  width: 1080,
  height: 1920,
  //   treating this as constant which can be used at multiple places
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  //   dimension
  transformations?: {
    height: number;
    width: number;
    quality?: number;
  };
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformations: {
      height: { type: Number, default: VIDEO_DIMENSION.height },
      width: { type: Number, default: VIDEO_DIMENSION.width },
      quality: { type: Number, min: 1, max: 100 },
    },
  },

  {
    // declaring timestamps
    timestamps: true,
  }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;
