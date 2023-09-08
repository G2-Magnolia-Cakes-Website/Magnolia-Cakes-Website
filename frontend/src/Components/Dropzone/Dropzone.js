import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { CloudArrowUp } from "utils/icons";

import "./Dropzone.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 2,
  borderColor: "#908D8D",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "36px",
  margin: "auto 0 8px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div
      {...getRootProps({
        // @ts-ignore
        style,
      })}
    >
      <input {...getInputProps()} />
      <img className="cloud-arrow-up" src={CloudArrowUp} alt={"upload-file"} />
      {isDragActive ? (
        <p className="dropzone-text">Drop the files here ...</p>
      ) : (
        <p className="dropzone-text">
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default Dropzone;
