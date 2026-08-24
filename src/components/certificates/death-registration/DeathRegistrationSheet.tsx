"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { CertificateData } from "@/types/certificate";

interface DeathRegistrationSheetProps {
  data: CertificateData;
}

export function DeathRegistrationSheet({ data }: DeathRegistrationSheetProps) {
  const {
    union,
    meta,
    applicant,
    signatory,
    registrationDateBn,
    registrationNoBn,
    dateOfDeathBn,
    dateOfDeathInWordsBn,
    genderBn,
    permanentAddressBn,
    presentAddressBn,
    causeOfDeathBn,
    placeOfDeathBn,
    leftSignatoryNameBn,
    leftSignatoryRoleBn,
  } = data;

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

  const regNo = (registrationNoBn || meta.serial_no || "19998217629000001").padEnd(17, "0");
  const regDigits = regNo.split("").slice(0, 17);

  const borderClass = "font-semibold text-black border-b-[1.5px] border-dashed border-black pb-0.5";

  return (
    <div
      id="certificateSheet"
      className="certificate-sheet certificate-sheet-portrait w-[210mm] h-[297mm] min-w-[210mm] min-h-[297mm] bg-white shadow-2xl relative overflow-hidden box-border font-solaiman text-[#121212] px-6 py-4 flex flex-col justify-between print:w-[210mm] print:h-[297mm] print:min-w-[210mm] print:min-h-[297mm] print:max-w-[210mm] print:max-h-[297mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid"
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
        <div className="text-black text-sm font-solaiman">
          {meta.cert_title || "মৃত্যু নিবন্ধন সনদ"}
        </div>
        <div className="w-[150px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Emerald Gradient Border */}
      <div className="flex-1 relative p-3.5 my-3 mx-2 bg-gradient-to-br from-emerald-600 via-teal-500 to-green-700 shadow-md flex flex-col">
        <div className="certificate-inner-frame w-full h-full bg-white pt-5 px-8 pb-4 relative flex flex-col justify-between z-10 flex-1 border border-emerald-200">

          {/* Background Watermark */}
          <div className="watermark-container absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none -z-10 flex justify-center items-center">
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
          <div className="cert-header flex flex-col items-center text-center relative">
            <div className="absolute left-0 top-0 w-[72px] h-[72px]">
              <Image
                src="/assets/logo/logo.webp"
                alt="বাংলাদেশ সরকার সিল"
                width={72}
                height={72}
                className="gov-monogram w-full h-full drop-shadow-sm"
                priority
              />
            </div>

            <div className="header-titles flex flex-col items-center justify-center pt-1">
              <div className="gov-sub-title text-base text-black tracking-wide mb-[1px]">
                গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার
              </div>
              <div className="text-xl font-semibold text-emerald-800 tracking-wide">
                জন্ম ও মৃত্যু নিবন্ধকের কার্যালয়
              </div>
              <h1 className="up-main-title text-4xl font-bold text-header-red leading-snug m-0 tracking-wide">
                {union.up_name}
              </h1>
              <div className="up-sub-address text-xl font-semibold text-black mt-[1px]">
                উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।
              </div>
              <div className="up-web-url font-siliguri text-sm font-semibold text-black mt-[1px]">
                {union.website}
              </div>
            </div>

            {/* Green Title Badge */}
            <div className="mt-3">
              <h2 className="text-2xl font-semibold text-emerald-700 tracking-wide border-b-2 border-emerald-600 pb-0.5 inline-block">
                মৃত্যু নিবন্ধন সনদ
              </h2>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="mt-4 flex flex-col gap-2.5 text-base text-black">
            <div className="flex justify-between items-center text-black">
              <div>
                নিবন্ধনের তারিখ : <span className="font-semibold border-b-[1.5px] border-dashed border-black">{registrationDateBn || meta.issue_date}</span>
              </div>
              <div>
                সনদ প্রদান তারিখ : <span className="font-semibold border-b-[1.5px] border-dashed border-black">{meta.issue_date}</span>
              </div>
            </div>

            {/* 17 Digit Death Registration Number Box */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base text-black whitespace-nowrap">মৃত্যু নিবন্ধন নং:</span>
              <div className="flex-1 grid grid-cols-17 gap-0.5 border border-slate-800 p-0.5 bg-slate-50">
                {regDigits.map((digit, index) => (
                  <div key={index} className="h-7 border border-slate-400 flex items-center justify-center text-black text-base font-solaiman bg-white">
                    {digit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Value Details Grid */}
          <div className="mt-5 flex-1 flex flex-col gap-3.5 text-base leading-normal text-black">
            <div className="grid grid-cols-[130px_1fr] items-baseline pb-1">
              <span className="text-black">নাম</span>
              <span className="font-semibold text-base text-black border-b-[1.5px] border-dashed border-black pb-0.5">: {applicant.person_name}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr] items-baseline pb-1">
              <span className="text-black">মৃত্যুর তারিখ</span>
              <span className={borderClass}>: {dateOfDeathBn || "05-05-1999"}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr] items-baseline pb-1">
              <span className="text-black">কথায়</span>
              <span className={borderClass}>: {dateOfDeathInWordsBn || "পাঁচই মে উনিশশত নিরানব্বই"}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr] items-baseline pb-1">
              <span className="text-black">লিঙ্গ</span>
              <span className={borderClass}>: {genderBn || "নারী"}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-1">
              <div className="grid grid-cols-[130px_1fr] items-baseline">
                <span className="text-black">পিতার নাম</span>
                <span className={borderClass}>: {applicant.father_name}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-black">মাতার নাম</span>
                <span className={borderClass}>: {applicant.mother_name}</span>
              </div>
            </div>

            <div className="grid grid-cols-[130px_1fr] items-baseline pb-1">
              <span className="text-black">স্বামী/স্ত্রীর নাম</span>
              <span className={borderClass}>: {applicant.spouse_name || "মৃত- দিপালী অধিকারী"}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr] items-baseline pb-1">
              <span className="text-black">স্থায়ী ঠিকানা</span>
              <span className={borderClass}>: {permanentAddressBn || `গ্রাম: ${applicant.village}, ডাকঘর: ${applicant.post_office}, উপজেলা: ${applicant.person_upazila}, জেলা: ${applicant.person_district}।`}</span>
            </div>

            <div className="grid grid-cols-[130px_1fr] items-baseline pb-1">
              <span className="text-black">বর্তমান ঠিকানা</span>
              <span className={borderClass}>: {presentAddressBn || `গ্রাম: ${applicant.village}, ডাকঘর: ${applicant.post_office}, উপজেলা: ${applicant.person_upazila}, জেলা: ${applicant.person_district}।`}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-1">
              <div className="grid grid-cols-[130px_1fr] items-baseline">
                <span className="text-black">মৃত্যুর কারণ</span>
                <span className={borderClass}>: {causeOfDeathBn || "শ্বাসকষ্ট জনিত কারণ।"}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-black">মৃত্যুর স্থান</span>
                <span className={borderClass}>: {placeOfDeathBn || `গ্রাম: ${applicant.village}, ডাকঘর: ${applicant.post_office}, উপজেলা: ${applicant.person_upazila}, জেলা: ${applicant.person_district}।`}</span>
              </div>
            </div>
          </div>

          {/* Footer Signatory & QR Code Section */}
          <div className="cert-footer-section flex justify-between items-end mt-auto pt-4 pb-1 px-1">
            {/* Left Signatory */}
            <div className="signatory-box text-center min-w-[170px]">
              <div className="sign-space h-[28px]" />
              <div className="sign-name text-base font-semibold text-black leading-tight">
                {leftSignatoryNameBn || "সৈয়দ মেহেদী মাসুদ"}
              </div>
              <div className="sign-role-sub text-base text-black leading-tight">
                {leftSignatoryRoleBn || "প্রশাসনিক কর্মকর্তা"}
              </div>
              <div className="sign-office text-base text-black leading-tight">
                {union.up_name}
              </div>
              <div className="sign-location text-base text-black leading-tight">
                {union.upazila}, {union.district}।
              </div>
            </div>

            {/* Center QR Code */}
            <div className="qr-code-box flex flex-col items-center">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 shadow-sm">
                <QRCodeSVG
                  value={signatory.qr_url || "https://www.lgoms.org"}
                  size={78}
                  level="M"
                />
              </div>
              <div className="trn-text font-siliguri text-sm text-black mt-[3px]">
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            {/* Right Signatory */}
            <div className="signatory-box text-center min-w-[170px]">
              <div className="sign-space h-[28px]" />
              <div className="sign-name text-base font-semibold text-black leading-tight">
                {signatory.signatory_name}
              </div>
              <div className="sign-role-sub text-base text-black leading-tight">
                {signatory.signatory_role}
              </div>
              <div className="sign-office text-base text-black leading-tight">
                {union.up_name}
              </div>
              <div className="sign-location text-base text-black leading-tight">
                {union.upazila}, {union.district}।
              </div>
            </div>
          </div>

          {/* Bottom Tagline Ribbon */}
          <div className="mt-5 text-center text-base text-black">
            সময়মত কর পরিশোধ করুন * গাছ লাগান পরিবেশ বাঁচান * আপনার সন্তানকে স্কুলে পাঠান
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar (Outside thick border box) */}
      <div className="flex justify-between items-center text-xs text-black font-sans px-1 pt-1">
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
