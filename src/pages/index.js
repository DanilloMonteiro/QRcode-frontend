import GlobalStyle from "../../styles/global.js";
import { Container, Content } from "./estilos.js";
import { uniqueId } from "lodash";
import Upload from "@/components/upload/index2.js";
import FileList from "../components/fileList/index.js";
import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  async function ComponenetDidMount() {
    const response = await api.get("posts");

    setUploadedFiles(
      response.data.map((file) => ({
        id: file._id,
        name: file.name,
        uploaded: true,
        url: file.url,
        qrcode: file.qrcode,
      }))
    );
  }

  const handleUpload = async function (files) {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
      qrcode: "",
    }));

    setUploadedFiles((prevState) => [...prevState, ...uploadedFiles]);

    uploadedFiles.forEach(processUpload);
  };

  const updateFile = (id, data) => {
    setUploadedFiles((prevState) => {
      return prevState.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      });
    });
  };

  const processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("/posts", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
        });
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  const handleDelete = async (id) => {
    await api.delete(`/posts/${id}`);

    setUploadedFiles((prevState) => {
      const updatedObjects = prevState.filter((obj) => obj.id !== id);
      return updatedObjects;
    });
  };

  useEffect(() => {
    ComponenetDidMount();
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Upload onUpload={handleUpload} />
          <button style={{ marginTop: 10 }} onClick={ComponenetDidMount}>
            Gerar QRcodes
          </button>
          {!!uploadedFiles.length && (
            <FileList
              files={uploadedFiles}
              onDelete={handleDelete}
              ComponenetDidMount={ComponenetDidMount}
            />
          )}
        </Content>
        <GlobalStyle />
      </Container>
    </>
  );
}
