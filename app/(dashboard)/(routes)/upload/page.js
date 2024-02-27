"use client";
import React from "react";
import UploadForm from "./_components/UploadForm";
import { app } from "@/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function Page() {
  const storage = getStorage(app);
  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type,
    };
    console.log("File inside uploadFile Handler inside page.js : ", file);
    const imageRef = ref(storage, 'file-upload/'+file.name);
    const uploadTask = uploadBytesResumable(imageRef, file, file.type);

    uploadTask.on("state_changed", (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      progress === 100 &&
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
    });
  };

  return (
    <div className="p-5 px-8 md:px-28">
      <h2 className="text-[#20px] text-center m-5">
        Start<strong className="text-primary"> Uploading</strong> File and{" "}
        <strong className="text-primary"> Share </strong>
        it...
      </h2>

      <UploadForm uploadButtonClick={(file) => uploadFile(file)} />
    </div>
  );
}

export default Page;
