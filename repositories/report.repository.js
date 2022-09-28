const { Reports, Users } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
require("dotenv").config();
const env = process.env;

module.exports = class ReportRepository {
    //전체 버그 신고 목록 
    findAllBugReport = async ()=>{
        const list = await Reports.findAll({
            raw: true,
            where:{
                reportCategory:0
            }
        })
        return  list.length;
    }

    //offset페이지 신고 목록
    findAllBugReportPage = async (offset) => {
        const list = await Reports.findAll({
          offset: offset,
          limit: env.REPORT_PAGE_COUNT/1,
          raw: true,
          attributes: [
            "reportId",
            "reportTitle",
            "createdAt"
          ],
          where:{
            reportCategory:0
          },
          order: [
            ['reportId', 'DESC'],
            ],
          include: [
            {
              model: Users,
              attributes: ["nickname"],
            },
          ],
        });
        return list;
    }

    //신고상세
    findOneBugReport = async (reportId) => {
        const report=await Reports.findOne({
            attributes:[
                "reportId",
                "reportTitle",
                "reportContent",
                "createdAt",
                "userId"
            ],
            raw:true,
            where:{
                reportId
            },
            include: [
                {
                  model: Users,
                  attributes: ["nickname"],
                },
            ],
        })
        return report
    }

    //신고 작성
    createBugReport = async (userId,reportTitle,reportContent) => {
        const createReport=await Reports.create({
            userId,
            reportTitle,
            reportContent,
            reportCategory:0
        })
        return createReport
    }

    //신고수정
    updateReport = async (reportId,reportTitle,reportContent) => {
        const update=await Reports.update(
            {
                reportTitle,
                reportContent
            },
            {
                where:{
                    reportId,
                }
            }
        )
        return update;
    }

    //신고 삭제
    deleteReport = async (reportId) => {
        const deleteReport=await Reports.destroy({
            where: {
                reportId
            },
        });
        return deleteReport;
    }

    //채팅 신고
    createChatReport = async (userId,chatLog) => {
        const createReport=await Reports.create({
            userId,
            reportTitle:"채팅신고",
            reportContent:chatLog,
            reportCategory:1
        })
        return createReport
    }

    checkChatReport=async(userId,chatLog)=>{
        const get=await Reports.findOne({
            where:{
                userId,
                reportContent:chatLog,
                reportCategory:1
            },
            raw:true
        })
        return get
    }
}