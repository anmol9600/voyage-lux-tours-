export interface Package {
  id: string;
  category: 'domestic' | 'international';
  title: string;
  destination: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  itinerary: { day: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  rating: number;
  text: string;
}

export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  image: string;
  challenge: string;
  solution: string;
  results: string;
  feedback: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
