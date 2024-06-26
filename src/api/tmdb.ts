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

export interface KeywordItem {
    id: number,
    name: string,
}

export interface MoviesFilters {
    keywords?: number[];
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
    },

    async getMovies(page: number, filters: MoviesFilters) {
        const params = new URLSearchParams({
            page: page.toString()
        })

        if (filters.keywords?.length) {
            params.append("with_keywords", filters.keywords.join("|"))
        }

        const query = params.toString()

        const response = await get<PageResponse<MovieDetails>>(`/discover/movie?${query}`);
        return {
            results: response.results,
            page: response.page,
            totalPages: response.total_pages,
        }; 
    },

    async getKeywords(query: string) {
        const response = await get<PageResponse<KeywordItem>>(`/search/keyword?query=${query}`)
        return response.results

    }
}