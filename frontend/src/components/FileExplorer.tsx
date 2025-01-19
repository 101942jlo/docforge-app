import { useEffect, useState } from "react";
import { FileHolder } from "./FileHolder"
import { NewFileHolder } from "./NewFileHolder"
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "./AuthProvider";

interface FileExplorerProps {
    setShowFolders: (ww: boolean)=>void
    setShowFiles: (ww: boolean)=>void
    folderName: string
    setIsModalFileOpen: (ww:boolean)=>void
}

export const FileExplorer = ({ setShowFolders, setShowFiles, folderName, setIsModalFileOpen}:FileExplorerProps) => {
    const [del, setDel] = useState(false)
    // const [isFile, setIsFile] = useState(false)
    const { folderFiles } = useAuth()

    const handleClick = () => {
        setShowFolders(true)
        setShowFiles(false)
        setDel(true)
    }

    useEffect(()=> {
        if (folderFiles != null){
            if (folderFiles.length > 0){
                // setIsFile(true)                
            }
        }
    }, [folderFiles])



    if (del) return null
    return (
        <div className="flex flex-col">
            <div className="flex gap-4 mb-5 items-center">
                <div className="flex items-centerrounded rounded-2xl bg-white items-center py-3 px-5">
                    <button onClick={handleClick} className="px-5 py-2 hover:bg-slate-200 rounded-xl">dashboard</button>
                    <h1 className="text-2xl">&gt;</h1>
                    <h1 className="px-5 py-2 rounded-x">{folderName}</h1>
                    <IoIosArrowDown className="text-xl"/>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <NewFileHolder setIsModalOpen={setIsModalFileOpen}/>
                {folderFiles && folderFiles?.map(file =>{return(<FileHolder key={file.id} fileId={file.id} fileName={file.filename} />)})}
            </div>
        </div>
    )
}