import configuration from "../configuration";

async function get<TBody>(relativeUrl: string): Promise<TBody> {
    const { apiToken, apiUrl } = configuration;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
        }
        };
        const response = await fetch(`${apiUrl}/3${relativeUrl}`, options);
        const responseJson: TBody = await response.json();
        return responseJson;
}

export interface MovieDetails {
    id: number,
    title: string,
    popularity: number,
    overview: string,
    backdrop_path?: string,

}

interface PageResponse<TResult> {
    page: number;
    results: TResult[];
    total_pages: number;
}

interface PageDetails<TResult> {
    page: number;
    results: TResult[];
    totalPages: number;
}


interface Configuration {
    images: {
        base_url: string;
    }
}

export const client = {
    async getConfiguration() {
        return get<Configuration>('/configuration');
    },

    async getNowPlaying(page: number = 1): Promise<PageDetails<MovieDetails>> {
        const response = await get<PageResponse<MovieDetails>>(`/movie/now_playing?page=${page}`);
        return {
            results: response.results,
            page: response.page,
            totalPages: response.total_pages,
        };
    
    }
}