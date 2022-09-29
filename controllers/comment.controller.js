const CommentService = require("../services/comment.service");

module.exports = class CommentController {
    commentService=new CommentService();
    getComment=async(req,res,next)=>{
        try {
            const {reportId}=req.params;

            const get= await this.commentService.getComment(reportId);

            return res.status(200).json(get);
        } catch (error) {
            next(error)            
        }
    }   
    setComment=async(req,res,next)=>{
        try {
            // reportTitle,reportContent
            const {reportId}=req.params;
            const {commentContent}=req.body;
            const {userId}=res.locals;

            const set=await this.commentService.setComment(userId,reportId,commentContent);

            return res.status(200).json(set);
        } catch (error) {
            next(error)            
        }
    }   
    editComment=async(req,res,next)=>{
        try {
            const {reportId}=req.params;
            const {commentContent}=req.body;
            const {userId}=res.locals;

            // reportTitle,reportContent
            const edit=await this.commentService.editComment(userId,reportId,commentContent);

            return res.status(200).json(edit);
        } catch (error) {
            next(error)
        }
    }
}