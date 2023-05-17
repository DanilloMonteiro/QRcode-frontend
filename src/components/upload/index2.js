import React from "react";
import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";

export default function Upload(props) {
  const { onUpload } = props;
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: { "image/png": [] },
      onDropAccepted: onUpload,
    });

  const renderDragMessage = () => {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui ...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  };

  return (
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {renderDragMessage()}
    </DropContainer>
  );
}
