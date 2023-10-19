import React from "react";
import style from "./index.module.css";
import { AiOutlineRise } from "react-icons/ai";
import { BsStar, BsPerson } from "react-icons/bs";
import Button from "@/app/components/Button";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <div className={style.title_text}>
        <p className={style.stage}>- Learn More</p>
        <p className={style.title}>All About Us</p>
      </div>
      <div className={style.images_banner}>
        <Image
          className="w-full h-full rounded-[64px] object-cover"
          width={300}
          height={250}
          alt="aa"
          src={`${process.env.HTTPS_URL}/upload/${"img"}`}
        />
      </div>
      <div className={style.content_body_1}>
        <div className={style.content_body_left}>
          <p className={style.stage}>- How it has Started</p>
          <p className={`${style.title} mb-24`}>How and When it has All Started</p>
          <Image
            className=" object-cover rounded-[56px] w-full h-[560px]"
            width={300}
            height={250}
            src={`${process.env.HTTPS_URL}/upload/${"img"}`}
            alt="aa"
          />
        </div>
        <div className={style.content_body_right}>
          <li className={`${style.text_right_top_1} ${style.text_right}`}>Natural Ingredients Only</li>
          <p className={style.company_text}>
            10 years ago, when one of the co-founders came up with the idea of making skincare and beauty
            products using only natural ingreadients, he did not even think twice.
          </p>
          <li className={`${style.text_right_bottom_2} ${style.text_right}`}>Affordable Pricing Strategy</li>
          <p className={style.company_text}>
            One of our main goals from the start was to offer high quality products that would also have
            affordable prices. We just can’t believe that we have finally achieved this and now we are proud
            of it.
          </p>
        </div>
      </div>
      <div className="text-center mt-[150px]">
        <p className={style.stage}>- Company Values</p>
        <p className={style.title}>Our Core Values</p>
      </div>
      <div className="flex justify-around mb-[72px]">
        <div className="flex flex-col items-center w-[304px] text-center">
          <div className="w-16 h-16 rounded-full bg-Neutral-50 flex justify-center items-center mb-8">
            <AiOutlineRise size={34} />
          </div>
          <p className="text-2xl font-semibold mb-4">Great Innovation</p>
          <p className="text-xl leading-7">
            We are always focusing on making all our products as innovative as possible.
          </p>
        </div>
        <div className="flex flex-col items-center w-[304px] text-center">
          <div className="w-16 h-16 rounded-full bg-Neutral-50 flex justify-center items-center mb-8">
            <BsStar size={34} />
          </div>
          <p className="text-2xl font-semibold mb-4">High Quality</p>
          <p className="text-xl leading-7">
            One of our main values is the quality of the products that we sell to the customers.
          </p>
        </div>
        <div className="flex flex-col items-center w-[304px] text-center">
          <div className="w-16 h-16 rounded-full bg-Neutral-50 flex justify-center items-center mb-8">
            <BsPerson size={34} />
          </div>
          <p className="text-2xl font-semibold mb-4">Teamwork Matters</p>
          <p className="text-xl leading-7">
            We believe that being a successful company is all about being a team.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className=" bg-main-100 text-button text-[15px]">View Jobs</Button>
      </div>
    </div>
  );
};

export default page;
