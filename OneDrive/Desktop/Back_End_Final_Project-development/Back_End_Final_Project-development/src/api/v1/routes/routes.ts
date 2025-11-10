import express, { Router } from "express";
import * as controller from "../controllers/controller";
import { validateRequest } from "../middleware/validate";
import { storySchemas } from "../validation/storyValidation";

const router: Router = express.Router();
/**
 * @openapi
 * /Stories:
 *   get:
 *     summary: Get all Story projects.
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: List of story projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", 
    validateRequest(storySchemas.getAllStories), controller.getAllStories)
/**
 * @openapi
 * /stories/{id}:
 *   get:
 *     summary: Retrieve a single story project by ID.
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the story.
 *     responses:
 *       200:
 *         description: Story project found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Story with ID 1 retrieved successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Story'
 *       404:
 *         description: Story not found.
 */
router.get("/:id", 
    validateRequest(storySchemas.storyData),controller.getStory)
/**
 * @openapi
 * /stories:
 *   post:
 *     summary: Create a new story project.
 *     tags: [Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *             required:
 *               - name
 *               - genre
 *               - type
 *               - expected_release_date
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 description: The title of the story project.
 *                 example: "Protocol"
 *               genre:
 *                 type: string
 *                 description: The genre of the story project.
 *                 example: "Action"
 *               type:
 *                 type: string
 *                 description: The media type of the project.
 *                 example: "Manga"
 *               expected_release_date:
 *                 type: string
 *                 format: date-time
 *                 description: The expected release date of the story.
 *                 example: "2025-07-18T00:00:00.000Z"
 *               status:
 *                 type: string
 *                 description: The current development status of the story.
 *                 example: "In Progress"
 *             $ref: '#/components/schemas/CreateStory'
 *     responses:
 *       201:
 *         description: Story project created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Story created successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Story'
 */
router.post("/", 
    validateRequest(storySchemas.create), controller.createStory)
/**
 * @openapi
 * /stories/{id}:
 *   put:
 *     summary: Update an existing story project.
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the story to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStory'
 *     responses:
 *       200:
 *         description: Story project updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Story project updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Story'
 *       404:
 *         description: Story not found.
 */
router.put("/:id", 
    validateRequest(storySchemas.update),controller.updateStory)
/**
 * @openapi
 * /stories/{id}/status:
 *   patch:
 *     summary: Update only the status of a story project.
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: In Progress
 *     responses:
 *       200:
 *         description: Story status updated successfully.
 *       404:
 *         description: Story not found.
 */
router.patch("/:id/status", 
    validateRequest(storySchemas.updateStatus),controller.updateStoryStatus)
/**
 * @openapi
 * /stories/{id}:
 *   delete:
 *     summary: Delete a story project by ID.
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Story project deleted successfully.
 *       404:
 *         description: Story project not found.
 */
router.delete("/:id", 
    validateRequest(storySchemas.delete),controller.deleteStory)

export default router;