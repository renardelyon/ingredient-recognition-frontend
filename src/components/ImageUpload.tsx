import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading?: boolean;
}

export const ImageUpload = ({
  onImageSelect,
  isLoading = false,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const clearPreview = useCallback(() => {
    setPreview(null);
  }, []);

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-80 object-contain rounded-lg border border-gray-200"
          />
          <button
            onClick={clearPreview}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-400"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-emerald-100 rounded-full">
              {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
              ) : dragActive ? (
                <ImageIcon className="w-8 h-8 text-emerald-600" />
              ) : (
                <Upload className="w-8 h-8 text-emerald-600" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isLoading ? "Analyzing image..." : "Drop your image here"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isLoading ? "Please wait" : "or click to browse"}
              </p>
            </div>
            <p className="text-xs text-gray-400">Supports: JPG, PNG, WEBP</p>
          </div>
        </div>
      )}
    </div>
  );
};
