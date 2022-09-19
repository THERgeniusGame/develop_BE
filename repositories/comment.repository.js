const { Comments } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = class ReportRepository {
    //신고 목록
    findOneComment = async (reportId) => {
        const comment = await Comments.findOne({
            raw:true,
            where:{
                reportId
            }
        })
        return comment
    }
    createComment = async (reportId,commentContent) => {
        const createComment = await Comments.create({
            reportId,
            commentContent
        })
        return createComment;
    }
    updateComment = async (reportId,commentContent) => {
        const update = await Comments.update(
            {
                commentContent
            },
            {
                where:{
                    reportId
                }
            }
        )
    }
}