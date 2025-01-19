import { RiFileAddFill } from "react-icons/ri";


export const NewFileHolder = ({ setIsModalOpen }: any) => {
   
    const handleOpenModal = () =>{
        setIsModalOpen(true)
    }

    return (
      <div onClick={handleOpenModal} className="relative flex justify-center items-center text-slate-800 bg-white w-52 h-52 p-5 rounded-3xl shadow-xl hover:bg-yellow-100 transition-all group">
        <div className="flex flex-col justify-center items-center w-full">
          <RiFileAddFill className="text-8xl text-slate-300 mb-3" />
          <h1>Upload File</h1>
        </div>
      </div>
    );
  };