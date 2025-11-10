/**
 * Interface with story information
 */
export interface Story {
    id: string;
    name: string;
    genre: string;
    type: string;
    // Might change to string depending on the work created and artists.
    expected_release_date?: number;
    status: string;

}