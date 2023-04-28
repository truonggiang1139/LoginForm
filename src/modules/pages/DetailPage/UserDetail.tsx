import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { API_PATHS } from "../../../configs/api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../../utils/constants";
import { UserType } from "../../../types";
import "./DetailPage.css";
import "react-image-crop/dist/ReactCrop.css";
import { generateAvatarUpload } from "../../../utils/upload";
import ReactCrop from "react-image-crop";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "4px",
};
export default function UserDetail() {
  const [user, setUser] = useState<UserType>();
  const [image, setImage] = useState(user?.avatar);
  const [openModal, setOpenModal] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [count, setCount] = useState(0);
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const nav = useNavigate();
  const getUserProfile = async () => {
    try {
      const res = await axios.get(API_PATHS.userProfile, {
        headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) },
      });
      setUser(res.data.data);
      setImage(`http://api.training.div3.pgtest.co/${res.data.data.avatar}`);
    } catch (error) {}
  };
  useEffect(() => {
    getUserProfile();
  }, [count]);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);
  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click();
  };
  const onChooseAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };
  const onLoad = useCallback((img: any) => {
    imgRef.current = img.target;
  }, []);
  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(
      previewCanvasRef.current,
      completedCrop
    );
    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || "",
        },
      };
      const json = await axios.put(API_PATHS.userProfile, formData, config);

      if (json.data && json.data.code === 200) {
        setCount(count + 1);
      }
    }
  };

  const onLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    nav("/login");
  };

  return (
    <div className="flex flex-col items-center w-32 mx-auto">
      <div>
        <div className="profilepic">
          <img src={image} alt="" className="card-img-top profilepic__image" />
          <div className="profilepic__content" onClick={changeAvatar}>
            <input
              ref={avatarInputRef}
              hidden
              type="file"
              accept="image/*"
              onChange={onChooseAvatar}
            />
            <span className="profilepic__text">Upload Avatar</span>
          </div>
        </div>
        <div className="mt-8 text-left w-full">
          <h3 className="font-bold">Email</h3>
          <p>{user?.email}</p>
        </div>
        <div className="mt-8 text-left w-full">
          <h3 className="font-bold">Name</h3>
          <p>{user?.name}</p>
        </div>
        <div className="mt-8 text-left w-full">
          <h3 className="font-bold">State</h3>
          <p>{user?.state}</p>
        </div>
        <div className="mt-8 text-left w-full">
          <h3 className="font-bold">Region</h3>
          <p>{user?.region}</p>
        </div>
        <div className="mt-8 w-full">
          <button
            onClick={onLogout}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Log out
          </button>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle>Upload</DialogTitle>
          <DialogContent>
            <ReactCrop
              crop={crop}
              onChange={(newCrop: any) => {
                setCrop(newCrop);
              }}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={image}
                style={{ transform: `scale(${1}) rotate(${0}deg)` }}
                onLoad={onLoad}
              />
            </ReactCrop>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </DialogContent>
          <DialogActions>
            <button
              className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              onClick={() => {
                setOpenModal(false);
                uploadAvatar();
              }}
            >
              Subscribe
            </button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
