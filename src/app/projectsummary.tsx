"use client"
import { Textarea } from "@/components/ui/textarea"
import React, { useState, useEffect } from "react"
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase";



interface ProjectSummaryProps {
    userID : string,
    projectID: string;
}


const ProjectSummary : React.FC<ProjectSummaryProps>= ({userID, projectID}) => {

    const [context, setContext] = useState<string>("");
    const [conflict, setConflict] = useState<string>("");
    const [resolution, setResolution] = useState<string>("");
    const [reaction, setReaction] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", userID, "projects", projectID)
            const docRes = await getDoc(docRef);
            if (docRes.exists()){
                const data = docRes.data();
                setContext(data?.Context || "");
                setConflict(data?.Conflict || "");
                setResolution(data?.Resolution || "");
                setReaction(data?.Reaction || "");
            }
        }
        fetchData();
    }, [userID, projectID]);
    

    const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContext(e.target.value);
    };

    const handleConflictChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setConflict(e.target.value);
    };

    const handleResolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResolution(e.target.value);
    };

    const handleReactionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReaction(e.target.value);
    };

    return (
        <div className="flex-col justify-center items-center bg-[#FFFFFF] w-96 border-[#BDBDBD] border-2 p-3 h-screen overflow-scroll">
            <div className="flex justify-between p-3 h-10 w-full border-[#BDBDBD] border-b-2">
                <div className="flex flex-row items-center gap-3">
                    <p className="text-[#1769FF] ">Project Info</p>
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.1174 5.4325C12.3245 5.64551 12.3245 5.99087 12.1174 6.20388L7.87496 10.5675C7.77551 10.6698 7.64062 10.7273 7.49998 10.7273C7.35933 10.7273 7.22445 10.6698 7.125 10.5675L2.88257 6.20388C2.67548 5.99087 2.67548 5.64551 2.88257 5.4325C3.08967 5.21948 3.42544 5.21948 3.63253 5.4325L7.49998 9.41044L11.3674 5.4325C11.5745 5.21948 11.9103 5.21948 12.1174 5.4325Z" fill="#1769FF" />
                    </svg>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7276 2.44418L14.4874 5.99288C14.7274 6.48687 15.3673 6.9607 15.9073 7.05144L19.0969 7.58576C21.1367 7.92853 21.6167 9.42059 20.1468 10.8925L17.6671 13.3927C17.2471 13.8161 17.0172 14.6327 17.1471 15.2175L17.8571 18.3125C18.417 20.7623 17.1272 21.71 14.9774 20.4296L11.9877 18.6452C11.4478 18.3226 10.5579 18.3226 10.0079 18.6452L7.01827 20.4296C4.8785 21.71 3.57865 20.7522 4.13859 18.3125L4.84851 15.2175C4.97849 14.6327 4.74852 13.8161 4.32856 13.3927L1.84884 10.8925C0.389 9.42059 0.858948 7.92853 2.89872 7.58576L6.08837 7.05144C6.61831 6.9607 7.25824 6.48687 7.49821 5.99288L9.25802 2.44418C10.2179 0.518607 11.7777 0.518607 12.7276 2.44418Z" fill="#BCBCBC" stroke="#BCBCBC" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16669 1.66666H7.50002C3.33335 1.66666 1.66669 3.33332 1.66669 7.49999V12.5C1.66669 16.6667 3.33335 18.3333 7.50002 18.3333H12.5C16.6667 18.3333 18.3334 16.6667 18.3334 12.5V10.8333" stroke="#1769FF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.3667 2.51666L6.80002 9.08333C6.55002 9.33333 6.30002 9.825 6.25002 10.1833L5.89169 12.6917C5.75835 13.6 6.40002 14.2333 7.30835 14.1083L9.81669 13.75C10.1667 13.7 10.6584 13.45 10.9167 13.2L17.4834 6.63333C18.6167 5.5 19.15 4.18333 17.4834 2.51666C15.8167 0.849997 14.5 1.38333 13.3667 2.51666Z" stroke="#1769FF" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.425 3.45834C12.9833 5.45001 14.5417 7.00834 16.5417 7.57501" stroke="#1769FF" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <p className="text-md font-semibold p-2">Context</p>
                <div className="p-3">
                    <p>{context}</p>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <p className="text-md font-semibold p-2">Conflict</p>
                <div className="p-3">
                    <p>{conflict}</p>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <p className="text-md font-semibold p-2">Resolution</p>
                <div className="p-3">
                    <p>{resolution}</p>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <p className="text-md font-semibold p-2">Reaction</p>
                <div className="p-3">
                    <p>{reaction}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectSummary
