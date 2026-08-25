"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { ProfessionLicenseData } from "@/types/license";

interface ProfessionLicenseSheetProps {
  data: ProfessionLicenseData;
  lang?: "bn" | "en";
}

export function ProfessionLicenseSheet({ data, lang = "bn" }: ProfessionLicenseSheetProps) {
  const { union, meta, business, owner, financials, signatory, fiscalYearBn, fiscalYearEn } = data;
  const [printDateTime, setPrintDateTime] = useState("2/12/26, 10:30 AM");
  const isEn = lang === "en";

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

  const lineBorderClass = "font-semibold text-black border-b-[1.5px] border-dashed border-black pb-0.5";

  return (
    <div
      id="certificateSheet"
      className={`certificate-sheet certificate-sheet-portrait w-[210mm] h-[297mm] min-w-[210mm] min-h-[297mm] bg-white shadow-2xl relative overflow-hidden box-border ${isEn ? "font-serif" : "font-solaiman"} text-[#121212] px-6 py-4 flex flex-col justify-start print:w-[210mm] print:h-[297mm] print:min-w-[210mm] print:min-h-[297mm] print:max-w-[210mm] print:max-h-[297mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid`}
    >
      <style>{`
        @media print {
          @page {
            size: A4 portrait !important;
            margin: 0 !important;
          }
        }
      `}</style>
      {/* Top Header Bar (Outside thick border box) */}
      <div className="flex justify-between items-center text-xs text-black font-sans px-1 pb-1">
        <div className="w-[150px] text-left font-normal text-black">
          {printDateTime}
        </div>
        <div className={`text-black text-sm ${isEn ? "font-serif" : "font-solaiman"}`}>
          {isEn ? "Profession & Occupation License" : "পেশা ও জীবিকা লাইসেন্স"}
        </div>
        <div className="w-[150px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Rose Gradient Border */}
      <div className="flex-1 relative p-3.5 my-3 mx-2 bg-gradient-to-br from-rose-600 via-rose-800 to-rose-600 shadow-md flex flex-col">
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
            <div className="gov-seal-left w-[72px] h-[72px] flex items-center justify-center">
              <Image
                src="/assets/logo/logo.webp"
                alt={isEn ? "Government Seal of Bangladesh" : "বাংলাদেশ সরকার সিল"}
                width={72}
                height={72}
                className="gov-monogram w-full h-full drop-shadow-sm"
                priority
              />
            </div>

            {/* Center Header Titles */}
            <div className="header-titles flex flex-col items-center justify-center">
              <div className="gov-sub-title text-base text-black tracking-wide mb-[1px]">
                {isEn ? "Government of the People's Republic of Bangladesh" : "গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার"}
              </div>
              <h1 className={`${isEn ? "text-3xl" : "text-4xl"} up-main-title font-bold text-header-red leading-snug m-0 tracking-wide`}>
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </h1>
              <div className={`${isEn ? "text-lg" : "text-xl"} up-sub-address font-semibold text-black mt-[1px]`}>
                {isEn ? (
                  <>Upazila: <span>{union.upazila_en || union.upazila}</span>, District: <span>{union.district_en || union.district}</span>.</>
                ) : (
                  <>উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।</>
                )}
              </div>
              <div className="up-web-url font-siliguri text-sm font-semibold text-black mt-[1px]">
                {union.website}
              </div>
              <div className="text-base font-bold text-black mt-[1px]">
                {isEn ? "Fiscal Year: " : "অর্থ বছর: "}
                <span>{isEn ? (fiscalYearEn || fiscalYearBn || "2025-2026") : (fiscalYearBn || "২০২৫-২০২৬")}</span>
              </div>
              <div className="mt-1.5">
                <span className="bg-red-800 text-white text-xl font-semibold px-9 py-1 rounded-[4px] tracking-wider inline-block shadow-md">
                  {isEn ? "Profession & Occupation License" : "পেশা ও জীবিকা লাইসেন্স"}
                </span>
              </div>
            </div>

            {/* Right Owner Photo Frame */}
            <div className="owner-photo-box w-[68px] h-[78px] border border-slate-400 bg-white flex items-center justify-center overflow-hidden shadow-sm">
              <Image
                src={owner.photo_url || "/assets/image/person.webp"}
                alt={isEn ? "Applicant's Photo" : "লাইসেন্সধারী ছবি"}
                width={64}
                height={74}
                className="w-full h-full object-cover text-xs"
                unoptimized
              />
            </div>
          </div>

          {/* Key Value Details List */}
          <div className="mt-4 flex-1 flex flex-col gap-2.5 text-base leading-normal text-black">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="grid grid-cols-[180px_1fr] items-baseline">
                <span className="text-black">{isEn ? "License No." : "লাইসেন্স নং"}</span>
                <span className={lineBorderClass}>: {isEn ? (meta.license_no_en || meta.license_no) : meta.license_no}</span>
              </div>

              <div className="grid grid-cols-[150px_1fr] items-baseline">
                <span className="text-black">{isEn ? "Issue Date" : "লাইসেন্স ইস্যুর তারিখ"}</span>
                <span className={lineBorderClass}>: {isEn ? (meta.issue_date_en || meta.issue_date) : meta.issue_date}</span>
              </div>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Institution Name" : "প্রতিষ্ঠানের নাম"}</span>
              <span className={`text-base font-semibold text-black ${lineBorderClass}`}>: {isEn ? (business.institution_name_en || business.institution_name) : business.institution_name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "License Holder Name" : "লাইসেন্সধারীর নাম"}</span>
              <span className={`text-base ${lineBorderClass}`}>: {isEn ? (owner.name_en || owner.name) : owner.name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Father/Husband's Name" : "পিতা/স্বামী"}</span>
              <span className={lineBorderClass}>: {isEn ? (owner.father_or_husband_name_en || owner.father_or_husband_name) : owner.father_or_husband_name}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Address" : "ঠিকানা"}</span>
              <span className={lineBorderClass}>: {isEn ? (owner.address_en || owner.address) : owner.address}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Business Type" : "ব্যবসার ধরণ"}</span>
              <span className={lineBorderClass}>: {isEn ? (business.business_type_en || business.business_type) : business.business_type}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Business Place" : "ব্যবসার স্থান"}</span>
              <span className={lineBorderClass}>: {isEn ? (business.business_place_en || business.business_place) : business.business_place}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Valid Until" : "বৈধতার মেয়াদ"}</span>
              <span className={lineBorderClass}>: {isEn ? (meta.valid_until_date_en || meta.valid_until_date) : meta.valid_until_date}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Renewal Date" : "নবায়নের তারিখ"}</span>
              <span className={lineBorderClass}>: {isEn ? (meta.renewal_date_en || meta.renewal_date) : meta.renewal_date}</span>
            </div>

            <div className="grid grid-cols-[180px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Fee Amount (incl. 15% VAT)" : "ফি প্রদানের পরিমাণ(১৫% ভ্যাটসহ)"}</span>
              <span className={lineBorderClass}>
                : {isEn ? (financials.fee_amount_en || financials.fee_amount) : financials.fee_amount} ({isEn ? "In Words: " : "কথায়: "}{isEn ? (financials.amount_in_words_en || financials.amount_in_words) : financials.amount_in_words})
              </span>
            </div>

            {/* Acknowledgement Line */}
            <div className="mt-3 text-base leading-relaxed text-black">
              {isEn ? (
                <>
                  This license is hereby issued to <span className="font-semibold border-b-[1.5px] border-dashed border-black">{business.institution_name_en || business.institution_name}</span> upon receipt of the fees to continue their trade/profession/occupation.
                </>
              ) : (
                <>
                  প্রাপ্ত হয়ে <span className="font-semibold border-b-[1.5px] border-dashed border-black">{business.institution_name}</span> কে তার ব্যবসা/বৃত্তি/পেশা চালিয়ে যাবার জন্য অত্র লাইসেন্স প্রদান করা হলো।
                </>
              )}
            </div>
          </div>

          {/* Footer Section with QR Code (Left) and Signatory Chairman (Right) */}
          <div className="cert-footer-section flex justify-between items-end mt-auto pt-3 pb-1 px-1">
            {/* Left Bottom QR Code */}
            <div className="qr-code-box flex flex-col items-center">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 shadow-sm">
                <QRCodeSVG
                  value={signatory.qr_url || "https://www.lgoms.org"}
                  size={78}
                  level="M"
                />
              </div>
              <div className="trn-text font-siliguri text-sm text-black mt-[2px]">
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            {/* Right Signatory (Chairman) */}
            <div className="signatory-box text-center min-w-[180px] pb-[2px]">
              <div className="sign-space h-[28px]" />
              <div className="sign-name text-base font-semibold text-black leading-tight">
                {isEn ? (signatory.name_en || signatory.name) : signatory.name}
              </div>
              <div className="sign-role-sub text-base text-black leading-tight">
                {isEn ? (signatory.role_en || signatory.role) : signatory.role}
              </div>
              <div className="sign-office text-base text-black leading-tight">
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </div>
              <div className="sign-location text-base text-black leading-tight">
                {isEn ? `${union.upazila_en || union.upazila}, ${union.district_en || union.district}.` : `${union.upazila}, ${union.district}।`}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar (Outside thick border box, pushed to absolute bottom) */}
      <div className="mt-auto flex justify-between items-center text-xs text-black font-sans px-1 pt-0.5">
        <a
          href={signatory.qr_url || "https://www.lgoms.org"}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-black font-normal truncate max-w-[80%]"
        >
          {signatory.qr_url || "https://www.lgoms.org"}
        </a>
        <div className="font-normal text-black">
          1/1
        </div>
      </div>
    </div>
  );
}
