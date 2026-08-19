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

  const lineBorderClass = "font-semibold text-slate-950 border-b-[1.5px] border-dashed border-slate-800 pb-0.5";

  return (
    <div
      id="certificateSheet"
      className="certificate-sheet w-[210mm] h-[297mm] min-w-[210mm] min-h-[297mm] bg-white shadow-2xl relative overflow-hidden box-border font-siliguri text-[#121212] px-6 py-4 flex flex-col justify-start print:w-[210mm] print:h-[297mm] print:min-w-[210mm] print:min-h-[297mm] print:max-w-[210mm] print:max-h-[297mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid"
    >
      {/* Top Header Bar (Outside thick border box) */}
      <div className="flex justify-between items-center text-[11px] text-gray-800 font-sans px-1 pb-1">
        <div className="w-[150px] text-left font-normal text-slate-800">
          {printDateTime}
        </div>
        <div className="font-bold text-slate-900 text-[12px] font-solaiman">
          পেশা ও জীবিকা লাইসেন্স
        </div>
        <div className="w-[150px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Rose Gradient Border (Fixed 200mm height, Top aligned) */}
      <div className="h-[210mm] max-h-[210mm] relative p-3.5 my-3 mx-2 bg-gradient-to-br from-rose-600 via-rose-800 to-rose-600 shadow-md flex flex-col">
        <div className="certificate-inner-frame w-full h-full bg-[#fefef0] pt-4 px-6 pb-3 relative flex flex-col justify-between z-10 flex-1 border border-amber-200">

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
          <div className="cert-header grid grid-cols-[68px_1fr_68px] items-center text-center relative pt-1">
            {/* Top Left Seal */}
            <div className="gov-seal-left w-[64px] h-[64px] flex items-center justify-center">
              <Image
                src="/assets/logo/logo.webp"
                alt="বাংলাদেশ সরকার সিল"
                width={64}
                height={64}
                className="gov-monogram w-full h-full drop-shadow-sm"
                priority
              />
            </div>

            {/* Center Header Titles (Matching TradeLicenseSheet.tsx) */}
            <div className="header-titles flex flex-col items-center justify-center">
              <div className="gov-sub-title text-[12.5px] font-semibold text-gray-800 tracking-wide mb-[1px]">
                গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার
              </div>
              <h1 className="up-main-title text-[24px] font-black text-header-red leading-tight m-0 tracking-wide">
                {union.up_name}
              </h1>
              <div className="up-sub-address text-[12px] font-bold text-slate-900 mt-[1px]">
                উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।
              </div>
              <div className="up-web-url font-siliguri text-[11.5px] font-bold text-slate-900 mt-[1px]">
                {union.website}
              </div>
              <div className="text-[12px] font-bold text-slate-900 mt-[1px]">
                অর্থ বছর: <span>{fiscalYearBn || "২০২৫-২০২৬"}</span>
              </div>
              <div className="mt-1.5">
                <span className="bg-red-800 text-white text-[17px] font-black px-6 py-1 rounded-sm tracking-wider inline-block shadow-md">
                  পেশা ও জীবিকা লাইসেন্স
                </span>
              </div>
            </div>

            {/* Right Owner Photo Frame */}
            <div className="owner-photo-box w-[68px] h-[78px] border border-slate-400 bg-white flex items-center justify-center overflow-hidden shadow-sm">
              <Image
                src={owner.photo_url || "/assets/image/person.webp"}
                alt="লাইসেন্সধারী ছবি"
                width={64}
                height={74}
                className="w-full h-full object-cover text-xs"
                unoptimized
              />
            </div>
          </div>

          {/* Key Value Details List */}
          <div className="mt-4 flex-1 flex flex-col gap-2.5 text-[13px] leading-relaxed">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="grid grid-cols-[180px_1fr] items-baseline">
                <span className="font-bold text-slate-800">লাইসেন্স নং</span>
                <span className={lineBorderClass}>: {meta.license_no}</span>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-baseline">
                <span className="font-bold text-slate-800">লাইসেন্স ইস্যুর তারিখ</span>
                <span className={lineBorderClass}>: {meta.issue_date}</span>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">প্রতিষ্ঠানের নাম</span>
              <span className={`text-[14px] text-red-950 ${lineBorderClass}`}>: {business.institution_name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">লাইসেন্সধারীর নাম</span>
              <span className={`text-[13.5px] ${lineBorderClass}`}>: {owner.name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">পিতা/স্বামী</span>
              <span className={lineBorderClass}>: {owner.father_or_husband_name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">ঠিকানা</span>
              <span className={lineBorderClass}>: {owner.address}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">ব্যবসার ধরণ</span>
              <span className={lineBorderClass}>: {business.business_type}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">ব্যবসার স্থান</span>
              <span className={lineBorderClass}>: {business.business_place}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">বৈধতার মেয়াদ</span>
              <span className={lineBorderClass}>: {meta.valid_until_date}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">নবায়নের তারিখ</span>
              <span className={lineBorderClass}>: {meta.renewal_date}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="font-bold text-slate-800">ফি প্রদানের পরিমাণ(১৫% ভ্যাটসহ)</span>
              <span className={lineBorderClass}>: {financials.fee_amount} (কথায়: {financials.amount_in_words})</span>
            </div>

            {/* Acknowledgement Line */}
            <div className="mt-3 text-[12.5px] leading-relaxed text-slate-900">
              প্রাপ্ত হয়ে <span className="font-bold border-b-[1.5px] border-dashed border-slate-800">{business.institution_name}</span> কে তার ব্যবসা/বৃত্তি/পেশা চালিয়ে যাবার জন্য অত্র লাইসেন্স প্রদান করা হলো।
            </div>
          </div>

          {/* Footer Section with QR Code (Left) and Signatory Chairman (Right) */}
          <div className="cert-footer-section flex justify-between items-end mt-auto pt-3 pb-1 px-1">
            {/* Left Bottom QR Code */}
            <div className="qr-code-box flex flex-col items-center">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 rounded shadow-sm">
                <QRCodeSVG
                  value={signatory.qr_url || "https://www.lgoms.org"}
                  size={76}
                  level="M"
                />
              </div>
              <div className="trn-text font-siliguri text-[11.5px] font-bold text-gray-900 mt-[2px]">
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            {/* Right Signatory (Chairman) */}
            <div className="signatory-box text-center min-w-[180px] pb-[2px]">
              <div className="sign-space h-[28px]" />
              <div className="sign-name text-[14px] font-bold text-slate-950 leading-tight">
                {signatory.name}
              </div>
              <div className="sign-role-sub text-[12px] font-semibold text-slate-700 leading-tight">
                {signatory.role}
              </div>
              <div className="sign-office text-[12px] font-semibold text-slate-700 leading-tight">
                {union.up_name}
              </div>
              <div className="sign-location text-[12px] font-semibold text-slate-700 leading-tight">
                {union.upazila}, {union.district}।
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar (Outside thick border box, pushed to absolute bottom) */}
      <div className="mt-auto flex justify-between items-center text-[11px] text-gray-800 font-sans px-1 pt-0.5">
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
