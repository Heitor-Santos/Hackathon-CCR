export interface Publication {
    id: string,
    subjects: string[],
    media: string[],
    rating: number[],
    author: {
        name: string,
        email: string
    },
    data: {
        title: string,
        descrition: string,
        date?: string,
        image?: string,
        link?: string,
        geo_reference?: any
    }
}

export interface Reward {
    tag: string,
    xp_needed: number,
    data: {
        title: string,
        descrition: string,
        link?: string
    }
}

export interface User {
    name: string,
    email: string,
    school: string,
    ranking: {
        level: number,
        xp: number
    },
    publications: Publication[],
    rewards: Reward[],
    favorites: Publication[]
}
