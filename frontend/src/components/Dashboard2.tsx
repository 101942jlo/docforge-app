import { useState } from 'react';
import Navbar from './Navbar';
import { ProjectCard } from './ProjectCard';
import { useAuth } from './AuthProvider';
import { NewProjectCard } from './NewProjectCard';
import { Modal } from './Modal';

function Dashboard() {
  const { handleCreateFolder, userFolders, handleUploadFile } = useAuth();
  const [folderName, setFolderName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null); // Track clicked folder
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function createFolder() {
    handleCreateFolder({ name: folderName });
    setFolderName('');
    setIsModalOpen(false);
  }

  function uploadFile() {
    if (selectedFile && selectedFolder) {
      handleUploadFile(selectedFolder.id, selectedFile);
    }
  }

  return (
    <div className='h-screen w-full bg-slate-100'>
      <Navbar />

      {/* Breadcrumb Navigation */}
      {selectedFolder ? (
        <div className="flex items-center p-4 bg-white shadow-md">
          <button onClick={() => setSelectedFolder(null)} className="mr-4 text-xl">🔙</button>
          <span className="text-gray-600">Dashboard / {selectedFolder.name}</span>
        </div>
      ) : null}

      <div className='bg-slate-100 flex justify-center mt-5'>
        <div className='grid grid-cols-4 gap-4'>

          {/* If folder is selected, show files; otherwise, show folders */}
          {!selectedFolder ? (
            <>
              <NewProjectCard setIsModalOpen={setIsModalOpen} />
              {userFolders?.map(folder => (
                <ProjectCard
                  key={folder.id}
                  folderId={folder.id}
                  folderName={folder.name}
                  onClick={() => setSelectedFolder(folder)}
                />
              ))}
            </>
          ) : (
            <>
              <NewProjectCard setIsModalOpen={setIsModalOpen} isFileUpload />
              {selectedFolder.files?.map(file => (
                <ProjectCard
                  key={file.id}
                  folderId={file.id}
                  folderName={file.name}
                  fileType={file.type}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modal for Creating Folders */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold my-5">
          {selectedFolder ? "Upload File" : "Create New Folder"}
        </h2>
        
        {selectedFolder ? (
          <>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full my-5"
            />
            <button onClick={uploadFile} className="w-full my-5 rounded-md bg-slate-800 py-2 px-4 text-white">
              Upload File
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full my-5 border px-3 py-2"
            />
            <button onClick={createFolder} className="w-full my-5 rounded-md bg-slate-800 py-2 px-4 text-white">
              Create Folder
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Dashboard;
