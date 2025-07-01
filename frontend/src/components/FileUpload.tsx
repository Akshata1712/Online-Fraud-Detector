
import { useState, useRef } from 'react';
import { Plus, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload = ({
  onFileUpload
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.csv')) {
        setUploadedFile(file);
        onFileUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      onFileUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-700">
      <h2 className="mb-4 font-extrabold text-2xl text-white">Upload Transaction Data</h2>
      
      <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${isDragOver ? 'border-cyan-400 bg-cyan-900/20' : uploadedFile ? 'border-emerald-400 bg-emerald-900/20' : 'border-slate-500 hover:border-blue-400 hover:bg-blue-900/20'}`} 
           onDragOver={handleDragOver} 
           onDragLeave={handleDragLeave} 
           onDrop={handleDrop} 
           onClick={handleClick}>
        <input 
          ref={fileInputRef} 
          type="file" 
          accept=".csv" 
          onChange={handleFileSelect} 
          className="hidden" 
        />
        
        {uploadedFile ? (
          <div className="flex flex-col items-center space-y-3">
            <FileText className="h-12 w-12 text-emerald-400" />
            <div>
              <p className="text-lg font-medium text-emerald-300">{uploadedFile.name}</p>
              <p className="text-sm text-emerald-400">File uploaded successfully</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <Plus className="h-12 w-12 text-slate-400" />
            <div>
              <p className="text-lg font-medium text-slate-200">Drop your CSV file here</p>
              <p className="text-sm text-slate-400">or click to browse</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
