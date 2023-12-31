"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api_get_ChucVuList, api_post_NvUpdate, api_get_NvEdit } from "@/app/lib/api";

export default function EditStaff() {
  const [name, set_name] = useState("");
  const [account, set_account] = useState("");
  const [password, set_password] = useState("");
  const [phone, set_phone] = useState("");
  const [salary, set_salary] = useState("");
  const [id_position, set_id_position] = useState();
  const [avatar, set_avatar] = useState();
  const [pre_avatar, set_pre_avatar] = useState();
  const [img_CCCD, set_img_CCCD] = useState([]);
  const [pre_img_CCCD, set_pre_img_CCCD] = useState([]);
  const [validate, set_validate] = useState(false);
  const [pre_position, set_pre_position] = useState("");
  const [list_position, set_list_position] = useState([]);
  const router = useRouter();
  const PARAMS = useParams().id;

  const dataPost = {
    id: PARAMS,
    name: name,
    password: password,
    phone: phone,
    salary: salary,
    id_position: id_position,
    avatar: avatar,
    img_CCCD: img_CCCD,
    pre_img_CCCD: pre_img_CCCD,
  };

  const type_img = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif",
    "image/tif",
    "image/bmp",
    "image/ico",
    "image/psd",
    "image/WebP",
    "image/jpg",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api_get_NvEdit}${PARAMS}`);
        if (response.data.status == true) {
          const staff = response.data.data;
          set_name(staff?.ten_nhan_vien);
          set_account(staff?.tai_khoan);
          set_password(staff?.mat_khau);
          set_phone(staff?.so_dien_thoai);
          set_salary(staff?.luong_co_ban);
          set_id_position(staff?.id_chuc_vu);
          set_pre_avatar(staff?.anh_nhan_vien);
          const array = JSON.parse(staff?.anh_cccd);
          set_pre_img_CCCD(array);
          set_pre_position(staff?.chuc_vu?.ten_chuc_vu);
        } else {
        }
      } catch (error) {}
    };
    fetchData();
  }, [PARAMS]);
  console.log(pre_img_CCCD);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_get_ChucVuList);
        const originalData = response.data.data;

        const transformedData = originalData.map((item) => ({
          id: item.id,
          name: item.ten_chuc_vu,
        }));

        set_list_position(transformedData);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const chooseImage = (e) => {
    const files = Array.from(e.target.files);
    const areAllImages = files.every((file) => {
      return type_img.includes(file.type);
    });
    if (areAllImages) {
      set_img_CCCD([...img_CCCD, ...files]);
    } else {
      toast.error("Error: Some files are not in the allowed format.");
    }
  };

  const chooseAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (type_img.includes(file.type)) {
        set_avatar(file);
        set_pre_avatar("");
      } else {
        toast.error("Lỗi: Tệp không thuộc định dạng được cho phép.");
      }
    }
  };

  const link_img = (file) => {
    if (file) {
      const path = URL.createObjectURL(file);
      return path;
    }
  };

  const handleSelectPosition = (id, name) => {
    set_id_position(id);
  };

  const handleRemoveImg = (index) => {
    const new_img_CCCD = [...img_CCCD];
    new_img_CCCD.splice(index, 1);
    set_img_CCCD(new_img_CCCD);
  };

  const handleRemoveImgPre = (index) => {
    const new_img_CCCD = [...pre_img_CCCD];
    new_img_CCCD.splice(index, 1);
    set_pre_img_CCCD(new_img_CCCD);
  };

  const handleClickClose = () => {
    router.push("/admin/staff/list");
  };

  const handleClickEdit = async () => {
    try {
      if (name == "" || password == "" || phone == "" || salary == "") {
        set_validate(true);
        return;
      }
      set_validate(false);
      const response = await axios.post(api_post_NvUpdate, dataPost, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status == true) {
        toast.success("Update successfully");
        router.push("/admin/staff/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu: ", error);
    }
  };

  return (
    <div className="px-6">
      <div className={style.body_create_staff}>
        <div>
          <div>
            <label
              htmlFor="name"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Tên Nhân Viên
            </label>
            <input
              id="name"
              type="text"
              className={style.input_create}
              value={name}
              onChange={(e) => set_name(e.target.value)}
            />
            {validate && name == "" && <p style={{ color: "red" }}>* Please Input Name Staff</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-4">
          <div>
            <label
              htmlFor="account"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Tài Khoản
            </label>
            <input
              id="account"
              type="text"
              className={style.input_create}
              value={account}
              onChange={(e) => set_account(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Mật Khẩu
            </label>
            <input
              id="password"
              type="password"
              className={style.input_create}
              value={password}
              onChange={(e) => set_password(e.target.value)}
            />
            {validate && password == "" && <p style={{ color: "red" }}>* Please Input Password</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 md:gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Số Điện Thoại
            </label>
            <input
              id="phone"
              type="number"
              className={style.input_create}
              value={phone}
              onChange={(e) => set_phone(e.target.value)}
            />
            {validate && phone == "" && <p style={{ color: "red" }}>* Please Input Number Phone</p>}
          </div>
          <div>
            <label
              htmlFor="salary"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Lương Cơ Bản
            </label>
            <input
              id="salary"
              type="number"
              className={style.input_create}
              value={salary}
              onChange={(e) => set_salary(e.target.value)}
            />
            {validate && salary == "" && <p style={{ color: "red" }}>* Please Input Salary</p>}
          </div>
          <div>
            <label
              htmlFor="id_position"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <SelectDropdownAdmin
              id="id_position"
              items={list_position}
              title_select={pre_position || "Chức Vụ"}
              handleSelect={handleSelectPosition}
            ></SelectDropdownAdmin>
          </div>
        </div>

        <div>
          <div>
            <label
              htmlFor="avatar"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Ảnh Nhân Viên
            </label>
            <input
              id="avatar"
              type="file"
              className={style.input_create}
              onChange={chooseAvatar}
              multiple={false}
            />
            <div className={style.list_img}>
              <div className={style.img_body_list}>
                {avatar && (
                  <>
                    <p className={style.img_name}>{avatar.name}</p>
                    <Image
                      className={style.image_staff}
                      width={300}
                      height={250}
                      src={link_img(avatar)}
                      alt="aa"
                    />
                  </>
                )}
                {pre_avatar && (
                  <>
                    <p className={style.img_name}>{pre_avatar}</p>
                    <Image
                      className={style.image_staff}
                      width={300}
                      height={250}
                      src={`${process.env.HTTPS_URL}/upload/${pre_avatar}`}
                      alt="aa"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <label
              htmlFor="img_CCCD"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Ảnh CCCD
            </label>
            <input
              id="img_CCCD"
              type="file"
              className={style.input_create}
              onChange={chooseImage}
            />
            <div className={style.list_img}>
              {img_CCCD?.map((item, index) => (
                <div
                  className={style.img_body_list}
                  key={index}
                >
                  <p className={style.img_name}>{item.name}</p>
                  <Image
                    className={style.image_staff}
                    width={300}
                    height={250}
                    src={link_img(item)}
                    alt="aa"
                  />
                  <AiOutlineCloseCircle
                    className={`${"absolute right-0 top-6 w-7 h-7 hover:text-red-600  cursor-pointer text-red-400"} ${
                      style.icon_remove_img
                    }`}
                    onClick={() => handleRemoveImg(index)}
                  ></AiOutlineCloseCircle>
                </div>
              ))}
              {pre_img_CCCD?.map((item, index) => (
                <div
                  className={style.img_body_list}
                  key={index}
                >
                  <p className={style.img_name}>{item}</p>
                  <Image
                    className={style.image_staff}
                    width={300}
                    height={250}
                    src={`${process.env.HTTPS_URL}/upload/${item}`}
                    alt="aa"
                  />
                  <AiOutlineCloseCircle
                    className={`${"absolute right-0 top-6 w-7 h-7 hover:text-red-600  cursor-pointer text-red-400"} ${
                      style.icon_remove_img
                    }`}
                    onClick={() => handleRemoveImgPre(index)}
                  ></AiOutlineCloseCircle>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer_btn}>
        <div
          className={style.btn_close}
          onClick={handleClickClose}
        >
          Close
        </div>
        <div
          className={style.btn_save}
          onClick={handleClickEdit}
        >
          Update
        </div>
      </div>
    </div>
  );
}
