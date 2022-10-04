import React, { useState, useEffect } from 'react'; //React & Hooks
import Axios from 'axios'; //Connection to MySql
import Image from "next/image"; //Image tag from Next for SSR
import styles from '../styles/Uploader.module.css'; //CSS Styling
import stylesWeb from '../styles/UploaderWebsite.module.css'; //CSS Styling
import stylesPrint from '../styles/UploaderPrintable.module.css'; //CSS Styling
import { listAll , ref, uploadBytes, uploadBytesResumable, getDownloadURL, connectStorageEmulator, deleteObject, deleteFiles } from "firebase/storage"; // Storage Funcions
import { Storage, Auth, Firestore, ResumesColl, ISPathwayNPOColl } from '../services/firebase'; // Firebase SDKs
import { Timestamp, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import { async } from '@firebase/util'; //Asyn Await utility
import HomePage from '../pages/index';
import ICPagesHead from '../components/imported/ICPagesHead/ICPagesHead'
import ICHeaderMenu from '../components/imported/ICHeaderMenu/ICHeaderMenu'
import Loby from '../components/Loby.js'
import ICFooters from '../components/imported/ICFooters/ICFooters'

export default function Uploader(){
    // Jsons states to insert in Arrays
    const [Candidate, setCandidate] = useState({})  //Profile data (Name, mail, contact, intro)
    const [NewSMJson,setNewSMJson] = useState({}) //(Social Media Jsons)
    const [NewSkillJson,setNewSkillJson] = useState({}) //(Skills Jsons)
    const [NewExpJson, setNewExpJson] = useState({}) //(Job Experience Jsons)
    const [NewSchoolJson,setNewSchoolJson] = useState({}) //(Schooling Jsons)
    const [NewProjJson,setNewProjJson] = useState({}) //(Projects Jsons)
    const [NewLangJson,setNewLangJson] = useState({}) //(Projects Jsons)
    
    // Arrays filled with Jsons
    const [SocMedArray,setSocMedArray]=useState([]) // Social Medias Array with NewSMJson Jsons
    const [SkillsArray,setSkillsArray]=useState([]) // Skills Array with NewSkillJson Jsons
    const [ExperienceArray,setExperienceArray]=useState([]) // Jobs Array with NewExpJson Jsons
    const [SchoolingArray,setSchoolingArray]=useState([])   // Schools Array with NewSchoolJson Jsons
    const [ProjectsArray,setProjectsArray]=useState([]) // Projects Array with NewProjJson Jsons
    const [LanguagesArray,setLanguagesArray]=useState([]) // Languages Array with NewProjJson Jsons

    // Images states to resize & storage at Firebase
    const [MyProfileImg,setMyProfileImg] = useState([]) // Profile Image
    const [MyQrCodeImg,setMyQrCodeImg] = useState([])   // QrCode Image
    const [SkillEvidenceImg,setSkillEvidenceImg] = useState([]) // Skills Images
    const [ExperienceEvidenceImg,setExperienceEvidenceImg] = useState([]) // Jobs Images
    const [ProjectEvidenceImg,setProjectEvidenceImg] = useState([]) // Projects Images
    const [LanguagesEvidenceImg,setLanguagesEvidenceImg] = useState([]) // Languages Images

    // Complements
    const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'] // Valid formats for images
    const [invalidFilePopUp, setinvalidFilePopUp] = useState(null) // Flag to popup Invalid window error message
    const [Retry, setRetry] = useState(3) // State to retry the Resized URLs collection completly
    const [PopUp, setPopUp] = useState(false) // Activation state to Preview the resume
    const [WaitTime, setWaitTime] = useState(3000) // Wait time to start Firebase Storage Resize Extention
    const [CntNumbr, setCntNumbr] = useState('');
    const [CapImg, setCapImg] = useState(4);

    // Json states for Firebase paths Storage
    const [FirebaseStoragePaths,setFirebaseStoragePaths] = useState(null) // Paths for resized images based on their concept type (ProfileImgPath,QrCodeImgPath,SkillsImgPath,ExperienceImgPath,ProjectImgPath)
    const [WebLink,setWebLink] = useState({}) // Json State with all fieldsets for MySQL and Firestore

    // Arrays to file the Resized URLs from Firebase Storage Rezising proccess
    // const[URLRsdProfile,setURLRsdProfile] = useState([])
    // const[URLRsdQr,setURLRsdQr] = useState([])
    // const[URLRsdSkill,setURLRsdSkill] = useState([])
    // const[URLRsdJob,setURLRsdJob] = useState([])
    // const[URLRsdProject,setURLRsdProject] = useState([])

    // const [URLsResized,setURLsResized] = useState({})

    // Creates User ID & paths
    const CreateID = (EncryptionLevel) => { //EncryptLavel between 1 - 35
        let NewID = Date.now().toString(EncryptionLevel) + '_' + (Math.floor(Math.random()*7777777)).toString(EncryptionLevel) // UserID creation
        setCandidate({ ...Candidate, 'candidateId': NewID }) // Append candidate ID with ID
        let StoragePath = 'Resized/Resumes/' + NewID + '/';
        setFirebaseStoragePaths({
                NewID: NewID,
                StoragePath: StoragePath, // Path for Storage
                ProfileImgPath: StoragePath + 'Profile/', // Path for ProfileImg
                QrCodeImgPath: StoragePath + 'Qr/', // Path for QrCodeImg
                SkillsImgPath: StoragePath + 'Skills/', // Path for SkillsImg
                ExperienceImgPath: StoragePath + 'Experience/', // Path for ExperienceImg
                ProjectImgPath: StoragePath + 'Projects/', // Path for ProjectImg
                LanguagesImgPath: StoragePath + 'Languages/', // Path for LanguagesImg
            }) // Sets FirebaseStoragePaths with Json ID & paths
    }
    
    //Cierra PopUp de Formato invalida
    const closeinvalidFilePopUp = () => {setinvalidFilePopUp(null)}

    // Prepare Images to upload & resize at Firebase Storage
    function ToResize(e,setState, State) { // Receives object data & state to keep Jsons
        var MapedImages = State; // First Local Array defined by previous images selected by user
         if (e.target.files[0] !== undefined) { // If object data exists
             Array.from(e.target.files).forEach(file => { // Process the object data array received
                 let ImgsArray = { // Create local Json for each data file received
                    file: file, // Element 1 is the file as it is
                    orig_url: URL.createObjectURL(file), // Element 2 has the origin URL
                    name: file['name'], // Element 3 has the name
                    type: file['type'], // Element 4 has the type
                    size: file['size'], // Element 5 has the size
                    shortname: file['name'].substr(0, file['name'].lastIndexOf('.')), // Extract the image name without extention to define the resized name
                    rszd_name: file['name'].substr(0, file['name'].lastIndexOf('.')) + '_200X200.webp', // Creates Resized image name
                    orig_index: MapedImages.length // Settle the Image order based on maped array length
                 };
                MapedImages = MapedImages.concat(ImgsArray); // Appends local Json created at Local Array of maped images
             });
             setState(MapedImages) // Update the state received with local Array with Image Jsons created.
        } else { // If object data doesn't exist display error messaje.
             setinvalidFilePopUp(file['name'] + " Rejected. Valid formats: png, jpg, jpeg, gif, webp"); // Invalid format error message
        }
    }

    /* Pendientes del programa
    - env.local
    - Reglas de SQL
    - Permitir en Job Experience poner Nowadays en fecha de termino para el ultimo empleo
    - Autenticación
    - Privacidad de datos
    - FrontEnd de la app
    - Exportación de Resume en PDF
    - JQuery & Ajax
    - Deployment
    - Translation Languages
    - Cover Letter
    */

    const ImagesToStorage = () => { // Upload mapped images from user to be resized and storaged at Firebase
        // deleteFiles(ref(Storage,'/Resized/Resumes/')) // Deletition of previous files at path
        {MyProfileImg[0] && MyProfileImg.map((Img)=>{ // If MyProfileImg has elements
            uploadBytes(ref(Storage, FirebaseStoragePaths.ProfileImgPath + Img.name),Img.file) // Upload bytes to Storage at Firebase
        })}
        {MyQrCodeImg[0] && MyQrCodeImg.map((Qr)=>{ // If MyQrCodeImg has elements
            uploadBytes(ref(Storage, FirebaseStoragePaths.QrCodeImgPath + Qr.name), Qr.file) // Upload bytes to Storage at Firebase
        })}
        {SkillEvidenceImg[0] && SkillEvidenceImg.map((Skill)=>{ // If SkillEvidenceImg has elements
            uploadBytes(ref(Storage, FirebaseStoragePaths.SkillsImgPath + Skill.name), Skill.file) // Upload bytes to Storage at Firebase
        })}
        {ExperienceEvidenceImg[0] && ExperienceEvidenceImg.map((Experience)=>{ // If ExperienceEvidenceImg has elements
            uploadBytes(ref(Storage, FirebaseStoragePaths.ExperienceImgPath + Experience.name), Experience.file) // Upload bytes to Storage at Firebase
        })}
        {ProjectEvidenceImg[0] && ProjectEvidenceImg.map((Project)=>{ // If ProjectEvidenceImg has elements
            uploadBytes(ref(Storage, FirebaseStoragePaths.ProjectImgPath + Project.name), Project.file) // Upload bytes to Storage at Firebase
        })}
        {LanguagesEvidenceImg[0] && LanguagesEvidenceImg.map((Language)=>{ // If LanguagesEvidenceImg has elements
            uploadBytes(ref(Storage, FirebaseStoragePaths.LanguagesImgPath + Language.name), Language.file) // Upload bytes to Storage at Firebase
        })}
    }
    useEffect(() => {
        {FirebaseStoragePaths == null && CreateID(7)} // Defines a New ID  with encryption level between 7 and 35 if there is not assigned yet and the paths for firebase.
        setWebLink({...WebLink, // Update Json for MySql Db with all form data
            'Candidate': Candidate, // Update each Candidate fieldset with their last data
            'SocialMedia': SocMedArray, // Update each SocialMedia fieldset with their last data
            'Skills': SkillsArray, // Update each Skills fieldset with their last data
            'Experience': ExperienceArray, // Update each Experience fieldset with their last data
            'Schooling': SchoolingArray, // Update each Schooling fieldset with their last data
            'Projects': ProjectsArray, // Update each Project fieldset with their last data
            'Languages': LanguagesArray, // Update each Project fieldset with their last data
        });
        // setURLsResized({ // Json with resized URLs from Firebase Storage
        //     'Profile': URLRsdProfile, // URLs resized images for Profile section.
        //     'Qr': URLRsdQr, // URLs resized images for Qr section.
        //     'Skill': URLRsdSkill, // URLs resized images for Skill section.
        //     'Job': URLRsdJob, // URLs resized images for Job section.
        //     'Project': URLRsdProject, // URLs resized images for Project section.
        // });
    }, [Candidate, SocMedArray, SkillsArray, ExperienceArray, ProjectsArray, SchoolingArray, LanguagesArray]) // Trigers to update when change
    // }, [Candidate, SocMedArray, SkillsArray, ExperienceArray, ProjectsArray, SchoolingArray,URLRsdProfile,URLRsdQr,URLRsdSkill,URLRsdJob,URLRsdProject]) // Trigers to update when change

    // async function ResizedStoragedURLs() {
    //     const StrgProfileList = await listAll(ref(Storage, FirebaseStoragePaths.ProfileImgPath));
    //     const StrgQrList = await listAll(ref(Storage,FirebaseStoragePaths.QrCodeImgPath));
    //     const StrgSkillList = await listAll(ref(Storage,FirebaseStoragePaths.SkillsImgPath));
    //     const StrgJobList = await listAll(ref(Storage,FirebaseStoragePaths.ExperienceImgPath));
    //     const StrgProjList = await listAll(ref(Storage,FirebaseStoragePaths.ProjectImgPath));
        
    //     let Profile = [];
    //     StrgProfileList.items.map(async (Rzd)=>{
    //         if(Rzd.name.includes("_200x200.webp")){
    //             Profile.push(await getDownloadURL(ref(Storage,FirebaseStoragePaths.ProfileImgPath + Rzd.name)))
    //             setURLRsdProfile(Profile)
    //         }
    //     })
    //     let Qr = [];
    //     StrgQrList.items.map(async (Rzd)=>{
    //         if(Rzd.name.includes("_200x200.webp")){
    //             Qr.push(await getDownloadURL(ref(Storage,FirebaseStoragePaths.QrCodeImgPath + Rzd.name)))
    //             setURLRsdQr(Qr)
    //         }
    //     })
    //     let Skill = [];
    //     StrgSkillList.items.map(async (Rzd)=>{
    //         if(Rzd.name.includes("_200x200.webp")){
    //             Skill.push(await getDownloadURL(ref(Storage,FirebaseStoragePaths.SkillsImgPath + Rzd.name)))
    //             setURLRsdSkill(Skill)
    //         }
    //     })
    //     let Job = [];
    //     StrgJobList.items.map(async (Rzd)=>{
    //         if(Rzd.name.includes("_200x200.webp")){
    //             Job.push(await getDownloadURL(ref(Storage,FirebaseStoragePaths.ExperienceImgPath + Rzd.name)))
    //             setURLRsdJob(Job)
    //         }
    //     })
    //     let Project = [];
    //     StrgProjList.items.map(async (Rzd)=>{
    //         if(Rzd.name.includes("_200x200.webp")){
    //             Project.push(await getDownloadURL(ref(Storage,FirebaseStoragePaths.ProjectImgPath + Rzd.name)))
    //             setURLRsdProject(Project)
    //         }
    //     })
    // }

    const SaveInMySql=()=>{
        Axios.post('http://localhost:5000/api/insert',WebLink)
        .then(()=>{
            console.log("Succesfull Insertion")
        })
    }
    const SaveInFirestore=()=>{
        addDoc(ResumesColl,{
            Profile: Candidate,
            SocialMedias: SocMedArray,
            Skills: SkillsArray,
            SkillsImgPath: FirebaseStoragePaths.SkillsImgPath,
            JobExperience: ExperienceArray,
            JobExperienceImgPath: FirebaseStoragePaths.ExperienceImgPath,
            Schooling: SchoolingArray,
            Projects: ProjectsArray,
            ProjectsImgPath: FirebaseStoragePaths.ProjectImgPath,
            LanguagesImgPath: FirebaseStoragePaths.LanguagesImgPath
        })
    }
    function submitCandidate (e) {
        e.preventDefault(); // Prevent 
        ImagesToStorage(); // Images upload process to Firebase Storage to be resized
        // {Retry>0 && setTimeout(()=>(ResizedStoragedURLs()),WaitTime)}
        SaveInMySql(); // MySql Database - Activated by demand
        SaveInFirestore(); // Firestore Database - Activated by demand
    }
    const handleRemove = (setArr, Arr, index)=>{
        let newArr = [...Arr]
        newArr.splice(index,1)
        setArr(newArr)
    }

    const subprojects = (Arr)=>{
        let projArr = [];
        Arr.map((arr)=>{
            projArr.push({OptMenu: arr.projectTitle, RefLink: arr.projLinks, SubMenu: null})
        })
        return (
            projArr
        )
    }

    return(
        <>
            <form >
                <button type="button" className={styles.PreviewSite} onClick={()=>setPopUp(true)}>Preview Portfolio Website</button>
                <div className={styles.UploaderForm}>
                    {/* Profile */}
                    <fieldset className={styles.SectionFieldset}>
                        <label htmlFor="firstName">First Name
                            <input onChange={(e)=> setCandidate({ ...Candidate, [e.target.name]: e.target.value })} id="firstName" className={styles.ContactElement} name="firstName" maxLength={70} type="text" required />
                        </label>
                        <label htmlFor="lastName">Last name
                            <input onChange={(e)=> setCandidate({ ...Candidate, [e.target.name]: e.target.value })} id="lastName" className={styles.ContactElement} name="lastName" type="text" required />
                        </label>
                        <label htmlFor="email">Email
                            <input onChange={(e)=> setCandidate({ ...Candidate, [e.target.name]: e.target.value })} id="email" className={styles.ContactElement} name="email" type="email" maxLength={210} required />
                        </label>
                        <label htmlFor="contactNumber">Contact Number
                            <input onChange={(e)=> {if(!isNaN(e.target.value)){setCntNumbr(e.target.value)}; setCandidate({ ...Candidate, [e.target.name]: e.target.value })}} id="contactNumber" className={styles.ContactElement} name="contactNumber" type="tel" minLength={10} maxLength={14} required placeholder='10 digits number' value={CntNumbr}/>
                        </label>
                        <label htmlFor="introduction">Personal Introduction
                            <textarea onChange={(e)=> setCandidate({ ...Candidate, [e.target.name]: e.target.value })} id="introduction" className={styles.ContactElement} name="introduction" rows="4" maxLength={5000} required placeholder="Write your personal Introduction."/>
                        </label>
                        <details className={styles.details} open><summary>Profile Image, Qr and Colors</summary>
                        <div className={styles.ImgsRsz}>
                                {MyProfileImg[0] ?
                                    <div>
                                        <span className={styles.SpanDelete} draggable={true} onDragEnd={() => setMyProfileImg([])} onClick={() => setMyProfileImg([])}></span>
                                        <div className={styles.Previews}>
                                            <Image src={MyProfileImg[0].orig_url} layout="fill" alt="Profile Photo" onDragEnd={() => setMyProfileImg([])} />
                                        </div>
                                    </div>
                                :
                                    <label className={styles.ContentImgRsz} htmlFor="imageURL">Personal Photo (Optional)
                                        <input id="imageURL" className={styles.SelectImgRsz} type="file" name="imageURL" accept="image/x-png,image/jpg,image/jpeg,image/gif,image/webp" 
                                            onChange={(e) => (ToResize(e,setMyProfileImg, MyProfileImg), setCandidate({ ...Candidate, [e.target.name]: FirebaseStoragePaths.ProfileImgPath }))}
                                            />
                                    </label>
                                }
                                {MyQrCodeImg[0] ?
                                    <div>
                                        <span className={styles.SpanDelete} draggable={true} onDragEnd={() => setMyQrCodeImg([])} onClick={() => setMyQrCodeImg([])}></span>
                                        <div className={styles.Previews}>
                                            <Image src={MyQrCodeImg[0].orig_url} layout="fill" alt="QR Code" onDragEnd={() => setMyQrCodeImg([])} />
                                        </div>
                                    </div>
                                :
                                    <label className={styles.ContentImgRsz} htmlFor="qrCode">Qr Code  (Optional)
                                        <input id="qrCode" className={styles.SelectImgRsz} type="file" name="qrCode" accept="image/x-png,image/jpg,image/jpeg,image/gif,image/webp" 
                                            onChange={(e) => (ToResize(e,setMyQrCodeImg, MyQrCodeImg), setCandidate({ ...Candidate, [e.target.name]: FirebaseStoragePaths.QrCodeImgPath }))}
                                            />
                                    </label>
                                }                  
                                <label className={styles.ContentImgRsz} htmlFor="baseColor">Base
                                    <input type="color" id="baseColor" name="baseColor" value={Candidate.baseColor ? Candidate.baseColor : "#000000"} onChange={(e)=> setCandidate({ ...Candidate, [e.target.name]: e.target.value })} />
                                </label>
                                <label className={styles.ContentImgRsz} htmlFor="fontColor">Font
                                    <input type="color" id="fontColor" name="fontColor" value={Candidate.fontColor ? Candidate.fontColor : "#FFFFFF"} onChange={(e)=> setCandidate({ ...Candidate, [e.target.name]: e.target.value })} />
                                </label>
                            </div>
                        </details>
                    </fieldset>
                    {/* Social Media */}
                    <fieldset className={styles.SectionFieldset}>
                        <label htmlFor="SocMedPlatform">Social Media Platform
                            <select name="SocMedPlatform" id={styles.MediaOptions} className={styles.ContactElement} value={(NewSMJson.SocMedPlatform ? NewSMJson.SocMedPlatform : 'default')} maxLength={70}
                                onChange={(e)=>setNewSMJson({...NewSMJson, 'SocMedPlatform' : e.target.value})}>
                                <option value="default" disabled>Select</option>
                                <option value="Facebook" >Facebook</option>
                                <option value="Instagram" >Instagram</option>
                                <option value="TikTok" >TikTok</option>
                                <option value="YouTube" >YouTube</option>
                                <option value="LinkedIn" >LinkedIn</option>
                                <option value="Indeed" >Indeed</option>
                                <option value="Twitter" >Twitter</option>
                                <option value="Pinterest" >Pinterest</option>
                                <option value="Discord" >Discord</option>
                            </select>
                        </label>
                        <label htmlFor='IdLink'>Link ID
                            <input className={styles.ContactElement} name='IdLink' type='text' placeholder='Link or ID' maxLength={140} value={NewSMJson.IdLink}
                                onChange={(e)=>{setNewSMJson({...NewSMJson, 'IdLink': e.target.value})}}/>
                        </label>
                        <a className={styles.ContactSubmit} 
                            onClick={()=>{
                                (NewSMJson.SocMedPlatform && NewSMJson.IdLink) && 
                                setSocMedArray(SocMedArray.concat(NewSMJson)),
                                setNewSMJson({
                                    SocMedPlatform:'default',
                                    IdLink:'',
                                })
                            }}
                        >Add Social Media Link</a>
                        <div className={styles.Added}>
                            <details className={styles.details} open><summary>Display Social Media</summary>
                                {SocMedArray[0] && 
                                    SocMedArray.map((SM, index)=>{
                                        var IconSM = ''
                                        switch (SM.SocMedPlatform) {
                                            case "Facebook": IconSM = '/Icons/FacebookIcon.png'; break;
                                            case "YouTube": IconSM = '/Icons/YouTubeIcon.png'; break;
                                            case "Instagram": IconSM = '/Icons/InstagramIcon.png'; break;
                                            case "Twitter": IconSM = '/Icons/TwitterIcon.png'; break;
                                            case "LinkedIn": IconSM = '/Icons/LinkedInIcon.png'; break;
                                            case "Indeed": IconSM = '/Icons/IndeedIcon.png'; break;
                                            case "Pinterest": IconSM = '/Icons/PinterestIcon.png'; break;
                                            case "TikTok": IconSM = '/Icons/TikTokIcon.png'; break;
                                            case "Discord": IconSM = '/Icons/Discord.png'; break;
                                        }
                                        return (
                                            <div className={styles.DivBlock} key={index} draggable={true} onDragEnd={() => handleRemove(setSocMedArray, SocMedArray,index)}>
                                                <a><Image src={IconSM} width={21} height={21} alt=""/>  {SM.IdLink}</a>
                                                <span onClick={() => handleRemove(setSocMedArray,SocMedArray,index)}>x</span>
                                            </div>
                                        )
                                    })
                                }
                            </details>
                        </div>
                    </fieldset>
                    {/* Skills */}
                    <fieldset className={styles.SectionFieldset}>
                        <label htmlFor='skillTitle'>Skill Title
                            <input onChange={(e)=> setNewSkillJson({...NewSkillJson,[e.target.name]: e.target.value, 'skillImg': FirebaseStoragePaths.SkillsImgPath})} id='skillTitle' className={styles.ContactElement} name='skillTitle' maxLength={140} value={NewSkillJson.skillTitle}/>
                        </label>
                        <label htmlFor='skillDescr'>Description
                            <input onChange={(e)=> setNewSkillJson({...NewSkillJson,[e.target.name]: e.target.value})} id='skillDescr' className={styles.ContactElement} name='skillDescr' maxLength={3500} value={NewSkillJson.skillDescr}/>
                        </label>
                        <label htmlFor='skillLink'>Evidence Link
                            <input onChange={(e)=> setNewSkillJson({...NewSkillJson,[e.target.name]:e.target.value})} id='skillLink' className={styles.ContactElement} name='skillLink' type='url' maxLength={350} value={NewSkillJson.skillLink}/>
                        </label>
                        <a className={styles.ContactSubmit}
                            onClick={()=>{
                                (NewSkillJson.skillTitle && NewSkillJson.skillDescr) && 
                                setSkillsArray(SkillsArray.concat(NewSkillJson)),
                                setNewSkillJson({
                                    skillTitle: '',
                                    skillDescr: '',
                                    skillLink: ''
                                })
                            }}
                        >Add Skill</a>
                        <details className={styles.details} open><summary>Attach Skills Images Evidence</summary>
                            <div className={styles.Added}>
                                    {SkillsArray[0] && 
                                        SkillsArray.map((skill,index)=>{
                                            return (
                                                <div className={styles.DivBlock} key={index} draggable={true} onDragEnd={() => handleRemove(setSkillsArray, SkillsArray,index)}>
                                                    <a>{skill.skillTitle}</a>
                                                    <span onClick={() => handleRemove(setSkillsArray,SkillsArray,index)}>x</span>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                            <div className={styles.ImgsRsz}>
                                {SkillEvidenceImg.length < CapImg ?
                                    <label className={styles.ContentImgRsz} htmlFor="skillImg">Evidence Images. Optional (Max {CapImg - SkillEvidenceImg.length})
                                        <input id="skillImg" className={styles.SelectImgRsz} type="file" multiple name="skillImg" accept="image/x-png,image/jpg,image/jpeg,image/gif,image/webp" 
                                            onChange={(e) => ToResize(e,setSkillEvidenceImg, SkillEvidenceImg)}
                                            />
                                    </label>
                                    :
                                    <>
                                        {SkillEvidenceImg.length > CapImg && 
                                            (
                                                setTimeout(()=>setSkillEvidenceImg([]),WaitTime),
                                                <h4>No more than {CapImg} Images</h4>
                                            )
                                        }
                                    </>
                                }
                                {(SkillEvidenceImg[0] && SkillEvidenceImg.length <= CapImg) &&
                                    SkillEvidenceImg.map((Evidence, index)=>{
                                        return(
                                            <div key={index} >
                                                <span className={styles.SpanDelete} draggable={true} onDragEnd={() => handleRemove(setSkillEvidenceImg, SkillEvidenceImg,index)} key={index} id={index} onClick={() => handleRemove(setSkillEvidenceImg, SkillEvidenceImg,index)}></span>
                                                <div className={styles.Previews}>
                                                    <Image src={Evidence.orig_url} layout="fill" alt="Skill Evidence" onDragEnd={() => handleRemove(setSkillEvidenceImg, SkillEvidenceImg,index)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </details>
                    </fieldset>
                    {/* Job Experience */}
                    <fieldset className={styles.SectionFieldset}>
                        <label htmlFor='jobTitle'>Job Title
                            <input onChange={(e)=> setNewExpJson({...NewExpJson,[e.target.name]: e.target.value, 'jobImg': FirebaseStoragePaths.ExperienceImgPath})} id='jobTitle' className={styles.ContactElement} name='jobTitle' maxLength={140} value={NewExpJson.jobTitle}/>
                        </label>
                        <label htmlFor='company'>Company
                            <input onChange={(e)=> setNewExpJson({...NewExpJson,[e.target.name]:e.target.value})} id='company' className={styles.ContactElement} name='company' maxLength={210} value={NewExpJson.company}/>
                        </label>
                        <label htmlFor='JobStartDate'>Start Date
                            <input onChange={(e)=> setNewExpJson({...NewExpJson,[e.target.name]:e.target.value})} id='JobStartDate' className={styles.ContactElement} name='JobStartDate' type='month' value={NewExpJson.JobStartDate}/>
                        </label>
                        <label htmlFor='JobEndDate'>End Date
                            <input onChange={(e)=> setNewExpJson({...NewExpJson,[e.target.name]:e.target.value})} id='JobEndDate' className={styles.ContactElement} name='JobEndDate' type='month' value={NewExpJson.JobEndDate}/>
                        </label>
                        <label htmlFor='jobDescr'>Job Description
                            <input onChange={(e)=> setNewExpJson({...NewExpJson,[e.target.name]:e.target.value})} id='jobDescr' className={styles.ContactElement} name='jobDescr' maxLength={5000} value={NewExpJson.jobDescr}/>
                        </label>
                        <a className={styles.ContactSubmit}
                            onClick={()=>{
                                (NewExpJson.jobTitle && NewExpJson.company && NewExpJson.JobStartDate && NewExpJson.JobEndDate && NewExpJson.jobDescr) && 
                                setExperienceArray(ExperienceArray.concat(NewExpJson)),
                                setNewExpJson({
                                    jobTitle: '',
                                    company: '',
                                    JobStartDate: '',
                                    JobEndDate: '',
                                    jobDescr: ''
                                })
                            }}
                        >Add Experience</a>
                        <details className={styles.details} open><summary>Attach Job Images Evidence</summary>
                            <div className={styles.Added}>
                                {ExperienceArray[0] && ExperienceArray.map((exp,index)=>{
                                    return(
                                        <div className={styles.DivBlock} key={index} draggable={true} onDragEnd={() => handleRemove(setExperienceArray, ExperienceArray,index)}>
                                            <a>{exp.jobTitle}</a>
                                            <span onClick={() => handleRemove(setExperienceArray,ExperienceArray,index)}>x</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.ImgsRsz}>
                                {ExperienceEvidenceImg.length < CapImg ?
                                        <label className={styles.ContentImgRsz} htmlFor="ExperienceImage">Evidence Images. Optional (Max {CapImg - ExperienceEvidenceImg.length})
                                            <input id="ExperienceImage" className={styles.SelectImgRsz} type="file" name="ExperienceImage" multiple accept="image/x-png,image/jpg,image/jpeg,image/gif,image/webp"
                                                onChange={(e) => ToResize(e,setExperienceEvidenceImg, ExperienceEvidenceImg)}
                                                />
                                        </label>
                                    :
                                        <>
                                            {ExperienceEvidenceImg.length > CapImg && 
                                                (
                                                    setTimeout(()=>setExperienceEvidenceImg([]),WaitTime),
                                                    <h4>No more than {CapImg} Images</h4>
                                                )
                                            }
                                        </>
                                }
                                {(ExperienceEvidenceImg[0] && ExperienceEvidenceImg.length <= CapImg) &&
                                    ExperienceEvidenceImg.map((Evidence, index)=>{
                                        return(
                                            <div key={index} >
                                                <span className={styles.SpanDelete} draggable={true} onDragEnd={() => handleRemove(setExperienceEvidenceImg, ExperienceEvidenceImg,index)} key={index} id={index} onClick={() => handleRemove(setExperienceEvidenceImg, ExperienceEvidenceImg,index)}></span>
                                                <div className={styles.Previews}>
                                                    <Image src={Evidence.orig_url} layout="fill" alt="Experience Evidence" onDragEnd={() => handleRemove(setExperienceEvidenceImg, ExperienceEvidenceImg,index)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </details>
                    </fieldset>
                    {/* Schooling */}
                    <fieldset className={styles.SectionFieldset}>
                        <label htmlFor='institution'>Institution
                            <input onChange={(e)=> setNewSchoolJson({...NewSchoolJson,[e.target.name]:e.target.value})} id='institution' className={styles.ContactElement} name='institution' maxLength={140} value={NewSchoolJson.institution}/>
                        </label>
                        <label htmlFor='gradeObtained'>Last Grade Obtained
                            <input onChange={(e)=> setNewSchoolJson({...NewSchoolJson,[e.target.name]:e.target.value})} id='gradeObtained' className={styles.ContactElement} name='gradeObtained' maxLength={140} value={NewSchoolJson.gradeObtained}/>
                        </label>
                        <label htmlFor='SchEndDate'>End Date
                            <input onChange={(e)=> setNewSchoolJson({...NewSchoolJson,[e.target.name]:e.target.value})} id='SchEndDate' className={styles.ContactElement} name='SchEndDate' type='month' value={NewSchoolJson.SchEndDate}/>
                        </label>
                        <a className={styles.ContactSubmit}
                            onClick={(e)=>{
                                (NewSchoolJson.institution && NewSchoolJson.gradeObtained) &&
                                setSchoolingArray(SchoolingArray.concat(NewSchoolJson))
                                setNewSchoolJson({
                                    institution: '',
                                    gradeObtained: '',
                                    SchEndDate: ''
                                })
                            }}
                        >Add Schooling</a>
                        <div className={styles.Added}>
                            <details className={styles.details} open><summary>Display Schooling Detail</summary>
                                {SchoolingArray[0] && SchoolingArray.map((school,index)=>{
                                    return(
                                        <div className={styles.DivBlock} key={index} draggable={true} onDragEnd={() => handleRemove(setSchoolingArray, SchoolingArray,index)}>
                                            <a>{school.institution}</a>
                                            <span onClick={() => handleRemove(setSchoolingArray,SchoolingArray,index)}>x</span>
                                        </div>
                                    )
                                })}
                            </details>
                        </div>
                    </fieldset>
                    {/* Projects */}
                    <fieldset className={styles.SectionFieldset}>
                        <label htmlFor='projectTitle'>Project Tittle
                            <input onChange={(e)=> setNewProjJson({...NewProjJson,[e.target.name]:e.target.value, 'projImg': FirebaseStoragePaths.ProjectImgPath})} id='projectTitle' className={styles.ContactElement} name='projectTitle' maxLength={210} value={NewProjJson.projectTitle}/>
                        </label>
                        <label htmlFor='projDescr'>Description
                            <input onChange={(e)=> setNewProjJson({...NewProjJson,[e.target.name]:e.target.value})} id='projDescr' className={styles.ContactElement} name='projDescr' maxLength={3500} value={NewProjJson.projDescr}/>
                        </label>
                        <label htmlFor='projObjectives'>Objective
                            <input onChange={(e)=> setNewProjJson({...NewProjJson,[e.target.name]:e.target.value})} id='projObjectives' className={styles.ContactElement} name='projObjectives'  maxLength={3500} value={NewProjJson.projObjectives}/>
                        </label>
                        <label htmlFor='projAchievements'>Achievements
                            <input onChange={(e)=> setNewProjJson({...NewProjJson,[e.target.name]:e.target.value})} id='projAchievements' className={styles.ContactElement} name='projAchievements'  maxLength={3500} value={NewProjJson.projAchievements}/>
                        </label>
                        <label htmlFor='projLinks'>Project Link
                            <input onChange={(e)=> setNewProjJson({...NewProjJson,[e.target.name]:e.target.value})} id='projLinks' className={styles.ContactElement} name='projLinks' type='url' maxLength={350} value={NewProjJson.projLinks}/>
                        </label>
                        <a className={styles.ContactSubmit}
                            onClick={(e)=>{
                                (NewProjJson.projectTitle && NewProjJson.projDescr) &&
                                setProjectsArray(ProjectsArray.concat(NewProjJson))
                                setNewProjJson({
                                    projectTitle: '',
                                    projDescr: '',
                                    projObjectives: '',
                                    projAchievements: '',
                                    projLinks: ''
                                })
                            }}
                        >Add Project</a>
                        <details className={styles.details} open><summary>Attach Project Images Evidence</summary>
                            <div className={styles.Added}>
                                {ProjectsArray[0] && ProjectsArray.map((proj,index)=>{
                                    return(
                                        <div className={styles.DivBlock} key={index} draggable={true} onDragEnd={() => handleRemove(setProjectsArray, ProjectsArray,index)}>
                                            <a>{proj.projectTitle}</a>
                                            <span onClick={() => handleRemove(setProjectsArray,ProjectsArray,index)}>x</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.ImgsRsz}>
                                {ProjectEvidenceImg.length < CapImg ?
                                    <label className={styles.ContentImgRsz} htmlFor="projImg">Evidence Images. Optional (Max {CapImg - ProjectEvidenceImg.length})
                                        <input id="projImg" className={styles.SelectImgRsz} type="file" name="projImg" multiple accept="image/x-png,image/jpg,image/jpeg,image/gif,image/webp"
                                            onChange={(e) => ToResize(e,setProjectEvidenceImg, ProjectEvidenceImg)}
                                        />
                                    </label>
                                    :
                                    <>
                                        {ProjectEvidenceImg.length > CapImg && 
                                            (
                                                setTimeout(()=>setProjectEvidenceImg([]),WaitTime),
                                                <h4>No more than {CapImg} Images</h4>
                                            )
                                        }
                                    </>
                                }
                                {(ProjectEvidenceImg[0] && ProjectEvidenceImg.length <= CapImg) && 
                                    ProjectEvidenceImg.map((Evidence, index)=>{
                                        return(
                                            <div key={index} >
                                                <span className={styles.SpanDelete} draggable={true} onDragEnd={() => handleRemove(setProjectEvidenceImg, ProjectEvidenceImg,index)} key={index} id={index} onClick={() => handleRemove(setProjectEvidenceImg, ProjectEvidenceImg,index)}></span>
                                                <div className={styles.Previews}>
                                                    <Image src={Evidence.orig_url} layout="fill" alt="Project Evidence" onDragEnd={() => handleRemove(setProjectEvidenceImg, ProjectEvidenceImg,index)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </details>
                    </fieldset>
                    {/* Languages */}
                    <fieldset className={styles.SectionFieldset}>
                        <label htmlFor='Language'>Language
                            <input onChange={(e)=> setNewLangJson({...NewLangJson,[e.target.name]:e.target.value, 'langImg': FirebaseStoragePaths.LanguagesImgPath})} id='Language' className={styles.ContactElement} name='Language' maxLength={40} value={NewLangJson.Language}/>
                        </label>
                        <label htmlFor='Reading'>Reading
                            <input onChange={(e)=> setNewLangJson({...NewLangJson,[e.target.name]:e.target.value})} id='Reading' className={styles.ContactElement} name='Reading' type='text' maxLength={14} value={NewLangJson.Reading}/>
                        </label>
                        <label htmlFor='Writting'>Writting
                            <input onChange={(e)=> setNewLangJson({...NewLangJson,[e.target.name]:e.target.value})} id='Writting' className={styles.ContactElement} name='Writting'  type='text' maxLength={14} value={NewLangJson.Writting}/>
                        </label>
                        <label htmlFor='Speaking'>Speaking
                            <input onChange={(e)=> setNewLangJson({...NewLangJson,[e.target.name]:e.target.value})} id='Speaking' className={styles.ContactElement} name='Speaking'  type='text' maxLength={14} value={NewLangJson.Speaking}/>
                        </label>
                        <label htmlFor='Listening'>Listening
                            <input onChange={(e)=> setNewLangJson({...NewLangJson,[e.target.name]:e.target.value})} id='Listening' className={styles.ContactElement} name='Listening' type='text' maxLength={14} value={NewLangJson.Listening}/>
                        </label>
                        <a className={styles.ContactSubmit}
                            onClick={(e)=>{
                                (NewLangJson.Language && NewLangJson.Reading && NewLangJson.Writting && NewLangJson.Speaking && NewLangJson.Listening) &&
                                setLanguagesArray(LanguagesArray.concat(NewLangJson))
                                setNewLangJson({
                                    Language: '',
                                    Reading: '',
                                    Writting: '',
                                    Speaking: '',
                                    Listening: ''
                                })
                            }}
                        >Add Language</a>
                        <details className={styles.details} open><summary>Attach Language Images Evidence</summary>
                            <div className={styles.Added}>
                                {LanguagesArray[0] && LanguagesArray.map((lang,index)=>{
                                    return(
                                        <div className={styles.DivBlock} key={index} draggable={true} onDragEnd={() => handleRemove(setLanguagesArray, LanguagesArray,index)}>
                                            <a>{lang.Language}</a>
                                            <span onClick={() => handleRemove(setLanguagesArray,LanguagesArray,index)}>x</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.ImgsRsz}>
                                {LanguagesEvidenceImg.length < CapImg ?
                                    <label className={styles.ContentImgRsz} htmlFor="langImg">Evidence Images. Optional (Max {CapImg - LanguagesEvidenceImg.length})
                                        <input id="langImg" className={styles.SelectImgRsz} type="file" name="langImg" multiple accept="image/x-png,image/jpg,image/jpeg,image/gif,image/webp"
                                            onChange={(e) => ToResize(e,setLanguagesEvidenceImg, LanguagesEvidenceImg)}
                                        />
                                    </label>
                                    :
                                    <>
                                        {LanguagesEvidenceImg.length > CapImg && 
                                            (
                                                setTimeout(()=>setLanguagesEvidenceImg([]),WaitTime),
                                                <h4>No more than {CapImg} Images</h4>
                                            )
                                        }
                                    </>
                                }
                                {(LanguagesEvidenceImg[0] && LanguagesEvidenceImg.length <= CapImg) && 
                                    LanguagesEvidenceImg.map((Evidence, index)=>{
                                        return(
                                            <div key={index} >
                                                <span className={styles.SpanDelete} draggable={true} onDragEnd={() => handleRemove(setLanguagesEvidenceImg, LanguagesEvidenceImg,index)} key={index} id={index} onClick={() => handleRemove(setLanguagesEvidenceImg, LanguagesEvidenceImg,index)}></span>
                                                <div className={styles.Previews}>
                                                    <Image src={Evidence.orig_url} layout="fill" alt="Language Evidence" onDragEnd={() => handleRemove(setLanguagesEvidenceImg, LanguagesEvidenceImg,index)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </details>
                    </fieldset>
                </div>
                <button type="submit" className={styles.SubmitSite} onClick={(e)=>submitCandidate(e)}>Submit</button>
            </form>
            {/* {PopUp &&
                <section id={stylesWeb.WebBase}>
                    <button onClick={()=>setPopUp(false)}>Close Preview</button>
                    <ICPagesHead {...{
                        author: 'Alain',
                        title: Candidate.firstName + " - Weblink",
                        description: 'description',
                        content: "Alain Rivera®",
                        icon: "../Icons/AYRSIcon.png"
                        }}/>
                    <ICHeaderMenu {...{
                        NavMenus: [
                        {OptMenu: 'Resumenes', RefLink: '/resumePrw', SubMenu: null},
                        {OptMenu: 'Proyectos', RefLink: '/projectsPrw', SubMenu: subprojects(ProjectsArray)},
                        {OptMenu: 'Contacto', RefLink: '/contact', SubNavMenu: null},
                        ]
                    }}/>
                   <Loby {...{
                        Name: Candidate.firstName,
                        Personal_Photo: (MyProfileImg[0] && MyProfileImg[0].orig_url),
                        Personal_Introduction: Candidate.introduction
                    }}/>
                  <ICFooters {...{FotLegend: "Email: " + Candidate.email + ". Phone: " + Candidate.contactNumber}}/>
                </section>
            } */}
            {invalidFilePopUp && <div className={styles.invalidFilePopUp} onClick={closeinvalidFilePopUp}>{invalidFilePopUp}</div>}
        </>
    )
}