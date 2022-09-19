const CommentRepository=require("../repositories/comment.repository")

module.exports=class ReportService{
    commentRepository=new CommentRepository()
    getComment=async(reportId)=>{
        let reports=await this.commentRepository.findOneComment(reportId);
        return reports;
    }   
    setComment=async(reportId,commentContent)=>{
        if(commentContent===undefined){
            throw({
                status:400,
                message:"Bad-Request-CommentContent"
            })
        }
        const createReport=await this.commentRepository.createComment(reportId,commentContent);
        return (createReport !== undefined ? 
                {success:true}:
                {success:false}
            );
    }   
    editComment=async(reportId,commentContent)=>{
        if(commentContent===undefined){
            throw({
                status:400,
                message:"Bad-Request-CommentContent"
            })
        }
        const updateReport=await this.commentRepository.updateComment(reportId,commentContent);
        return (updateReport === 1 ? 
            {success:true}:
            {success:false}
        );;
    }
}