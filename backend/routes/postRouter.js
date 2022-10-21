const express = require("express");
const postController = require("../controllers/postController");
const { uploadPostImage } = require("../middlewares/multer");
const router = express.Router();
router.get("/", postController.readPost);
router.post("/", uploadPostImage, postController.createPost);
router.put("/:id", postController.updatetePost);
router.delete("/:id", postController.deletetePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);
module.exports = router;
