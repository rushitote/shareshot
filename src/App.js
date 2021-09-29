/*global chrome*/
import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./App.css";

function App() {
  const [url, setUrl] = useState("ok");
  const [imgurLink, setImgurLink] = useState(
    "Click on any of the right buttons"
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copyVal, setCopyVal] = useState("Copy");
  const [imgurResponse, setImgurResponse] = useState("");

  chrome.storage.local.get(["shotImage"], function (res) {
    setUrl(res.shotImage);
  });

  let generateImgurLink = (url) => {
    let formData = new FormData();
    formData.append("image", url.substring(22));
    formData.append("type", "base64");
    fetch("https://api.imgur.com/3/upload", {
      method: "POST",
      headers: {},
      body: formData,
      redirect: "follow",
    })
      .then((response) => {
        response.json().then((data) => {
          setImgurResponse(JSON.stringify(data));
          setImgurLink(data.data.link);
          setIsError(false);
          setIsLoading(false);
        });
      })
      .catch((e) => {
        setIsError(true);
        console.log(e);
        setIsLoading(false);
      });
  };

  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      return cropper.getCroppedCanvas().toDataURL();
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>ShareShot</h1>
      </div>
      <div style={{ width: "100%" }}>
        <Cropper
          style={{ height: 550, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={url}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={false}
        />
      </div>
      <div className="row">
        <div style={{ paddingLeft: "20px", paddingTop: "20px" }}>
          <button
            style={{ border: "none", backgroundColor: "white", color: "blue" }}
            onClick={() => {
              navigator.clipboard.writeText(imgurResponse);
            }}
          >
            <u>Copy Imgur API Response</u>
          </button>
        </div>
        <div style={{ paddingLeft: "20px", paddingTop: "20px" }}>
          <b>Screenshot Link: </b>
          <input
            disabled={true}
            value={imgurLink}
            style={{ height: "30px", width: "250px", marginLeft: "10px" }}
          ></input>
          <button
            className="copyBtn"
            onClick={() => {
              navigator.clipboard.writeText(imgurLink);
              setCopyVal("Copied!");
              setTimeout(() => {
                setCopyVal("Copy");
              }, 3000);
            }}
          >
            {copyVal}
          </button>
        </div>
        <div
          className="col"
          style={{
            alignItems: "flex-end",
            paddingRight: "20px",
            paddingTop: "20px",
            gap: "15px",
          }}
        >
          <button
            disabled={isLoading}
            className="getFullBtn"
            onClick={() => {
              setIsLoading(true);
              generateImgurLink(url);
            }}
          >
            <b>Get full page shot</b>
          </button>
          <button
            disabled={isLoading}
            className="getPartBtn"
            onClick={() => {
              setIsLoading(true);
              generateImgurLink(getCropData());
            }}
          >
            <b>Get selected part shot</b>
          </button>
          {isError ? (
            <div style={{ color: "red" }}>
              Sorry, something failed. Please check your internet connection and
              try again.
            </div>
          ) : null}
        </div>
        <div></div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
}

export default App;
