//product
export interface ProductList {
  id: number;
  title: string;
  description: string;
  image: string;
  review: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

//productDetails
export interface productDetails{
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  rating?: number;
  thumbnail?: string;

}

//weather
export interface weatherInterface {
  name?: string;
  message: string;
  main?: {
    feels_like?: number;
    grnd_level?: number;
    humidity?: number;
    pressure?: number;
    sea_level?: number;
    temp?: number;
    temp_max?: number;
    temp_min?: number;
  };
  sys?: {
    country?: string;
    sunrise?: number;
    id?: number;
    sunset?: number;
  };
}

//author
export interface PostList {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  userId: number;
}

//postDetails
export interface PostDetails{
  id?: number;
  title?: string;
  body?: string;
}