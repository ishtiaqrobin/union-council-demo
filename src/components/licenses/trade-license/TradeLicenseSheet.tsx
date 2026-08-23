"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { TradeLicenseData } from "@/types/license";

interface TradeLicenseSheetProps {
  data: TradeLicenseData;
}

export function TradeLicenseSheet({ data }: TradeLicenseSheetProps) {
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
      {/* <div className="flex justify-between items-center text-[11px] text-gray-800 font-sans px-1 pb-1">
        <div className="w-[150px] text-left font-normal text-slate-800">
          {printDateTime}
        </div>
        <div className="font-bold text-slate-900 text-[12px] font-solaiman">
          ট্রেড লাইসেন্স
        </div>
        <div className="w-[150px]" />
      </div> */}

      {/* Main Certificate Box with Outer Padding and Thick Maroon Gradient Border */}
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

          {/* Header Section with Government Seal, Titles, and Photo Placeholder */}
          <div className="cert-header grid grid-cols-[68px_1fr_68px] items-center text-center relative pt-1">
            {/* Left Seal */}
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
                <span className="bg-red-800 text-white text-[16px] font-bold px-6 py-1 rounded-sm tracking-wider inline-block shadow-md">
                  ট্রেড লাইসেন্স
                </span>
              </div>
            </div>

            {/* Right Owner Photo Frame */}
            <div className="owner-photo-box w-[68px] h-[78px] border border-slate-400 bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
              <Image
                // src={owner.photo_url || "/assets/image/person.webp"}
                src="/assets/image/person.webp"
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
              <span className="font-bold text-slate-800 w-[120px]">ওয়ার্ড নং</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {meta.ward_no}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-800 w-[120px]">সার্কেল/রাস্তা/মহল্লা</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {meta.circle_road_mohalla}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-800 w-[120px]">লাইসেন্স ইস্যুর তারিখ</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {meta.issue_date}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-slate-800 w-[120px]">লাইসেন্স নবায়নের তারিখ</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {meta.renewal_date}</span>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="my-1.5 text-[11px] leading-snug text-slate-800 text-justify bg-slate-50 p-1.5 rounded border border-slate-200">
            স্থানীয় সরকার (ইউনিয়ন পরিষদ) আইন, ২০০৯ সনের ৬১ নং আইনের ধারা ৬৬ তে প্রদত্ত ক্ষমতাবলে সরকার প্রণীত আদর্শ কর তফসিল ২০১৩ এর ৬ ও ১৭ নং অনুচ্ছেদ অনুযায়ী ব্যবসা, বৃত্তি, পেশা বা শিল্প প্রতিষ্ঠানের উপর আরোপিত কর আদায়ের লক্ষ্যে নির্ধারিত শর্তে নিম্নলিখিত ব্যক্তি/প্রতিষ্ঠানের অনুকূলে এই ট্রেড লাইসেন্সটি ইস্যু করা হইল। যাহার মেয়াদ তারিখ <span className="font-bold">{meta.valid_until_date}</span> তারিখ পর্যন্ত বলবৎ থাকিবে।
          </div>

          {/* Numbered Details List (১ - ১৩) */}
          <div className="flex-1 flex flex-col gap-1 text-[12.5px] leading-relaxed">
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">১। প্রতিষ্ঠানের নাম</span>
              <span className={`text-[13.5px] text-red-900 ${lineBorderClass}`}>: {business.institution_name}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">২। ব্যবসার ধরণ</span>
              <span className={lineBorderClass}>: {business.business_type}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৩। ব্যবসার প্রকৃতি</span>
              <span className={lineBorderClass}>: {business.business_nature}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৪। লাইসেন্সধারীর নাম</span>
              <span className={`text-[13.5px] ${lineBorderClass}`}>: {owner.name}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৫। পিতার নাম</span>
              <span className={lineBorderClass}>: {owner.father_name}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৬। মাতার নাম</span>
              <span className={lineBorderClass}>: {owner.mother_name}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৭। স্বামী/স্ত্রীর নাম</span>
              <span className={lineBorderClass}>: {owner.spouse_name || "--------"}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৮। ব্যবসার স্থান</span>
              <span className={lineBorderClass}>: {business.business_place}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">৯। স্থায়ী ঠিকানা</span>
              <span className={lineBorderClass}>: {owner.permanent_address}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="font-bold text-slate-800">১০। বর্তমান ঠিকানা</span>
              <span className={lineBorderClass}>: {owner.present_address}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-[180px_1fr] items-baseline">
                <span className="font-bold text-slate-800">১১। এনআইডি/বিআর/পাসপোর্ট নং</span>
                <span className={lineBorderClass}>: {owner.nid_or_bc}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="font-bold text-slate-800">করঅঞ্চল</span>
                <span className={lineBorderClass}>: {owner.tax_zone || "রাজবাড়ী"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-[180px_1fr] items-baseline">
                <span className="font-bold text-slate-800">১২। ট্যাক্স আইডেন্টিফিকেশন নং</span>
                <span className={lineBorderClass}>: {owner.tin_no || "--------"}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="font-bold text-slate-800">মোবাইল নং</span>
                <span className={lineBorderClass}>: {owner.mobile_no}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-[180px_1fr] items-baseline">
                <span className="font-bold text-slate-800">১৩। বিজনেস আইডেন্টিফিকেশন নং</span>
                <span className={lineBorderClass}>: {owner.bin_no || "--------"}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="font-bold text-slate-800">ইমেইল নং</span>
                <span className={lineBorderClass}>: {owner.email || "--------"}</span>
              </div>
            </div>
          </div>

          {/* 14. Financial Breakdown Table */}
          <div className="mt-2 text-[12px]">
            <div className="font-bold text-slate-900 mb-1">১৪। আর্থিক বিবরণী</div>
            <table className="w-full border-collapse border border-slate-400 text-center">
              <thead>
                <tr className="font-bold">
                  {/* bg-slate-50 */}
                  <th className="border border-slate-400 px-2 py-0.5 w-10">*</th>
                  <th className="border border-slate-400 px-3 py-0.5 text-left">আদায়ের বিবরণ</th>
                  <th className="border border-slate-400 px-3 py-0.5 w-24 text-right">টাকা</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">ট্রেড লাইসেন্স/নবায়ন ফি</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.license_fee}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">বকেয়া ফি</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.arrear_fee}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">সাইনবোর্ড কর</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.signboard_tax}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">ভ্যাট</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.vat}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-2 py-0.5">*</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-left">পেশা-জীবিকাকর</td>
                  <td className="border border-slate-400 px-3 py-0.5 text-right">{financials.profession_tax}</td>
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
            লাইসেন্সধারী জনাব/জনাবা <span className="font-bold border-b-[1.5px] border-dashed border-slate-800">{owner.name}</span> নিকট হইতে সকল পাওনা বাবদ মোট টাকা, কথায়: <span className="font-bold border-b-[1.5px] border-dashed border-slate-800">{financials.amount_in_words}</span> আদায় করা হইল।
          </div>

          {/* Footer Signatory & QR Code Section */}
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
      {/* <div className="flex justify-between items-center text-[11px] text-gray-800 font-sans px-1 pt-0.5">
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
      </div> */}
    </div>
  );
}
