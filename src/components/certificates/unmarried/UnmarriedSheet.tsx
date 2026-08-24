"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { CertificateData } from "@/types/certificate";

interface UnmarriedSheetProps {
  data: CertificateData;
}

export function UnmarriedSheet({ data }: UnmarriedSheetProps) {
  const { union, meta, applicant, signatory } = data;
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

  return (
    <div
      id="certificateSheet"
      className="certificate-sheet certificate-sheet-landscape w-[297mm] h-[210mm] min-w-[297mm] min-h-[210mm] bg-white shadow-2xl relative overflow-hidden box-border font-solaiman text-[#121212] px-8 py-4 flex flex-col justify-between print:w-[297mm] print:h-[210mm] print:min-w-[297mm] print:min-h-[210mm] print:max-w-[297mm] print:max-h-[210mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid"
    >
      <style>{`
        @media print {
          @page {
            size: A4 landscape !important;
            margin: 0 !important;
          }
        }
      `}</style>
      {/* Top Header Bar (Outside thick border box) */}
      <div className="flex justify-between items-center text-xs text-gray-800 font-sans px-1 pb-1">
        <div className="w-[180px] text-left font-normal text-slate-800">
          {printDateTime}
        </div>
        <div className="text-slate-900 text-sm font-solaiman">
          {meta.cert_title || "অবিবাহিত সনদ"}
        </div>
        <div className="w-[180px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Gradient Border */}
      <div className="flex-1 relative p-4 my-8 mx-12 bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-400 shadow-md">
        <div className="certificate-inner-frame w-full h-full bg-white pt-5 px-12 pb-4 relative flex flex-col justify-between z-10">

          {/* Background Watermark */}
          <div className="watermark-container absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] pointer-events-none -z-10 flex justify-center items-center">
            <Image
              src="/assets/watermark/watermark.webp"
              alt="Watermark"
              width={360}
              height={360}
              className="watermark-image max-w-full max-h-full object-contain opacity-[0.16] pointer-events-none"
              priority
            />
          </div>

          {/* Header Section */}
          <div className="cert-header grid grid-cols-[76px_1fr_76px] items-center text-center relative">
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

            <div className="header-titles flex flex-col items-center justify-center">
              <div className="gov-sub-title text-base text-gray-800 tracking-wide mb-[1px]">
                গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার
              </div>
              <h1 className="up-main-title text-4xl font-bold text-header-red leading-snug m-0 tracking-wide">
                {/* drop-shadow-[2px_2px_3px_rgba(0,0,0,0.35)] */}
                {union.up_name}
              </h1>
              <div className="up-sub-address text-xl font-semibold text-slate-900 mt-[1px]">
                উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।
              </div>
              <div className="up-web-url font-siliguri text-sm font-semibold text-slate-900 mt-[1px]">
                {union.website}
              </div>
            </div>

            <div className="header-right-spacer w-[76px] h-[76px]" />
          </div>

          {/* Metadata Ribbon */}
          <div className="cert-meta-ribbon flex justify-between items-center mt-[10px] px-1">
            <div className="meta-item meta-serial text-base text-[#121212]">
              <span className="lbl mr-1.5">ক্রমিক নং:</span>
              <span className="val font-bold font-siliguri tracking-wide">{meta.serial_no}</span>
            </div>

            <div className="meta-badge-container flex justify-center flex-1">
              <div className="cert-badge bg-emerald-600 text-white text-xl font-semibold px-9 py-1 rounded-[4px] tracking-wide inline-block shadow-sm">
                {meta.cert_title}
              </div>
            </div>

            <div className="meta-item meta-date text-base text-[#121212]">
              <span className="lbl mr-1.5">তারিখ:</span>
              <span className="val font-bold font-siliguri tracking-wide">{meta.issue_date}</span>
            </div>
          </div>

          {/* Certificate Content Body */}
          <div className="cert-content-body mt-6 px-2 flex-1 flex flex-col justify-start">
            <p className="cert-paragraph text-base leading-[2.2] text-gray-900 text-justify">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_name}
              </span>{" "}
              (এনআইডি/জন্ম সনদ:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.nid_no}
              </span>
              ), পিতা:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.father_name}
              </span>
              , মাতা:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.mother_name}
              </span>
              , গ্রাম:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.village}
              </span>
              , বাসা নং:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.house_no}
              </span>
              , ওয়ার্ড নং:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.ward_no}
              </span>
              , ডাকঘর:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.post_office}
              </span>
              , উপজেলা:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_upazila}
              </span>
              , জেলা:{" "}
              <span className="font-semibold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_district}
              </span>{" "}
              কে আমি ব্যক্তিগত ভাবে চিনি ও জানি। তিনি অত্র ইউনিয়নের স্থায়ী বাসিন্দা ও বাংলাদেশের নাগরিক। আমার জানামতে তিনি বিবাহবন্ধনে আবদ্ধ হন নাই।
            </p>

            <p className="cert-closing text-base font-semibold text-gray-900 mt-3 pl-[16px]">
              আমি তাহার সার্বিক কল্যাণ ও উন্নতি কামনা করি।
            </p>
          </div>

          {/* Bottom Signatures & QR Section */}
          <div className="cert-footer-section flex justify-between items-end mt-auto p-[4px]">
            {/* qr code box */}
            <div className="qr-code-box flex flex-col items-start">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 shadow-sm">
                <QRCodeSVG
                  value={signatory.qr_url || "https://www.lgoms.org"}
                  size={78}
                  level="M"
                />
              </div>
              <div className="trn-text font-siliguri text-sm text-gray-900 mt-[3px]">
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            {/* signatory box */}
            <div className="signatory-box text-center min-w-[200px] pb-[2px]">
              <div className="sign-space h-[32px]" />
              <div className="sign-name text-base font-semibold text-black leading-tight">
                {signatory.signatory_name}
              </div>
              <div className="sign-role-sub text-base text-gray-800 leading-tight">
                অনুমোদনকারী/প্রদানকারী
              </div>
              <div className="sign-designation text-base text-gray-800 leading-tight">
                {signatory.signatory_role}
              </div>
              <div className="sign-office text-base text-gray-800 leading-tight">
                {union.up_name}
              </div>
              <div className="sign-location text-base text-gray-800 leading-tight">
                {union.upazila}, {union.district}।
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar (Outside thick border box) */}
      <div className="flex justify-between items-center text-xs text-gray-800 font-sans px-1 pt-1">
        <a
          href={signatory.qr_url || "https://www.lgoms.org/umc_certificates.php?id=10422"}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-slate-800 font-normal truncate max-w-[80%]"
        >
          {signatory.qr_url || "https://www.lgoms.org/umc_certificates.php?id=10422"}
        </a>
        <div className="font-normal text-slate-800">
          1/1
        </div>
      </div>
    </div>
  );
}
