"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { TradeLicenseData } from "@/types/license";

interface TradeLicenseSheetProps {
  data: TradeLicenseData;
  lang?: "bn" | "en";
}

export function TradeLicenseSheet({ data, lang = "bn" }: TradeLicenseSheetProps) {
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
      className={`certificate-sheet certificate-sheet-portrait w-[210mm] h-[297mm] min-w-[210mm] min-h-[297mm] bg-white shadow-2xl relative overflow-hidden box-border ${isEn ? "font-serif" : "font-solaiman"} text-[#121212] px-6 py-4 flex flex-col justify-between print:w-[210mm] print:h-[297mm] print:min-w-[210mm] print:min-h-[297mm] print:max-w-[210mm] print:max-h-[297mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid`}
    >
      <style>{`
        @media print {
          @page {
            size: A4 portrait !important;
            margin: 0 !important;
          }
        }
      `}</style>

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
              <div className="gov-sub-title text-[12.5px] text-black tracking-wide mb-[1px]">
                {isEn ? "Government of the People's Republic of Bangladesh" : "গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার"}
              </div>
              <h1 className="up-main-title text-[24px] font-bold text-header-red leading-tight m-0 tracking-wide">
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </h1>
              <div className="up-sub-address text-[12px] font-bold text-black mt-[1px]">
                {isEn ? (
                  <>Upazila: <span>{union.upazila_en || union.upazila}</span>, District: <span>{union.district_en || union.district}</span>.</>
                ) : (
                  <>উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।</>
                )}
              </div>
              <div className="up-web-url font-siliguri text-[11.5px] font-semibold text-black mt-[1px]">
                {union.website}
              </div>
              <div className="text-sm font-bold text-black mt-[1px]">
                {isEn ? "Fiscal Year: " : "অর্থ বছর: "}
                <span>{isEn ? (fiscalYearEn || fiscalYearBn || "2025-2026") : (fiscalYearBn || "২০২৫-২০২৬")}</span>
              </div>
              <div className="mt-1.5">
                <span className="bg-red-800 text-white text-lg font-bold px-9 py-1 rounded-[4px] tracking-wider inline-block shadow-md uppercase">
                  {isEn ? "TRADE LICENSE" : "ট্রেড লাইসেন্স"}
                </span>
              </div>
            </div>

            {/* Right Owner Photo Frame */}
            <div className="owner-photo-box w-[68px] h-[78px] border border-slate-400 bg-white-100 p-0.5 flex items-center justify-center overflow-hidden shadow-sm">
              <Image
                src={owner.photo_url || "/assets/image/person.webp"}
                alt={isEn ? "Applicant's Photo" : "আবেদনকারীর ছবি"}
                width={64}
                height={74}
                className="w-full h-full object-cover text-xs"
                unoptimized
              />
            </div>
          </div>

          {/* Top Metadata Grid */}
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[12.5px] leading-relaxed">
            <div className="flex items-baseline gap-1">
              <span className="text-black w-[130px]">{isEn ? "License No." : "লাইসেন্স নং"}</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {isEn ? (meta.license_no_en || meta.license_no) : meta.license_no}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-black w-[130px]">{isEn ? "License ID" : "লাইসেন্স আইডি"}</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {isEn ? (meta.license_id_en || meta.license_id) : meta.license_id}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-black w-[130px]">{isEn ? "Ward No." : "ওয়ার্ড নং"}</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {isEn ? (meta.ward_no_en || meta.ward_no) : meta.ward_no}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-black w-[130px]">{isEn ? "Circle/Road/Mohalla" : "সার্কেল/রাস্তা/মহল্লা"}</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {isEn ? (meta.circle_road_mohalla_en || meta.circle_road_mohalla) : meta.circle_road_mohalla}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-black w-[130px]">{isEn ? "Issue Date" : "লাইসেন্স ইস্যুর তারিখ"}</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {isEn ? (meta.issue_date_en || meta.issue_date) : meta.issue_date}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-black w-[130px]">{isEn ? "Renewal Date" : "লাইসেন্স নবায়নের তারিখ"}</span>
              <span className={`flex-1 ${lineBorderClass}`}>: {isEn ? (meta.renewal_date_en || meta.renewal_date) : meta.renewal_date}</span>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="my-1.5 text-[12.5px] leading-snug text-black text-justify">
            {isEn ? (
              <>
                By virtue of powers conferred under Section 66 of the Local Government (Union Parishad) Act 2009, and in accordance with Articles 6 & 17 of the Model Tax Schedule 2013, this Trade License is issued to the following person/institution for collecting tax imposed on business, profession, or industry. It shall remain valid until <span className="font-bold">{meta.valid_until_date_en || meta.valid_until_date}</span>.
              </>
            ) : (
              <>
                স্থানীয় সরকার (ইউনিয়ন পরিষদ) আইন, ২০০৯ সনের ৬৬ নং আইনের ধারা ৬৬ তে প্রদত্ত ক্ষমতাবলে সরকার প্রণীত আদর্শ কর তফসিল ২০১৩ এর ৬ ও ১৭ নং অনুচ্ছেদ অনুযায়ী ব্যবসা, বৃত্তি, পেশা বা শিল্প প্রতিষ্ঠানের উপর আরোপিত কর আদায়ের লক্ষ্যে নির্ধারিত শর্তে নিম্নলিখিত ব্যক্তি/প্রতিষ্ঠানের অনুকূলে এই ট্রেড লাইসেন্সটি ইস্যু করা হইল। যাহার মেয়াদ তারিখ <span className="font-bold">{meta.valid_until_date}</span> তারিখ পর্যন্ত বলবৎ থাকিবে।
              </>
            )}
          </div>

          {/* Numbered Details List (1 - 13) */}
          <div className="flex-1 flex flex-col gap-1 text-[12.5px] leading-relaxed">
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "1. Institution Name" : "১। প্রতিষ্ঠানের নাম"}</span>
              <span className={`text-[13.5px] text-black ${lineBorderClass}`}>: {isEn ? (business.institution_name_en || business.institution_name) : business.institution_name}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "2. Business Type" : "২। ব্যবসার ধরণ"}</span>
              <span className={lineBorderClass}>: {isEn ? (business.business_type_en || business.business_type) : business.business_type}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "3. Business Nature" : "৩। ব্যবসার প্রকৃতি"}</span>
              <span className={lineBorderClass}>: {isEn ? (business.business_nature_en || business.business_nature) : business.business_nature}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "4. License Holder Name" : "৪। লাইসেন্সধারীর নাম"}</span>
              <span className={`text-[13.5px] ${lineBorderClass}`}>: {isEn ? (owner.name_en || owner.name) : owner.name}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "5. Father's Name" : "৫। পিতার নাম"}</span>
              <span className={lineBorderClass}>: {isEn ? (owner.father_name_en || owner.father_name) : owner.father_name}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "6. Mother's Name" : "৬। মাতার নাম"}</span>
              <span className={lineBorderClass}>: {isEn ? (owner.mother_name_en || owner.mother_name) : owner.mother_name}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "7. Spouse's Name" : "৭। স্বামী/স্ত্রীর নাম"}</span>
              <span className={lineBorderClass}>: {isEn ? (owner.spouse_name_en || owner.spouse_name || "--------") : (owner.spouse_name || "--------")}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "8. Business Place" : "৮। ব্যবসার স্থান"}</span>
              <span className={lineBorderClass}>: {isEn ? (business.business_place_en || business.business_place) : business.business_place}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "9. Permanent Address" : "৯। স্থায়ী ঠিকানা"}</span>
              <span className={lineBorderClass}>: {isEn ? (owner.permanent_address_en || owner.permanent_address) : owner.permanent_address}</span>
            </div>
            <div className="grid grid-cols-[165px_1fr] items-baseline">
              <span className="text-black">{isEn ? "10. Present Address" : "১০। বর্তমান ঠিকানা"}</span>
              <span className={lineBorderClass}>: {isEn ? (owner.present_address_en || owner.present_address) : owner.present_address}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-[180px_1fr] items-baseline">
                <span className="text-black">{isEn ? "11. NID/BC No." : "১১। এনআইডি/বিআর/পাসপোর্ট নং"}</span>
                <span className={lineBorderClass}>: {isEn ? (owner.nid_or_bc_en || owner.nid_or_bc) : owner.nid_or_bc}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-black">{isEn ? "Tax Zone" : "করঅঞ্চল"}</span>
                <span className={lineBorderClass}>: {isEn ? (owner.tax_zone_en || owner.tax_zone || "Rajbari") : (owner.tax_zone || "রাজবাড়ী")}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-[180px_1fr] items-baseline">
                <span className="text-black">{isEn ? "12. TIN No." : "১২। ট্যাক্স আইডেন্টিফিকেশন নং"}</span>
                <span className={lineBorderClass}>: {owner.tin_no || "--------"}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-black">{isEn ? "Mobile No." : "মোবাইল নং"}</span>
                <span className={lineBorderClass}>: {isEn ? (owner.mobile_no_en || owner.mobile_no) : owner.mobile_no}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-[180px_1fr] items-baseline">
                <span className="text-black">{isEn ? "13. BIN No." : "১৩। বিজনেস আইডেন্টিফিকেশন নং"}</span>
                <span className={lineBorderClass}>: {owner.bin_no || "--------"}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-baseline">
                <span className="text-black">{isEn ? "Email" : "ইমেইল নং"}</span>
                <span className={lineBorderClass}>: {owner.email || "--------"}</span>
              </div>
            </div>
          </div>

          {/* 14. Financial Breakdown Table */}
          <div className="mt-2">
            <div className="font-bold text-sm text-black mb-1">
              {isEn ? "14. Financial Breakdown" : "১৪। আর্থিক বিবরণী"}
            </div>
            <table className="w-full text-[13px] text-black border-collapse border border-gray-400 text-center">
              <thead>
                <tr className="font-bold">
                  <th className="border border-gray-400 px-2 py-0.5 w-10">*</th>
                  <th className="border border-gray-400 px-3 py-0.5 text-left">
                    {isEn ? "Description of Dues" : "আদায়ের বিবরণ"}
                  </th>
                  <th className="border border-gray-400 px-3 py-0.5 w-24 text-right">
                    {isEn ? "Amount (BDT)" : "টাকা"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-2 py-0.5">*</td>
                  <td className="border border-gray-400 px-3 py-0.5 text-left">
                    {isEn ? "Trade License / Renewal Fee" : "ট্রেড লাইসেন্স/নবায়ন ফি"}
                  </td>
                  <td className="border border-gray-400 px-3 py-0.5 text-right">{financials.license_fee}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-2 py-0.5">*</td>
                  <td className="border border-gray-400 px-3 py-0.5 text-left">
                    {isEn ? "Arrear Fee" : "বকেয়া ফি"}
                  </td>
                  <td className="border border-gray-400 px-3 py-0.5 text-right">{financials.arrear_fee}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-2 py-0.5">*</td>
                  <td className="border border-gray-400 px-3 py-0.5 text-left">
                    {isEn ? "Signboard Tax" : "সাইনবোর্ড কর"}
                  </td>
                  <td className="border border-gray-400 px-3 py-0.5 text-right">{financials.signboard_tax}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-2 py-0.5">*</td>
                  <td className="border border-gray-400 px-3 py-0.5 text-left">
                    {isEn ? "VAT" : "ভ্যাট"}
                  </td>
                  <td className="border border-gray-400 px-3 py-0.5 text-right">{financials.vat}</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-2 py-0.5">*</td>
                  <td className="border border-gray-400 px-3 py-0.5 text-left">
                    {isEn ? "Profession Tax" : "পেশা-জীবিকাকর"}
                  </td>
                  <td className="border border-gray-400 px-3 py-0.5 text-right">{financials.profession_tax}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-gray-400 px-2 py-0.5">*</td>
                  <td className="border border-gray-400 px-3 py-0.5 text-left font-bold">
                    {isEn ? "Total" : "মোট"}
                  </td>
                  <td className="border border-gray-400 px-3 py-0.5 text-right font-bold">{financials.total_amount}.00</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-1 text-[13px] font-bold text-black">
              {isEn ? "In Words: " : "কথায় : "}
              <span className="border-b-[1.5px] border-dashed border-black">
                {isEn ? (financials.amount_in_words_en || financials.amount_in_words) : financials.amount_in_words}
              </span>
            </div>
          </div>

          {/* Acknowledgement Line */}
          <div className="mt-2 text-[13px] leading-normal text-black">
            {isEn ? (
              <>
                Total amount in words: <span className="font-bold border-b-[1.5px] border-dashed border-black">{financials.amount_in_words_en || financials.amount_in_words}</span> has been received from Mr./Ms. <span className="font-bold border-b-[1.5px] border-dashed border-black">{owner.name_en || owner.name}</span> for all dues.
              </>
            ) : (
              <>
                লাইসেন্সধারী জনাব/জনাবা <span className="font-bold border-b-[1.5px] border-dashed border-black">{owner.name}</span> নিকট হইতে সকল পাওনা বাবদ মোট টাকা, কথায়: <span className="font-bold border-b-[1.5px] border-dashed border-black">{financials.amount_in_words}</span> আদায় করা হইল।
              </>
            )}
          </div>

          {/* Footer Signatory & QR Code Section */}
          <div className="cert-footer-section flex justify-between items-end mt-auto pt-3 pb-1 px-1">
            {/* Left Signatory */}
            <div className="signatory-box text-center min-w-[170px]">
              <div className="sign-space h-[24px]" />
              <div className="sign-name text-[13.5px] font-bold text-black leading-tight">
                {isEn ? (signatory.left_name_en || signatory.left_name) : signatory.left_name}
              </div>
              <div className="sign-role-sub text-[12px] text-black leading-tight">
                {isEn ? (signatory.left_role_en || signatory.left_role) : signatory.left_role}
              </div>
              <div className="sign-office text-[12px] text-black leading-tight">
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </div>
              <div className="sign-location text-[12px] text-black leading-tight">
                {isEn ? `${union.upazila_en || union.upazila}, ${union.district_en || union.district}.` : `${union.upazila}, ${union.district}।`}
              </div>
            </div>

            {/* Center QR Code */}
            <div className="qr-code-box flex flex-col items-center">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 shadow-sm">
                <QRCodeSVG
                  value={signatory.qr_url || "https://www.lgoms.org"}
                  size={70}
                  level="M"
                />
              </div>
              <div className="trn-text font-siliguri text-[12px] text-black mt-[2px]">
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            {/* Right Signatory */}
            <div className="signatory-box text-center min-w-[170px]">
              <div className="sign-space h-[24px]" />
              <div className="sign-name text-[13.5px] font-bold text-black leading-tight">
                {isEn ? (signatory.right_name_en || signatory.right_name) : signatory.right_name}
              </div>
              <div className="sign-role-sub text-[12px] text-black leading-tight">
                {isEn ? (signatory.right_role_en || signatory.right_role) : signatory.right_role}
              </div>
              <div className="sign-office text-[12px] text-black leading-tight">
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </div>
              <div className="sign-location text-[12px] text-black leading-tight">
                {isEn ? `${union.upazila_en || union.upazila}, ${union.district_en || union.district}.` : `${union.upazila}, ${union.district}।`}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar (Outside thick border box) */}
      {/* <div className="flex justify-between items-center text-[11px] text-black font-sans px-1 pt-0.5">
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
      </div> */}
    </div>
  );
}
