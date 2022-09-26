const ReportService = require("../services/report.service");

module.exports = class ReportController {
    reportService=new ReportService()
    getReportList=async(req,res,next)=>{
        try {
            const page = req.query.page;
            const reportList=await this.reportService.getReportList(page);
            const totalPage=await this.reportService.getTotalPage();
            return res.status(200).json({reportList,total:totalPage});
        } catch (error) {
            next(error)
        }
    }   
    getReport=async(req,res,next)=>{
        try {
            const {reportId}=req.params;
            const {userId}=res.locals;
            const report=await this.reportService.getReport(userId,reportId)
            return res.status(200).json(report);
        } catch (error) {
            next(error)            
        }
    }   
    setReport=async(req,res,next)=>{
        try {
            const { userId } = res.locals;
            const {reportTitle,reportContent} = req.body;
            // reportTitle,reportContent
            const setReport=await this.reportService.setReport(userId,reportTitle,reportContent);
            return res.status(200).json(setReport);
        } catch (error) {
            next(error)            
        }
    }   
    editReport=async(req,res,next)=>{
        try {
            const {userId}=res.locals;
            const {reportId}=req.params;
            const {reportTitle,reportContent} = req.body;
            // reportTitle,reportContent
            const editReport=await this.reportService.editReport(userId,reportId,reportTitle,reportContent);
            return res.status(200).json(editReport);
        } catch (error) {
            next(error)
        }
    }
    deleteReport=async(req,res,next)=>{
        try {
            const {userId}=res.locals;
            const {reportId}=req.params;
            const deleteReport=await this.reportService.deleteReport(userId,reportId);
            return res.status(200).json(deleteReport);
        } catch (error) {
            next(error)
        }
    }   
}