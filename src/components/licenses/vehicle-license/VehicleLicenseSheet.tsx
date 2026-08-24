"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { VehicleLicenseData } from "@/types/license";

interface VehicleLicenseSheetProps {
  data: VehicleLicenseData;
}

export function VehicleLicenseSheet({ data }: VehicleLicenseSheetProps) {
  const { union, meta, vehicle, owner, financials, signatory, fiscalYearBn } = data;
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
      <div className="flex justify-between items-center text-[11px] text-gray-800 font-sans px-1 pb-1">
        <div className="w-[150px] text-left font-normal text-slate-800">
          {printDateTime}
        </div>
        <div className="font-bold text-slate-900 text-[12px] font-solaiman">
          যানবাহন লাইসেন্স
        </div>
        <div className="w-[150px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Rose Gradient Border */}
      <div className="flex-1 relative p-3.5 my-2 mx-1 bg-gradient-to-br from-rose-600 via-rose-800 to-rose-600 shadow-md flex flex-col">
        <div className="certificate-inner-frame w-full h-full bg-white pt-4 px-6 pb-3 relative flex flex-col justify-between z-10 flex-1 border border-red-200">

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

          {/* Header Section with QR Code (Left), Titles (Center), and Photo Placeholder (Right) */}
          <div className="cert-header grid grid-cols-[80px_1fr_68px] items-center text-center relative pt-1">
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
              <div className="gov-sub-title text-[12.5px] font-semibold text-gray-800 tracking-wide mb-[1px]">
                গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার
              </div>
              <h1 className="up-main-title text-[24px] font-bold text-header-red leading-tight m-0 tracking-wide">
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
                <span className="bg-red-800 text-white text-lg font-bold px-9 py-1 rounded-[4px] tracking-wider inline-block shadow-md">
                  যানবাহন লাইসেন্স
                </span>
              </div>
            </div>

            {/* Right Owner Photo Frame */}
            <div className="owner-photo-box w-[68px] h-[78px] border border-slate-400 bg-white-100 p-0.5 flex items-center justify-center overflow-hidden shadow-sm">
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

          {/* Top Metadata Grid */}
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[12.5px]">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-800 w-[120px]">লাইসেন্স নং</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {meta.license_no}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-800 w-[120px]">লাইসেন্স আইডি</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {meta.license_id}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-800 w-[120px]">ইস্যুর তারিখ</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {meta.issue_date}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-800 w-[120px]">নবায়নের তারিখ</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {meta.renewal_date}</span>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="my-1.5 text-[11px] leading-snug text-slate-800 text-justify">
            ইউনিয়ন পরিষদ আইন- ২০০৯ এর ১০২-১০৮ ধারার ৩য় তফসিলের ,৮,১০,১৯,ও২২আইটেম অনুসারে (ট্রেড,প্রফেশন,যানবাহন,কলিং ও বিজ্ঞাপন) ব্যবসা/পেশার অনুমোদনপত্র নিম্নে বর্ণিত ব্যক্তি/প্রতিষ্ঠানের অনুকূলে দেওয়া হইল। যাহার মেয়াদ তারিখ <span className="font-semibold text-black">{meta.valid_until_date}</span> তারিখ পর্যন্ত বলবৎ থাকিবে।
          </div>

          {/* Numbered Details List (১ - ১০) */}
          <div className="flex-1 flex flex-col gap-1 text-[12.5px] leading-relaxed">
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">১। যানবাহনের নাম</span>
              <span className={`text-[13.5px] text-red-900 ${lineBorderClass}`}>: {vehicle.name}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">২। যানবাহনের ধরণ</span>
              <span className={lineBorderClass}>: {vehicle.type}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৩। মালিকের নাম</span>
              <span className={`text-[13.5px] ${lineBorderClass}`}>: {owner.name}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৪। পিতা/স্বামীর নাম</span>
              <span className={lineBorderClass}>: {owner.father_or_husband_name}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৫। মাতার নাম</span>
              <span className={lineBorderClass}>: {owner.mother_name}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৬। স্থায়ী ঠিকানা</span>
              <span className={lineBorderClass}>: {owner.permanent_address}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৭। বর্তমান ঠিকানা</span>
              <span className={lineBorderClass}>: {owner.present_address}</span>
            </div>

            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৮। এনআইডি নং</span>
              <span className={lineBorderClass}>: {owner.nid_no}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৯। মোবাইল নং</span>
              <span className={lineBorderClass}>: {owner.mobile_no}</span>
            </div>

            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">১০। চলাচলের স্থান</span>
              <span className={lineBorderClass}>: {vehicle.route_place}</span>
            </div>
          </div>

          {/* 12. Financial Breakdown Table */}
          <div className="mt-2 text-[12px]">
            <div className="font-bold text-slate-900 mb-1">১২। আর্থিক বিবরণী</div>
            <table className="w-full border-collapse border border-slate-400 text-center">
              <thead>
                <tr className="font-bold">
                  <th className="border border-slate-400 px-2 py-0.5 w-10">*</th>
                  <th className="border border-slate-400 px-3 py-0.5 text-left">আদায়ের বিবরণ</th>
                  <th className="border border-slate-400 px-3 py-0.5 w-24 text-right">টাকা</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">লাইসেন্স/নবায়ন ফি</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.license_fee}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">বকেয়া ফি</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.arrear_fee}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">পেশাজীবি কর</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.profession_tax}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">নেমপ্লেট কর</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.nameplate_tax}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">বিবিধ</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.miscellaneous}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">ভ্যাট আয়কর</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.vat_income_tax}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left font-bold">মোট</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right font-bold">{financials.total_amount}.00</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-1 font-bold text-slate-800">
              কথায় : <span className="border-b-[1.5px] border-dashed border-slate-800">{financials.amount_in_words}</span>
            </div>
          </div>

          {/* Acknowledgement Line */}
          <div className="mt-2 text-[11.5px] leading-normal text-slate-800">
            প্রাপ্ত হয়ে <span className="font-bold border-b-[1.5px] border-dashed border-slate-800">{owner.name}</span> কে তার যানবাহন/যানবাহন ব্যবসা চালিয়ে যাবার জন্য অত্র লাইসেন্স প্রদান করা হলো, অত্র লাইসেন্সটি নবায়নের শেষ তারিখ <span className="font-bold border-b-[1.5px] border-dashed border-slate-800">{meta.renewal_deadline_date}</span> ।
          </div>

          {/* Footer Signatory Section */}
          <div className="cert-footer-section flex justify-between items-end mt-auto pt-3 pb-1 px-1">
            {/* Left Signatory */}
            <div className="signatory-box text-center min-w-[170px]">
              <div className="sign-space h-[24px]" />
              <div className="sign-name text-[13.5px] font-bold text-slate-950 leading-tight">
                {signatory.left_name}
              </div>
              <div className="sign-role-sub text-[11.5px] font-semibold text-slate-700 leading-tight">
                {signatory.left_role}
              </div>
              <div className="sign-office text-[11.5px] font-semibold text-slate-700 leading-tight">
                {union.up_name}
              </div>
              <div className="sign-location text-[11.5px] font-semibold text-slate-700 leading-tight">
                {union.upazila}, {union.district}।
              </div>
            </div>

            {/* Center QR Code */}
            <div className="qr-code-box flex flex-col items-center">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 shadow-sm">
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

            {/* Right Signatory */}
            <div className="signatory-box text-center min-w-[170px]">
              <div className="sign-space h-[24px]" />
              <div className="sign-name text-[13.5px] font-bold text-slate-950 leading-tight">
                {signatory.right_name}
              </div>
              <div className="sign-role-sub text-[11.5px] font-semibold text-slate-700 leading-tight">
                {signatory.right_role}
              </div>
              <div className="sign-office text-[11.5px] font-semibold text-slate-700 leading-tight">
                {union.up_name}
              </div>
              <div className="sign-location text-[11.5px] font-semibold text-slate-700 leading-tight">
                {union.upazila}, {union.district}।
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar (Outside thick border box) */}
      <div className="flex justify-between items-center text-[11px] text-gray-800 font-sans px-1 pt-0.5">
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
