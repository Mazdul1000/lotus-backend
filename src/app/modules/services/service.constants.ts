import { ICategory, ILocation } from "./service.interface";


export const serviceLocations: ILocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const serviceCategories: ICategory[] = [
    'Counseling Services',
    'Mental Disorders',
    'Corporate Grooming',
    'Child Care',
    'Parenting',
    'Marriage and Relationship Counseling',
    'Trauma and PTSD',
    'Psychological Assessments',
    'Online Therapy Sessions',
    'Work-Life Balance',
    'Social Anxiety Support',
]

export const serviceFilterableFields = [
    'searchTerm',
    'location',
    'category'
  ];
  
export const serviceSearchableFields = ['location', 'title', 'category'];
  