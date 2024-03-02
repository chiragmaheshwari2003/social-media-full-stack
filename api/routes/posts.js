import  express  from "express";
import { getPost, addPost, deletePost } from '../controllers/post.js'
const router = express.Router();

router.get('/',getPost);
router.post('/',addPost);
router.delete('/:id',deletePost) // post id as id
export default router;