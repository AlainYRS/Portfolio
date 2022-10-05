import mysql from 'mysql';
import express, { query } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//import inquirer from 'inquirer';

const servapp = express();

const db = mysql.createPool({ // Here is stablished the Server connection requirements as host, user, password and database name.
    host : "localhost",
    user : "root",
    password : "password",
    database : "mysql_portfolio",
})

servapp.use(cors());
servapp.use(express.json());
servapp.use(bodyParser.urlencoded({extended:true}));

servapp.post("/api/insert",(req,res)=>{

    const Candidate = req.body.Candidate;
    const sqlInsertProfile = "INSERT INTO `candidates` (candidateId, firstName, lastName, email, contactNumber, imageURL, introduction, qrCode, baseColor, fontColor, registeredDate) VALUES (?,?,?,?,?,?,?,?,?,?,Now())";
    db.query(sqlInsertProfile,[Candidate.candidateId,Candidate.firstName,Candidate.lastName,Candidate.email,Candidate.contactNumber,Candidate.imageURL,Candidate.introduction,Candidate.qrCode,Candidate.baseColor,Candidate.fontColor],(err,result)=>console.log(result,err));

    const SocMedPlatform = req.body.SocialMedia;
    if(SocMedPlatform[0] !== undefined){
        SocMedPlatform.map((platform)=>{
            const sqlInsertSocialMedia = "INSERT INTO `social_media` (candidateId, SocMedPlatform, IdLink) VALUES (?,?,?)"
            db.query(sqlInsertSocialMedia,[Candidate.candidateId, platform.SocMedPlatform, platform.IdLink],(err,result)=>console.log(result,err));
        })
    }

    const Skills = req.body.Skills;
    if(Skills[0] !== undefined){
        Skills.map((skill)=>{
            const sqlInsertSkill = "INSERT INTO `skills` (candidateId, skillTitle, skillDescr, skillLink, skillImg) VALUES (?,?,?,?,?)"
            db.query(sqlInsertSkill,[Candidate.candidateId, skill.skillTitle, skill.skillDescr, skill.skillLink, skill.skillImg],(err,result)=>console.log(result,err));
        })
    }

    const Experience = req.body.Experience;
    if(Experience[0] !== undefined){
        Experience.map((exp)=>{
            const sqlInsertExperience = "INSERT INTO `employments` (candidateId,jobTitle,company,JobStartDate,JobEndDate,jobDescr,jobImg) VALUES (?,?,?,?,?,?,?)"
            db.query(sqlInsertExperience,[Candidate.candidateId,exp.jobTitle,exp.company,exp.JobStartDate,exp.JobEndDate,exp.jobDescr,exp.jobImg],(err,result)=>console.log(result,err));
        })
    }

    const Schooling = req.body.Schooling;
    if(Schooling[0] !== undefined){
        Schooling.map((school)=>{
            const sqlInsertSchool = "INSERT INTO `schooling` (candidateId,institution,gradeObtained,SchEndDate) VALUES (?,?,?,?)"
            db.query(sqlInsertSchool,[Candidate.candidateId,school.institution,school.gradeObtained,school.SchEndDate],(err,result)=>console.log(result,err));
        })
    }

    const Project = req.body.Projects;
    if(Project[0] !== undefined){
        Project.map((project)=>{
            const sqlInsertProject = "INSERT INTO `projects` (candidateId,projectTitle,projDescr,projObjectives,projAchievements,projLinks,projImg) VALUES (?,?,?,?,?,?,?)"
            db.query(sqlInsertProject,[Candidate.candidateId,project.projectTitle,project.projDescr,project.projObjectives,project.projAchievements,project.projLinks,project.projImg],(err,result)=>console.log(result,err));
        })
    }

    const Languaje = req.body.Languages;
    if(Languaje[0] !== undefined){
        Languaje.map((languaje)=>{
            const sqlInsertLanguage = "INSERT INTO `languages` (candidateId,Language,Reading,Writting,Speaking,Listening,langImg) VALUES (?,?,?,?,?,?,?)"
            db.query(sqlInsertLanguage,[Candidate.candidateId,languaje.Language,languaje.Reading,languaje.Writting,languaje.Speaking,languaje.Listening,languaje.langImg],(err,result)=>console.log(result,err));
        })
    }
})

servapp.listen(5000,()=>{
    console.log('Running Server App in port 5000');
});

//const mysql_user = {
//    host : "localhost", //"34.130.134.147"
//    user : "root",
//    password : "password",
//    database : "mysql_portfolio",
//};

//const connection = mysql.createConnection(mysql_user,{
//    multipleStatements : true,
//});

//function inquire() {
//    inquirer.prompt([
//        {
//            name: "statement",
//            message: "Type your SQL query>",
//        }
//    ])
//    .then ((answer)=>{
//        if(answer.statement === 'quit'){
//            console.log("Disconnected and exit");
//            connection.end();
//        } else {query(answer.statement)}
//    });
//}
//
//function query(query) {
//    connection.query(query,(error, result)=>{
//        if (error){console.log(error)}
//        else {console.log(result)}
//        inquire();
//    });
//};
//
//function connect() {
//    connection.connect((error)=>{
//        if(error){console.log(error)}
//        else {console.log("Connected to sql")}
//        inquire();
//    });
//}
//
//export default connect();