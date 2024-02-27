import React, { useState } from "react";
import AlertMessage from "./AlertMessage";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";

function UploadForm({ uploadButtonClick, progress }) {
  const [file, setFile] = useState();
  const [errorMessage, showErrorMessage] = useState("");
  // const [progressval, setProgressVal] = useState(1);

 

  const onFileSelect = (file) => {
    console.log("File Uploade is : ", file);
    showErrorMessage("");
    if (file && file.size > 2000000) {
      console.log("Size is greater the 2 MB");
      showErrorMessage("Maximum Size is 2 MB");
      return;
    }
    setFile(file);
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-bray-800 dark:bg-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:hover:border-blue-500 dark:hover:bg-blue-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 mb-4 text-blue-500 dark:text-blue-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-blue-500 dark:text-blue-400">
              <span className="font-semibold">Click to upload</span> or{" "}
              <strong>Drag</strong> and
              <strong>Drop</strong>
            </p>
            <p className="text-xs text-blue-500 dark:text-blue-400">
              SVG, PNG, JPG or GIF (MAX SIZE : 2 MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(event) => onFileSelect(event.target.files[0])}
          />
        </label>
      </div>
      {errorMessage && errorMessage.length > 0 && (
        <AlertMessage msg={errorMessage} />
      )}

      {file ? (
        <FilePreview file={file} removeFile={() => setFile(null)} />
      ) : null}

      {progress > 0 ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file}
          className="p-2 text-lg  bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-500"
          onClick={() => uploadButtonClick(file)}
        >
          Upload
        </button>
      )}
    </div>
  );
}

export default UploadForm;
