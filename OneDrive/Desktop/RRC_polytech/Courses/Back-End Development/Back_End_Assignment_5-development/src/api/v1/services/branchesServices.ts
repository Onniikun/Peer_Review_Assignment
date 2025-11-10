import { Branches } from "src/data/branches";
import { QuerySnapshot, DocumentData, DocumentSnapshot } from "node_modules/firebase-admin/lib/firestore";
import { 
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from "../repositories/firestoreRepository";


const COLLECTION: string = "branch";

/**
 * Retrieves all branches data from branches array.
 * @returns All branches data.
 */
export const getAllBranches = async(): Promise<Branches[]> => {
    try{
            const snapshot: QuerySnapshot = await getDocuments(COLLECTION)
            const branch: Branches[] = snapshot.docs.map((doc) => {
                const data: DocumentData = doc.data();
                return {
                    id: Number(doc.id),
                    name: data.name,
                    address: data.address,
                    phone: data.phone,
                } as Branches;
            });
            return structuredClone(branch)
        } catch (error: unknown) {
            throw error;
        }
}

/**
 * Gets only branch ID data.
 * @param id - The ID number we're retrieving.
 * @returns branch ID number.
 */
export const getBranchesId = async (id: number): Promise<Branches | undefined > => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, String(id))
    if(!doc) {
        throw new Error(`Branch with ${id} cannot be retrieved.`)
    }
    const data: DocumentData | undefined = doc.data();
    if(!data) {
        throw new Error(`Branch with ${id} doesnt exist`)
    }
    return {
            id: Number(doc.id),
            name: data.name,
            address: data.address,
            phone: data.phone,
        }
};

/**
 * Creates a new branch data.
 * @param branchData - Data for a new branch.
 * @returns creates a new branch with id based on the current id numbers.
 */
export const createBranchData = async(branchData: {
    id: number;
    name: string;
    address: string;
    phone: number;
}): Promise<Branches> => {
    const newBranch: Branches = {
        id: branchData.id,
        name: branchData.name,
        address: branchData.address,
        phone: branchData.phone,
    };
    const branchId: string = await createDocument<Branches>(COLLECTION, newBranch)
    return structuredClone({branchId, ...newBranch} as Branches);
}


/**
 * Updates an existing branch data.
 * @param id - The ID number of the branch to update.
 * @param branchData - Branch data to update.
 * @returns The updated branch data.
 * @throws An error if branch ID doesn't exist.
 */
export const updateBranchData = async (
    id: number,
    branchData: Partial<Omit<Branches, "id">>
): Promise<Branches> => {
    const branch: Branches | undefined = await getBranchesId(id)

        if(!branch) {
            throw new Error(`Employee with ID ${id} not found`);
        }
        const updateBranchData: Branches = {
        id,
        name: branchData.name ?? branch.name,
        address: branchData.address ?? branch.address,
        phone: branchData.phone ?? branch.phone,
        }
        await updateDocument<Branches>(COLLECTION, String(id), updateBranchData);
    return structuredClone(updateBranchData);
};

/**
 * Deletes branch data from the branches array.
 * @param id - The ID number of branch data to remove.
 * @returns Returns false if the branch data wasn't removed, true if deleted.
 */
export const deleteBranchData = async (id: number): Promise<void> => {
    const branch: Branches| undefined = await getBranchesId(id)
    if(!branch) {
        throw new Error(`branch with ID ${id} not found`);
    }
    await deleteDocument(COLLECTION, String(id));
};