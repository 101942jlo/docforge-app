import { HiFolderPlus } from "react-icons/hi2";

export const NewProjectCard = ({setIsModalOpen}:any) => {
    
    const handleOpenModal = () =>{
        setIsModalOpen(true)
    }

    return(
        <div onClick={handleOpenModal} className="flex justify-center items-center text-slate-800 bg-white w-52 h-52 p-5 rounded-3xl shadow-xl hover:bg-slate-200 transition-all">
            <div className="flex flex-col justify-center items-center w-full">
                <HiFolderPlus className="text-8xl text-slate-300"/>
                <h1>New Folder</h1>
            </div>
        </div>
    )
}