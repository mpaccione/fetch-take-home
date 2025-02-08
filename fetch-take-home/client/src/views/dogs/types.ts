// export interface Coordinates {
//     lat: number;
//     lon: number;
// }

export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

// export interface Location {
//     zip_code: string
//     latitude: number
//     longitude: number
//     city: string
//     state: string
//     county: string
// }

export interface SearchParams {
    from: number,
    size: number,
    sort: `${'breed' | 'name' | 'age'}:${'asc' | 'desc'}`,
    breeds: string[]
}