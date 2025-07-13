import express from "express";
import {Get_All_Notes, Get_A_Unique_Note, Create_New_Note, Update_Existing_Note, Delete_Existing_Note } from "../controllers/notesController.js";

const router = express.Router();

// GET /apis/notes/
router.get("/", Get_All_Notes );

// GET /apis/notes/:id
router.get("/:id", Get_A_Unique_Note );

// POST /apis/notes/
router.post("/", Create_New_Note);

// PUT /apis/notes/:id
router.put("/:id", Update_Existing_Note);

// DELETE /apis/notes/:id
router.delete("/:id", Delete_Existing_Note);

export default router;
