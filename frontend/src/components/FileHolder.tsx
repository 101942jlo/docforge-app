
// import { FaFileAlt } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useAuth } from "./AuthProvider";
// import { useState } from "react";

// interface FileHolderProps {
//     fileId: string;
//     fileName: string;
// }

// export const FileHolder = ({ fileId, fileName }: FileHolderProps) => {
//     const { handleDeleteFolder, fileInFolder } = useAuth()
//     const [del, setDel] = useState(false)

//     const handleDelete = () => {
//         handleDeleteFolder({folderId: fileId})
//         setDel(true)
//     }

    
//     if (del) return null

//     return (
//       <div className="relative flex justify-center items-center text-slate-800 bg-white w-52 h-52 p-5 rounded-3xl shadow-xl hover:bg-yellow-100 transition-all group">
//         {/* Icon in Top Right Corner - visible on hover */}
//         <div onClick={handleDelete} className="border-2 border-gray-400 rounded-md p-1 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
//           <MdDelete className="text-2xl text-gray-400 hover:text-gray-800 cursor-pointer" />
//         </div>
  
//         <div className="flex flex-col justify-center items-center w-full">
//           <FaFileAlt className="text-7xl mb-3 text-red-600" />
//           <h1>{fileName}</h1>
//         </div>
//       </div>
//     );
//   };

import { FaFileAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuth } from "./AuthProvider";
import { useState } from "react";

interface FileHolderProps {
    fileId: string;
    fileName: string;
}

export const FileHolder = ({ fileId, fileName }: FileHolderProps) => {
    const { handleDeleteFile, handleDownloadFile } = useAuth();
    const [del, setDel] = useState(false);


    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleDeleteFile({ fileId: fileId });
      setDel(true);
    };
    
    const handleDownload = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleDownloadFile({ fileId: fileId});
    }

    if (del) return null;

    // Extract file extension
    const getFileExtension = (filename: string) => {
        return filename.split(".").pop()?.toLowerCase() || "";
    };

    const fileExtension = getFileExtension(fileName);
    
    // Determine color based on file extension
    const extensionColors: { [key: string]: string } = {
        pdf: "text-red-600",
        xls: "text-green-600",
        xlsx: "text-green-600",
        jpg: "text-sky-300",
        jpeg: "text-sky-300",
        png: "text-sky-300",
        doc: "text-blue-600",
        docx: "text-blue-600",
    };
    
    const fileColor = extensionColors[fileExtension] || "text-orange-500";

    return (
        <div onClick={handleDownload} className="relative flex justify-center items-center text-slate-800 bg-white w-52 h-52 p-5 rounded-3xl shadow-xl hover:bg-yellow-100 transition-all group">
            {/* Icon in Top Right Corner - visible on hover */}
            <div onClick={handleDelete} className="border-2 border-gray-400 rounded-md p-1 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <MdDelete className="text-2xl text-gray-400 hover:text-gray-800 cursor-pointer" />
            </div>
    
            <div className="flex flex-col justify-center items-center w-full">
                <FaFileAlt className={`text-7xl mb-3 ${fileColor}`} />
                <h1>{fileName}</h1>
            </div>
        </div>
    );
};