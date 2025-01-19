import { useState } from 'react';
import Navbar from './Navbar'
import { ProjectCard } from './ProjectCard'
import { useAuth } from './AuthProvider';
import { NewProjectCard } from './NewProjectCard';
import { Modal } from './Modal';
import { FileExplorer } from './FileExplorer';

function Dashboard() {
  const { handleCreateFolder, userFolders, handleUploadFile } = useAuth()

  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const [showFolders, setShowFolders] = useState(true)
  const [showFiles, setShowFiles] = useState(false)
  // const [folderFiles2, setFolderFiles2] = useState([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [filesIn] = useState(null)

  function createFolder() {
    handleCreateFolder({name: folderName})
    setFolderName("")
    setIsModalOpen(false)
  }
  async function uploadFile() {
    try {
      console.log(typeof(selectedFile))
      await handleUploadFile({files: selectedFile, folderId:selectedFolderId})
      setIsModalFileOpen(false)      
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files?.[0] || null;
    console.log(file)
    setSelectedFile(file);
    // onFileSelect(file);
  };

  return (
    <div className='h-screen w-full bg-slate-100'>
      <Navbar />
      <div className='bg-slate-100 flex justify-center mt-5'>
        { showFiles && <FileExplorer setIsModalFileOpen={setIsModalFileOpen} folderName={selectedFolder} setShowFolders={setShowFolders} setShowFiles={setShowFiles}/> }
        <div className='grid grid-cols-4 gap-4'>
          { showFolders &&<NewProjectCard setIsModalOpen={setIsModalOpen} />}
          { showFolders && userFolders?.map((folder, _) =>  <ProjectCard setSelectedFolderId={setSelectedFolderId} setSelectedFolder={setSelectedFolder} setShowFiles={setShowFiles} setShowFolders={setShowFolders} folderId={folder.id} key={folder.id} folderName={folder.name}/>)}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold my-5">Create New Folder</h2>
        <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") {createFolder();}}} id="fileName" placeholder="File name" className="w-full my-5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
        <button onClick={createFolder} className='w-full my-5 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Create Folder</button>
      </Modal>
      <Modal isOpen={isModalFileOpen} onClose={() => setIsModalFileOpen(false)}>
        <h2 className="text-xl font-semibold my-5">Upload New File</h2>
        <input type="file" name="" id="" onChange={(e)=> handleFileChange(e)} className='bg-yellow-100 p-2'/>
        <button onClick={uploadFile} className='w-full my-5 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Upload</button>
      </Modal>

    </div>
  )
}

export default Dashboard