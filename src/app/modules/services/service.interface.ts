import { Model } from 'mongoose'

export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'

export type ICategory =
  | 'Counseling Services'
  | 'Mental Disorders'
  | 'Corporate Grooming'
  | 'Child Care'
  | 'Parenting'
  | 'Marriage and Relationship Counseling'
  | 'Trauma and PTSD'
  | 'Psychological Assessments'
  | 'Online Therapy Sessions'
  | 'Work-Life Balance'
  | 'Social Anxiety Support'

export type IService = {
  title: string
  category: ICategory
  price: number
  location: ILocation
  description: string
  thumbnail: string
}

export type ServiceModel = Model<IService, Record<string, unknown>>

export type IServiceFilters = {
  searchTerm?: string
  location?: string
  category?: string
}
