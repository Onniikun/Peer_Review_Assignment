import * as storyService from "../src/api/v1/service/storyService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
// import { Story } from "../model/storyModel"


jest.mock("../src/api/v1/repositories/firestoreRepository");


describe("Story project service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a story project successfully", async () => {
        const mockData: {
            name: string;
            genre: string;
            type: string;
            expected_release_date: number;
            status: string;
        } = {
            name: "Protocol",
            genre: " Dark manga, Seinen, Cyberpunk",
            type: "Manga",
            expected_release_date: 2026,
            status: "Pre development"
        };
        const mockDocumentId: string = "Story-project-one";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                mockDocumentId);

        const result = await storyService.createStory(mockData);
        
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "Story",
            expect.objectContaining({
                name: mockData.name,
                genre: mockData.genre,
                type: mockData.type,
                expected_release_date: mockData.expected_release_date,
                status: mockData.status,
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockData.name);    
    });
    it("should delete Story project. ", async () => {
        const mockDocumentId: string = "Story-project-test";
        
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);
        await storyService.deleteStory(mockDocumentId)
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "stories", 
            mockDocumentId);
    })
})