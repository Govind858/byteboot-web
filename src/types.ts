export interface Project {
   _id: string;           // Mongoose automatically adds this (ObjectId as string in most cases)
  title: string;
  image: string;
  description: string;
  details: string;
  techStack: string[];   // array of strings
  category: string;
}
