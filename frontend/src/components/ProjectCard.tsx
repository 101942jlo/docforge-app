import { FcFolder } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { useAuth } from "./AuthProvider";
import { useState } from "react";


export const ProjectCard = ({ folderName, folderId, setShowFiles, setShowFolders, setSelectedFolder, setSelectedFolderId }: { folderName: string, folderId: string, setShowFiles: (aa:boolean)=> void, setShowFolders: (aa:boolean)=>void, setSelectedFolder: (aa:string)=>void, setSelectedFolderId:(aa: string)=>void}) => {
    const { handleDeleteFolder, fileInFolder } = useAuth()
    const [del, setDel] = useState(false)

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleDeleteFolder({folderId: folderId})
        setDel(true)
    }

    const getFilesInFolder = ()=> {
        fileInFolder({folderId})
        setShowFiles(true)
        setShowFolders(false)
        setSelectedFolder(folderName)
        setSelectedFolderId(folderId)
    }

    if (del) return null

    return (
      <div onClick={getFilesInFolder} className="relative flex justify-center items-center text-slate-800 bg-white w-52 h-52 p-5 rounded-3xl shadow-xl hover:bg-yellow-100 transition-all group">
        {/* Icon in Top Right Corner - visible on hover */}
        <div onClick={handleDelete} className="border-2 border-gray-400 rounded-md p-1 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <MdDelete className="text-2xl text-gray-400 hover:text-gray-800 cursor-pointer" />
        </div>
  
        <div className="flex flex-col justify-center items-center w-full">
          <FcFolder className="text-8xl" />
          <h1>{folderName}</h1>
        </div>
      </div>
    );
  };