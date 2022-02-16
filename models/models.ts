//DTOs
export interface PictureDto{
    id: string;
    data: string;
    alt: string
    ratio: {
        x: Number, 
        y: Number
    }, 
}
export interface Query{
    filter: object; 
    projection: object;
    search: object;
}
export interface CategoryQuery extends Query{}