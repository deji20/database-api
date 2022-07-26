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
    pagination: {
        amount: number, 
        offset: number
    }
}

export interface CategoryQuery extends Query{}