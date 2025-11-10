import { Story } from "../model/storyModel"
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";
import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";

// Mocking data
const COLLECTION: string = "story";

/**
 * Retrieves all stories.
 * HTTP - GET /stories
 * @returns All stories
 */
export const getAllStories = async():Promise<Story[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const story: Story[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Story;
        });
        return story;
    } catch (error: unknown) {
        throw error;
    }
};
/**
 * Only retrieves a single story project, via their ID number.
 * HTTP - GET stories/:id
 * @returns 
 */
export const getStory = async(id: string): 
    Promise<Story | undefined> => {
    try {
        const docSnap = await getDocumentById(COLLECTION, id)
        if (!docSnap || !docSnap.exists) {
            return undefined;
        }
        const data = docSnap.data() as Omit<Story, "id">;
        return {
            id: docSnap.id,
            name: data.name,
            genre: data.genre,
            type: data.type,
            expected_release_date: data.expected_release_date,
            status: data.status,
        };
    } catch(error: unknown) {
        throw error;
    }
        
};
/**
 * Create a new story project
 * HTTP - POST stories
 * @param storyData 
 * @returns 
 */
export const createStory = async(storyData: {
    name: string;
    genre: string;
    type: string;
    expected_release_date: number;
    status: string;
}): Promise<Story> => {
    try {
        const docId = await createDocument(COLLECTION, storyData)
        return {
            id: docId,
            ...storyData
        };
    } catch (error: unknown) {
        throw error
    }
};
/**
 * Updates the story project information
 * HTTP - PUT stories/:id
 * @param id 
 * @param updateStory 
 * @returns 
 */
export const updateStory = async(
    id: string,
    updateStory: Pick<Story, "name" | "genre" | "type" | "expected_release_date" | "status">
): Promise<Story | null> => {
    try {
        const story = await getStory(id);
        if(!story) 
            return null;
        await updateDocument(COLLECTION, id, updateStory);
        return {...story, ...updateStory };
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Update only the story project status 
 * HTTP - PATCH stories/:id/status
 * @param id 
 * @param updateStory 
 * @returns 
 */
export const updateStoryStatus = async(
    id: string,
    status: string,
): Promise<Story | null> => {
        try {
        const story = await getStory(id);
        if(!story) 
            return null;
        await updateDocument(COLLECTION, id, {status});
        return {...story, status };
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Deletes a story project.(For some reason if I need to :3 )
 * HTTP - DELETE /:id
 * @param id 
 */
export const deleteStory = async (id: string): Promise<void> => {
   try {
    const story = await getStory(id);
   if (!story) {
    throw new Error(`Story ID ${id} cannot be found.`)
   }
   await deleteDocument(COLLECTION, id)
   } catch (error: unknown) {
        throw error
   }
};
