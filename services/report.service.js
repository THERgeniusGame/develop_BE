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
        if(reports.length===0){
            return [];
        }else{
            reports.map(ele=>{
                let day=ele.createdAt.split(" ")[0]
                ele.createdAt=day
                ele.nickname=ele["User.nickname"]
                delete ele["User.nickname"]
            });
            return reports;
        }
    }   
    getReport=async(userId,reportId)=>{
        if(reportId===undefined){
            throw { status: 400, message: "Bad-Request" };
        }
        let report=await this.reportRepository.findOneBugReport(reportId);
        if(report===undefined || report===null){
            throw { status: 400, message: "Not-Found-Report"};
        }
        report.nickname=report["User.nickname"]
        let day=report.createdAt.split(" ")[0]
        report.createdAt=day
        delete report["User.nickname"]
        if(userId == env.ADMIN_USERID){
            report.admin=true;
        }else{
            report.admin=false;
        }
        if(userId ===report.userId){
            report.my=true;
        }else{
            report.my=false;
        }
        delete report.userId;
        return report;
    }   
    setReport=async(userId,reportTitle,reportContent)=>{
        if(reportTitle===undefined || reportContent===undefined){
            throw { status: 400, 
                message: "Bad-Request"
                };
        }
        const createReport=await this.reportRepository.createBugReport(userId,reportTitle,reportContent);
        return createReport !== undefined ?
                {success:true}:
                {success:false};
    }   
    editReport=async(userId,reportId,reportTitle,reportContent)=>{
        if(reportTitle===undefined || reportContent===undefined || reportId===undefined ||
            reportTitle==="" || reportContent===""){
            throw { 
                status: 400, 
                message: "Bad-Request"
                };
        }
        const getReport=await this.getReport(userId,reportId);
        if(getReport.userId!==userId || userId !== env.ADMIN_USERID){
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
        if(reportId===undefined || reportId===null){
            throw { status: 400, message: "Bad-Request" };
        }
        const getReport=await this.getReport(reportId);
        if(getReport.userId!==userId || userId !== env.ADMIN_USERID){
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