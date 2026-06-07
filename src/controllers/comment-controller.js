import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment = async (req,res) => {
    try{
        const response = await commentService.create(req.query.modelId, req.query.modelType, req.body.userId, req.body.content);
        return res.status(201).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully created comment at controller layer'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            data: {},
            message: 'Something went wrong while creating comment at controller layer',
            err: error
        })
    }
}