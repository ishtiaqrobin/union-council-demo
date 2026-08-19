"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { ProfessionLicenseData } from "@/types/license";

interface ProfessionLicenseSheetProps {
  data: ProfessionLicenseData;
}

export function ProfessionLicenseSheet({ data }: ProfessionLicenseSheetProps) {
  const { union, meta, business, owner, financials, signatory, fiscalYearBn } = data;
  const [printDateTime, setPrintDateTime] = useState("2/12/26, 10:30 AM");

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = String(now.getFullYear()).slice(-2);
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "AM" : "AM";
    hours = hours % 12 || 12;

    setPrintDateTime(`${month}/${day}/${year}, ${hours}:${minutes} ${ampm}`);
  }, []);

  const lineBorderClass = "font-bold text-slate-950 border-b-[1.5px] border-dashed border-slate-800 pb-0.5";

  return (
    <div
      id="certificateSheet"
      className="certificate-sheet w-[297mm] h-[210mm] min-w-[297mm] min-h-[210mm] bg-white shadow-2xl relative overflow-hidden box-border font-siliguri text-[#121212] px-8 py-4 flex flex-col justify-between print:w-[297mm] print:h-[210mm] print:min-w-[297mm] print:min-h-[210mm] print:max-w-[297mm] print:max-h-[297mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid"
    >
      {/* Top Header Bar (Outside thick border box) */}
      <div className="flex justify-between items-center text-[12px] text-gray-800 font-sans px-1 pb-1">
        <div className="w-[180px] text-left font-normal text-slate-800">
          {printDateTime}
        </div>
        <div className="font-bold text-slate-900 text-[13px] font-solaiman">
          পেশা ও জীবিকা লাইসেন্স
        </div>
        <div className="w-[180px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Dark Red Gradient Border */}
      <div className="flex-1 relative p-4 my-4 mx-6 bg-gradient-to-br from-red-950 via-rose-950 to-red-950 shadow-md flex flex-col">
        <div className="certificate-inner-frame w-full h-full bg-[#fefef0] pt-5 px-10 pb-4 relative flex flex-col justify-between z-10 flex-1 border border-amber-200">

          {/* Background Watermark */}
          <div className="watermark-container absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none -z-10 flex justify-center items-center">
            <Image
              src="/assets/watermark/watermark.webp"
              alt="Watermark"
              width={380}
              height={380}
              className="watermark-image max-w-full max-h-full object-contain opacity-[0.14] pointer-events-none"
              priority
            />
          </div>

          {/* Header Section */}
          <div className="cert-header grid grid-cols-[80px_1fr_80px] items-center text-center relative pt-1">
            {/* Top Left Seal */}
            <div className="gov-seal-left w-[72px] h-[72px] flex items-center justify-center">
              <Image
                src="/assets/logo/logo.webp"
                alt="বাংলাদেশ সরকার সিল"
                width={72}
                height={72}
                className="gov-monogram w-full h-full drop-shadow-sm"
                priority
              />
            </div>

            {/* Center Header Titles */}
            <div className="header-titles flex flex-col items-center justify-center">
              <h1 className="up-main-title text-[32px] font-black text-header-red leading-tight m-0 tracking-wide">
                গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার
              </h1>
              <div className="text-[16px] font-bold text-slate-900 mt-[1px]">
                {union.up_name}
              </div>
              <div className="up-sub-address text-[13.5px] font-bold text-slate-900 mt-[1px]">
                উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।
              </div>
              <div className="text-[13px] font-bold text-slate-900 mt-[1px]">
                অর্থ বছর: <span>{fiscalYearBn || "২০২৫-২০২৬"}</span>
              </div>
            </div>

            {/* Right Owner Photo Frame */}
            <div className="owner-photo-box w-[76px] h-[86px] border border-slate-400 bg-white p-0.5 shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src={owner.photo_url || "/assets/image/person.webp"}
                alt="লাইসেন্সধারী ছবি"
                width={72}
                height={82}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Metadata Ribbon */}
          <div className="cert-meta-ribbon flex justify-between items-center mt-3 px-1">
            <div className="meta-badge-container flex justify-center flex-1">
              <div className="cert-badge bg-red-900 text-white text-[17px] font-black px-[36px] py-[3px] rounded-md tracking-wider inline-block shadow-md">
                পেশা ও জীবিকা লাইসেন্স
              </div>
            </div>
          </div>

          {/* Key Value Details List */}
          <div className="mt-4 flex-1 flex flex-col gap-3 text-[14.5px] leading-relaxed">
            <div className="meta-item meta-serial text-[15px] text-[#121212] ">
              <span className="lbl font-bold mr-1.5">লাইসেন্স নং:</span>
              <span className="val font-bold font-siliguri tracking-wide">{meta.license_no}</span>

              <div className="meta-item meta-date text-[15px] text-[#121212]">
                <span className="lbl font-bold mr-1.5">তারিখ:</span>
                <span className="val font-bold font-siliguri tracking-wide">{meta.issue_date}</span>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-900">প্রতিষ্ঠানের নাম</span>
              <span className={`text-[16px] text-red-950 ${lineBorderClass}`}>: {business.institution_name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-900">লাইসেন্সধারীর নাম</span>
              <span className={`text-[15.5px] ${lineBorderClass}`}>: {owner.name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-900">পিতা/স্বামী</span>
              <span className={lineBorderClass}>: {owner.father_or_husband_name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-900">ঠিকানা</span>
              <span className={lineBorderClass}>: {owner.address}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-900">ব্যবসার ধরণ</span>
              <span className={lineBorderClass}>: {business.business_type}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-900">ব্যবসার স্থান</span>
              <span className={lineBorderClass}>: {business.business_place}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-900">বৈধতার মেয়াদ</span>
              <div className="flex items-center gap-6">
                <span className={lineBorderClass}>: {meta.valid_until_date}</span>
                <span className="font-bold text-slate-900 ml-8">নবায়নের তারিখ</span>
                <span className={lineBorderClass}>: {meta.renewal_date}</span>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-900">ফি প্রদানের পরিমাণ(১৫% ভ্যাটসহ)</span>
              <span className={lineBorderClass}>: {financials.fee_amount} ( কথায়:{financials.amount_in_words} )</span>
            </div>
          </div>

          {/* Acknowledgement Line */}
          <div className="mt-3 text-[14px] leading-relaxed text-slate-900">
            প্রাপ্ত হয়ে <span className="font-bold underline decoration-dotted">{business.institution_name}</span> কে তার ব্যবসা/বৃত্তি/পেশা চালিয়ে যাবার জন্য অত্র লাইসেন্স প্রদান করা হলো।
          </div>

          {/* Footer Section with QR Code (Left) and Signatory Chairman (Right) */}
          <div className="cert-footer-section flex justify-between items-end mt-auto pt-4 pb-1 px-1">
            {/* Left Bottom QR Code */}
            <div className="qr-code-box flex flex-col items-center">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 rounded shadow-sm">
                <QRCodeSVG
                  value={signatory.qr_url || "https://www.lgoms.org"}
                  size={80}
                  level="M"
                />
              </div>
              <div className="trn-text font-siliguri text-[12px] font-bold text-gray-900 mt-[3px]">
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            {/* Right Signatory (Chairman) */}
            <div className="signatory-box text-center min-w-[210px] pb-[2px]">
              <div className="sign-space h-[32px]" />
              <div className="sign-name text-[15px] font-bold text-black leading-tight">
                {signatory.name}
              </div>
              <div className="sign-role-sub text-[13px] font-semibold text-slate-800 leading-tight">
                {signatory.role}
              </div>
              <div className="sign-office text-[13px] font-semibold text-slate-800 leading-tight">
                {union.up_name}
              </div>
              <div className="sign-location text-[13px] font-semibold text-slate-800 leading-tight">
                {union.upazila}, {union.district}।
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar (Outside thick border box) */}
      <div className="flex justify-between items-center text-[11px] text-gray-800 font-sans px-1 pt-1">
        <a
          href={signatory.qr_url || "https://www.lgoms.org"}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-slate-800 font-normal truncate max-w-[80%]"
        >
          {signatory.qr_url || "https://www.lgoms.org"}
        </a>
        <div className="font-normal text-slate-800">
          1/1
        </div>
      </div>
    </div>
  );
}
