const ReportRepository=require("../repositories/report.repository")
require("dotenv").config();
const env = process.env;

module.exports=class ReportService{
    reportRepository=new ReportRepository()
    getTotalPage=async()=>{
        const totalReport=await this.reportRepository.findAllBugReport();
        return totalReport
    }
    getReportList=async(page)=>{
        let offset = 0;
        if (page > 1) {
            offset = env.REPORT_PAGE_COUNT * (page - 1);
        }
        let reports=await this.reportRepository.findAllBugReportPage(offset);
        return reports.length===0 ? []:reports;
    }   
    getReport=async(reportId)=>{
        let report=await this.reportRepository.findOneBugReport(reportId);
        if(report===undefined){
            throw { status: 400, message: "Not-Found-Report"};
        }
        return report;
    }   
    setReport=async(userId,reportTitle,reportContent)=>{
        if(reportTitle===undefined || reportContent===undefined){
            throw { status: 400, 
                message: "Bad-Request"
                    + (reportTitle===undefined?"-ReportTitle":"")
                    + (reportContent===undefined?"-ReportContent":"")
                };
        }
        const createReport=await this.reportRepository.createBugReport(userId,reportTitle,reportContent);
        return createReport !== undefined ?
                {success:true}:
                {success:false};
    }   
    editReport=async(userId,reportId,reportTitle,reportContent)=>{
        if(reportTitle===undefined || reportContent===undefined ||
            reportTitle==="" || reportContent===""){
            throw { 
                status: 400, 
                message: "Bad-Request"
                    + (reportTitle===undefined || reportTitle==="" ? "-ReportTitle" : "")
                    + (reportContent===undefined || reportContent==="" ? "-ReportContent" : "")
                };
        }
        const getReport=await this.getReport(reportId);
        if(getReport.userId!==userId && userId !== env.ADMIN_USERID){
            throw { 
                status: 401, 
                message: "Wrong-User"
            };
        }
        const updateReport=await this.reportRepository.updateReport(reportId,reportTitle,reportContent);
        return updateReport == 1 ?
                {success:true}:
                {success:false};
    }
    deleteReport=async(userId,reportId)=>{
        const getReport=await this.getReport(reportId);
        if(getReport.userId!==userId && userId !== env.ADMIN_USERID){
            throw { 
                status: 401, 
                message: "Wrong-User"
            };
        }
        const deleteReport = await this.reportRepository.deleteReport(reportId);
        return deleteReport === 1 ?
                {success:true}:
                {success:false};
    }  
}