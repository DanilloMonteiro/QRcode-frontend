import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { Container, FileInfo } from "./styles";

export default function FileList({ files, onDelete, ComponenetDidMount }) {
  return (
    <Container>
      {files.map((uploadedFiles) => (
        <li key={uploadedFiles.id}>
          <FileInfo>
            <div>
              <strong>{uploadedFiles.name}</strong>
              <span>
                {!!uploadedFiles.uploaded && (
                  <button
                    onClick={() => {
                      onDelete(uploadedFiles.id);
                    }}
                  >
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>
          <div>
            {!uploadedFiles.uploaded && !uploadedFiles.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#7159c1" },
                }}
                strokeWidth={10}
                value={uploadedFiles.progress}
              />
            )}
            {uploadedFiles.uploaded && (
              <a href={uploadedFiles.qrcode} download>
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}
            {uploadedFiles.uploaded && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {uploadedFiles.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
}
