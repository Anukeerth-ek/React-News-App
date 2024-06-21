import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Article {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
    author: string;
    publishedAt: string;
    // Add other fields as necessary
}

interface CategoryNewsState {
    news: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoryNewsState = {
    news: [],
    status: 'idle',
    error: null,
};

// Async thunk for fetching category news
export const fetchCategoryNews = createAsyncThunk(
    'categoryNews/fetchCategoryNews',
    async (category: string, { rejectWithValue }) => {
        const baseUrl = 'https://newsapi.org/v2/top-headlines?';
        const queryParams = new URLSearchParams({
            country: 'in',
            category: category,
            apiKey: import.meta.env.VITE_API_KEY, // Ensure this is properly set in your .env file
        });

        const urlWithParams = `${baseUrl}?${queryParams.toString()}`;

        try {
            const response = await fetch(urlWithParams);
            const data = await response.json();
            return data.articles as Article[];
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);

const categoryNewsSlice = createSlice({
    name: 'categoryNews',
    initialState,
    reducers: {},
    extraReducers: (builder:any) => {
        builder
            .addCase(fetchCategoryNews.pending, (state:any) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoryNews.fulfilled, (state:any, action: PayloadAction<Article[]>) => {
                state.status = 'succeeded';
                state.news = action.payload;
            })
            .addCase(fetchCategoryNews.rejected, (state:any, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch news';
            });
    },
});

export default categoryNewsSlice.reducer;
