import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [fileId, setFileId] = useState();
  const [nomeCarro, setNomeCarro] = useState("");
  const [marcaCarro, setMarcaCarro] = useState("");
  const [anoCarro, setAnoCarro] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {}, []);

  const handleCarRegister = async () => {
    const request = await fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeCarro,
        marca: marcaCarro,
        ano: anoCarro,
        imageId: fileId,
      }),
    });
    const response = await request.json();
    const source = await handleCarImage();
    const images = [...imageList, source];
    setImageList(images);
    console.log(response);
  };

  const handleCarImageUpload = async () => {
    const formData = new FormData();
    formData.append("foto", fileInputRef.current!.files?.[0] as File);

    const request = await fetch("http://localhost:3000/files", {
      method: "POST",
      body: formData,
    });
    const response = await request.json();
    setFileId(response.id);
    console.log(response);
  };

  const handleCarImage = async () => {
    const request = await fetch(`http://localhost:3000/files/${fileId}`);
    const response = await request.json();
    return response;
  };

  return (
    <main>
      <form className="car-form">
        <div className="car-input-container">
          <label htmlFor="car-nome">Nome</label>
          <input
            type="text"
            id="CarNome"
            required
            onChange={({ target }) => setNomeCarro(target.value)}
          />
        </div>
        <div className="car-input-container">
          <label htmlFor="car-marca">Marca</label>
          <input
            type="text"
            id="CarMarca"
            required
            onChange={({ target }) => setMarcaCarro(target.value)}
          />
        </div>
        <div className="car-input-container">
          <label htmlFor="car-ano">Ano</label>
          <input
            type="number"
            id="carAno"
            required
            onChange={({ target }) => setAnoCarro(target.value)}
          />
        </div>
        <label htmlFor="carFoto">Imagem do carro</label>
        <input
          type="file"
          id="carFoto"
          accept="image/*"
          required
          ref={fileInputRef}
          onChange={handleCarImageUpload}
        />
        <button type="button" onClick={handleCarRegister}>
          Cadastrar
        </button>
      </form>
      <section>
        <div className="image-container">
          {imageList.length > 0 &&
            imageList.map((image) => {
              return <img src={image} alt="Carro" width={300} height={200} />;
            })}
        </div>
      </section>
    </main>
  );
};

export default App;
