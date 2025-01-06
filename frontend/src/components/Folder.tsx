import { FaFolder  } from "react-icons/fa";

interface FolderProps {
    name: string;
}

function Folder({name}:FolderProps) {
  return (
      <div className='bg-slate-100 flex p-3 rounded-lg align-middle items-center cursor-pointer mx-3'>
        <FaFolder className="text-yellow-400 text-2xl" />
        <h1 className="ml-1 font-extralight text-base"> {name}</h1>
    </div>
  )
}

export default Folder