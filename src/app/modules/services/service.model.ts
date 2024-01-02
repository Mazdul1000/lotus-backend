import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './service.interface';

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Service = model<IService, ServiceModel>('Service', serviceSchema);

export default Service;
