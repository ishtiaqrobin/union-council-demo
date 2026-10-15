"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { CertificateData } from "@/types/certificate";
import { CERTIFICATE_FALLBACK_NOTE } from "@/lib/certificate-source";
import { certificateWritten } from "@/components/licenses/certificate-text";

interface NOCSheetProps {
  data: CertificateData;
  lang?: "bn" | "en";
}

/**
 * ============================================================================
 * অনাপত্তি সনদ (NO OBJECTION CERTIFICATE) — PORTRAIT A4 SPECIFICATION
 * ============================================================================
 *
 * Exactly mirrors the real-world Union Council official specimen (অনাপত্তি সনদ.pdf):
 * - Portrait A4 page (210mm × 297mm) with thick maroon gradient border frame
 * - Watermark in center with Bangladesh Government Seal
 * - Top Header:
 *   - Left: Machine-readable QR Code
 *   - Center: Government & Union titles, website, fiscal year, and maroon "অনাপত্তি সনদ" badge
 *   - Right: Passport-sized Applicant Photo in border box
 * - Top Metadata Grid: 6 rows (সনদ নং, সনদ আইডি, ওয়ার্ড নং, সার্কেল/রাস্তা/মহল্লা, ইস্যুর তারিখ, আবেদনের তারিখ)
 * - Legal Preamble: Sections 102-108, Schedule 3 of Union Parishad Act 2009
 * - Numbered Details (১ - ১০): Subject, Purpose, Applicant Name, Father/Spouse, Mother, Place, Permanent Address, Present Address, NID, Mobile
 * - Schedule of Land Table (১১। তফসীল বিবরণী): 6 rows (মৌজা, খতিয়ান, হাল দাগ, জমির পরিমাণ শতক, জমির অবস্থান, ওয়ার্ড নং)
 * - Financial Acknowledgement Line: Total fee received with subject and applicant name
 * - 3-Column Official Signatories: Accounts Assistant (হিসাবসহকারী/প্রস্তুতকারী), Administrative Officer (প্রশাসনিক কর্মকর্তা), Chairman (চেয়ারম্যান)
 */
export function NOCSheet({ data, lang = "bn" }: NOCSheetProps) {
  const { union, meta, applicant, signatory } = data;
  const [printDateTime, setPrintDateTime] = useState("2/12/26, 10:30 AM");
  const isEn = lang === "en";

  const written = (enValue?: string, bnValue?: string) =>
    certificateWritten(enValue, bnValue, CERTIFICATE_FALLBACK_NOTE);

  const hasSpouse = Boolean(applicant.spouse_name);
  const guardianBn = hasSpouse ? applicant.spouse_name : applicant.father_name;
  const guardianEn = hasSpouse ? applicant.spouse_name_en : applicant.father_name_en;

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = String(now.getFullYear()).slice(-2);
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    setPrintDateTime(`${month}/${day}/${year}, ${hours}:${minutes} ${ampm}`);
  }, []);

  const metaLineClass =
    "font-semibold text-black border-b-[1.5px] border-dashed border-black pb-0.5";

  return (
    <div
      id="certificateSheet"
      className={`certificate-sheet certificate-sheet-portrait w-[210mm] h-[297mm] min-w-[210mm] min-h-[297mm] bg-white shadow-2xl relative overflow-hidden box-border ${
        isEn ? "font-serif" : "font-solaiman"
      } text-[#121212] px-6 py-4 flex flex-col justify-between print:w-[210mm] print:h-[297mm] print:min-w-[210mm] print:min-h-[297mm] print:max-w-[210mm] print:max-h-[297mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid`}
    >
      <style>{`
        @media print {
          @page {
            size: A4 portrait !important;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* Main Outer Box with Maroon Gradient Border */}
      <div className="flex-1 relative p-3 my-1.5 mx-1 bg-gradient-to-br from-rose-700 via-rose-900 to-rose-700 shadow-md flex flex-col">
        <div className="certificate-inner-frame w-full h-full bg-white pt-3 px-5 pb-2.5 relative flex flex-col justify-between z-10 flex-1 border border-red-200">
          {/* Background Watermark */}
          <div className="watermark-container absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] pointer-events-none -z-10 flex justify-center items-center">
            <Image
              src="/assets/watermark/watermark.webp"
              alt="Watermark"
              width={360}
              height={360}
              className="watermark-image max-w-full max-h-full object-contain opacity-[0.14] pointer-events-none"
              priority
            />
          </div>

          {/* Header Section */}
          <div className="cert-header grid grid-cols-[72px_1fr_72px] items-center text-center relative pt-0.5">
            {/* Top Left QR Code */}
            <div className="qr-code-box w-[70px] h-[72px] p-1 bg-white border border-gray-300 shadow-sm flex items-center justify-center">
              <QRCodeSVG
                value={signatory.qr_url || "https://www.lgoms.org"}
                size={62}
                level="M"
              />
            </div>

            {/* Center Header Titles */}
            <div className="header-titles flex flex-col items-center justify-center">
              <div className="gov-sub-title text-[12.5px] font-bold text-black tracking-wide mb-[1px]">
                {isEn
                  ? "Government of the People's Republic of Bangladesh"
                  : "গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার"}
              </div>
              <h1 className="up-main-title text-[23px] font-black text-header-red leading-tight m-0 tracking-wide">
                {isEn ? union.up_name_en || union.up_name : union.up_name}
              </h1>
              <div className="up-sub-address text-[12px] font-bold text-black mt-[1px]">
                {isEn ? (
                  <>
                    Upazila: <span>{union.upazila_en || union.upazila}</span>,
                    District: <span>{union.district_en || union.district}</span>
                    .
                  </>
                ) : (
                  <>
                    উপজেলা: <span>{union.upazila}</span>, জেলা:{" "}
                    <span>{union.district}</span>।
                  </>
                )}
              </div>
              <div className="up-web-url font-siliguri text-[11px] font-semibold text-black mt-[1px]">
                {union.website}
              </div>
              <div className="text-[12px] font-bold text-black mt-[1px]">
                {isEn ? "Fiscal Year: " : "অর্থ বছর: "}
                <span>{data.fiscalYearBn || data.fiscalYearEn || "2025-2026"}</span>
              </div>
              <div className="mt-1">
                <span className="bg-red-900 text-white text-[15px] font-bold px-9 py-0.5 rounded-[4px] tracking-wider inline-block shadow-md">
                  {isEn ? "No Objection Certificate" : "অনাপত্তি সনদ"}
                </span>
              </div>
            </div>

            {/* Top Right Applicant Photo */}
            <div className="owner-photo-box w-[68px] h-[80px] border border-slate-400 bg-white p-0.5 flex items-center justify-center overflow-hidden shadow-sm justify-self-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={applicant.photo_url || "/assets/image/person.jpg"}
                alt={isEn ? "Applicant's Photo" : "আবেদনকারীর ছবি"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Top Metadata Grid (6 rows with full-width dashed underline) */}
          <div className="mt-2 flex flex-col gap-0.5 text-[12px] leading-relaxed">
            <div className="grid grid-cols-[145px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Certificate No." : "সনদ নং"}</span>
              <span className={metaLineClass}>: {meta.serial_no}</span>
            </div>
            <div className="grid grid-cols-[145px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Certificate ID" : "সনদ আইডি"}</span>
              <span className={metaLineClass}>
                : {meta.cert_id || meta.serial_no}
              </span>
            </div>
            <div className="grid grid-cols-[145px_1fr] items-baseline">
              <span className="text-black">{isEn ? "Ward No." : "ওয়ার্ড নং"}</span>
              <span className={metaLineClass}>
                : {meta.ward_no || applicant.ward_no || "03"}
              </span>
            </div>
            <div className="grid grid-cols-[145px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "Circle/Road/Mohalla" : "সার্কেল/রাস্তা/মহল্লা"}
              </span>
              <span className={metaLineClass}>
                :{" "}
                {isEn
                  ? written(meta.circle_road_mohalla_en, meta.circle_road_mohalla)
                  : meta.circle_road_mohalla || "বসন্তপুর ইউপি"}
              </span>
            </div>
            <div className="grid grid-cols-[145px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "Certificate Issue Date" : "সনদ ইস্যুর তারিখ"}
              </span>
              <span className={metaLineClass}>
                : {isEn ? meta.issue_date_en || meta.issue_date : meta.issue_date}
              </span>
            </div>
            <div className="grid grid-cols-[145px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "Application Date" : "সনদ আবেদনের তারিখ"}
              </span>
              <span className={metaLineClass}>
                :{" "}
                {isEn
                  ? meta.application_date_en ||
                    meta.application_date ||
                    meta.issue_date_en ||
                    meta.issue_date
                  : meta.application_date || meta.issue_date}
              </span>
            </div>
          </div>

          {/* Legal Preamble */}
          <div className="my-1.5 text-[11.5px] leading-snug text-black text-justify">
            {isEn ? (
              <>
                Pursuant to items 8, 10, 19, and 322 of the 3rd Schedule under
                Sections 102–108 of the Local Government (Union Parishad) Act, 2009
                (Trade, Profession, Calling, Advertisement, and Building
                Construction), environmental no-objection for structural layout is
                hereby granted. The scheduled land is neither government-owned nor
                gifted/deeded in the name of the Union Parishad. The Union Parishad
                does not deem there to be environmental risks in constructing the
                structure on the said land. Nevertheless, subject to clearance
                from the Department of Environment for large structures,
                environmental no-objection is granted in favor of the
                person/institution described below.
              </>
            ) : (
              <>
                ইউনিয়ন পরিষদ আইন- ২০০৯ এর ১০২-১০৮ ধারার ৩য় তফসিলের
                ৮,১০,১৯,৩২২আইটেম অনুসারে (ট্রেড,প্রফেশন,কলিং,বিজ্ঞাপন ও ইমারত
                নির্মাণ) স্থাপনার নক্সা পরিবেশগত অনাপত্তি প্রদান করা হলো, উক্ত
                তফসীলভুক্ত জমি কোন সরকারী মালিকানাভূক্ত বা ইউনিয়ন পরিষদের নামে
                দান/দলিলকৃত নয়। উক্ত জমিতে স্থাপনা তৈরীর ক্ষেত্রে পরিবেশের ঝুঁকি
                আছে বলে ইউনিয়ন পরিষদ মনে করে না। তথাপি বৃহৎ স্থাপনার জন্য
                পরিবেশ অধিদপ্তরের অনুমতি সাপেক্ষে পরিবেশগত অনাপত্তি নিম্নে বর্ণিত
                ব্যক্তি/প্রতিষ্ঠানের অনুকূলে দেওয়া হইল।
              </>
            )}
          </div>

          {/* Numbered Details List (১ - ১০) */}
          <div className="flex flex-col gap-0.5 text-[11.5px] leading-relaxed">
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "1. Application Subject" : "১। আবেদনের বিষয়"}
              </span>
              <span className={metaLineClass}>
                :{" "}
                {isEn
                  ? data.nocSubjectEn || data.nocSubjectBn || "Environmental Clearance"
                  : data.nocSubjectBn || "পরিবেশগত অনাপত্তি"}
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "2. Nature of NOC" : "২। অনাপত্তির ধরণ"}
              </span>
              <span className={metaLineClass}>
                :{" "}
                {isEn
                  ? data.nocPurposeEn ||
                    data.nocPurposeBn ||
                    "Small commercial structure or business establishment construction"
                  : data.nocPurposeBn ||
                    "পরিবেশগত অনাপত্তি,ছোট বাণিজ্যিক স্থাপনা বা ব্যবসা প্রতিষ্ঠান নির্মান"}
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "3. Applicant Name" : "৩। আবেদনকারীর নাম"}
              </span>
              <span className={`text-[12.5px] ${metaLineClass}`}>
                :{" "}
                {isEn
                  ? written(applicant.person_name_en, applicant.person_name)
                  : applicant.person_name}
                {data.nocOrganization ? ` ,${data.nocOrganization}` : ""}
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "4. Father/Spouse Name" : "৪। পিতা/স্বামীর নাম"}
              </span>
              <span className={metaLineClass}>
                : {isEn ? written(guardianEn, guardianBn) : guardianBn}
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "5. Mother's Name" : "৫। মাতার নাম"}
              </span>
              <span className={metaLineClass}>
                :{" "}
                {isEn
                  ? written(applicant.mother_name_en, applicant.mother_name)
                  : applicant.mother_name}
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "6. Structure Location" : "৬। স্থাপনার স্থান"}
              </span>
              <span className={metaLineClass}>
                :{" "}
                {isEn
                  ? written(
                      data.nocPlaceEn,
                      data.nocPlaceBn || data.mouzaName || "উদয়পুর",
                    )
                  : data.nocPlaceBn || data.mouzaName || "উদয়পুর"}
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "7. Permanent Address" : "৭। স্থায়ীঠিকানা"}
              </span>
              <span className={metaLineClass}>
                :{" "}
                {isEn
                  ? data.permanentAddressEn ||
                    data.permanentAddressBn ||
                    `Village: ${applicant.village}, Post: ${applicant.post_office}, ${applicant.person_upazila}, ${applicant.person_district}.`
                  : data.permanentAddressBn ||
                    `গ্রামঃ ${applicant.village}, ডাকঘরঃ ${applicant.post_office}, ${applicant.person_upazila}, ${applicant.person_district}।`}
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "8. Present Address" : "৮। বর্তমান ঠিকানা"}
              </span>
              <span className={metaLineClass}>
                :{" "}
                {isEn
                  ? data.presentAddressEn ||
                    data.presentAddressBn ||
                    `Village: ${applicant.village}, Post: ${applicant.post_office}, ${applicant.person_upazila}, ${applicant.person_district}.`
                  : data.presentAddressBn ||
                    `গ্রামঃ ${applicant.village}, ডাকঘরঃ ${applicant.post_office}, ${applicant.person_upazila}, ${applicant.person_district}।`}
              </span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "9. NID No." : "৯। এনআইডি নং"}
              </span>
              <span className={metaLineClass}>: {applicant.nid_no}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] items-baseline">
              <span className="text-black">
                {isEn ? "10. Mobile No." : "১০। মোবাইল নং"}
              </span>
              <span className={metaLineClass}>
                : {applicant.mobile_no || "01874291799"}
              </span>
            </div>
          </div>

          {/* 11. Schedule of Land (১১। তফসীল বিবরণী) Table */}
          <div className="mt-1.5">
            <div className="font-bold text-[12px] text-black mb-0.5">
              {isEn ? "11. Schedule of Land" : "১১। তফসীল বিবরণী"}
            </div>
            <table className="w-full text-[11.5px] text-black border-collapse border border-gray-600">
              <thead>
                <tr className="font-bold bg-slate-50">
                  <th className="border border-gray-600 px-2 py-0.5 w-10 text-center">
                    *
                  </th>
                  <th className="border border-gray-600 px-3 py-0.5 text-center w-[200px]">
                    {isEn ? "Land Particulars" : "ভূমির বিবরণ"}
                  </th>
                  <th className="border border-gray-600 px-3 py-0.5 text-left">
                    {isEn ? "Description" : "বর্ণনা"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-2 py-0.5 text-center">
                    *
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-medium">
                    {isEn ? "Mouza Name" : "মৌজার নাম"}
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-semibold">
                    {data.mouzaName || "উদয়পুর"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-2 py-0.5 text-center">
                    *
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-medium">
                    {isEn ? "Khatian No." : "খতিয়ান নং"}
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-semibold">
                    {data.khatianNo || "1457"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-2 py-0.5 text-center">
                    *
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-medium">
                    {isEn ? "Hal Dag No." : "হাল দাগ নং"}
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-semibold">
                    {data.halDagNo || "24"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-2 py-0.5 text-center">
                    *
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-medium">
                    {isEn ? "Land Area (Decimals)" : "জমির পরিমান শতক"}
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-semibold">
                    {data.landAreaBn || "12"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-2 py-0.5 text-center">
                    *
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-medium">
                    {isEn ? "Land Location" : "জমির অবস্থান"}
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-semibold">
                    {data.nocPlaceBn || data.mouzaName || "উদয়পুর"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-2 py-0.5 text-center">
                    *
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-medium">
                    {isEn ? "Ward No." : "ওয়ার্ড নং"}
                  </td>
                  <td className="border border-gray-600 px-3 py-0.5 text-left font-semibold">
                    {meta.ward_no || applicant.ward_no || "03"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Acknowledgement / Fee Receipt Line */}
          <div className="mt-1.5 text-[11.5px] leading-normal text-black text-justify">
            {isEn ? (
              <>
                On the basis of receiving total amount of Tk.{" "}
                <span className="font-bold border-b border-dashed border-black">
                  {data.nocFeeAmount || "1000.00"}
                </span>{" "}
                for all dues from applicant Mr./Ms.{" "}
                <span className="font-bold border-b border-dashed border-black">
                  {written(applicant.person_name_en, applicant.person_name)}
                  {data.nocOrganization ? ` ,${data.nocOrganization}` : ""}
                </span>
                , this {data.nocSubjectEn || "environmental"} No Objection
                Certificate is hereby granted.
              </>
            ) : (
              <>
                আবেদনকারী জনাব/জনাবা{" "}
                <span className="font-bold border-b border-dashed border-black">
                  {applicant.person_name}
                  {data.nocOrganization ? ` ,${data.nocOrganization}` : ""}
                </span>{" "}
                নিকট হইতে সকল পাওনা বাবদ মোট{" "}
                <span className="font-bold border-b border-dashed border-black">
                  {data.nocFeeAmount || "1000.00"}
                </span>{" "}
                টাকা গ্রহনের ভিত্তিতে {data.nocSubjectBn || "পরিবেশগত"} অনাপত্তি
                সনদ প্রদান করা হইল।
              </>
            )}
          </div>

          {/* Validity Notice (6-month term per §12.3) */}
          {(data.expiresAtBn || data.expiresAtEn) && (
            <div className="mt-1 text-[11px] font-semibold text-slate-700">
              {isEn
                ? `Validity: This certificate remains valid until ${
                    data.expiresAtEn || data.expiresAtBn
                  }.`
                : `মেয়াদ: এই সনদটি ইস্যুর তারিখ হইতে ${data.expiresAtBn} পর্যন্ত বলবৎ থাকিবে।`}
            </div>
          )}

          {/* Footer Signatures (3 Columns) */}
          <div className="cert-footer-section grid grid-cols-3 gap-2 text-center mt-auto pt-4 pb-1 px-1">
            {/* Left Signatory (Accounts Assistant / Prepared by) */}
            <div className="signatory-box text-center">
              <div className="sign-space h-[22px]" />
              <div className="sign-name text-[12px] font-bold text-black leading-tight">
                {isEn
                  ? data.leftSignatoryNameEn ||
                    "Accounts Assistant / Prepared by"
                  : data.leftSignatoryNameBn || "হিসাবসহকারী/প্রস্তুতকারী"}
              </div>
              <div className="sign-office text-[11px] text-black leading-tight mt-0.5">
                {isEn ? union.up_name_en || union.up_name : union.up_name}
              </div>
              <div className="sign-location text-[11px] text-black leading-tight">
                {isEn
                  ? `${union.upazila_en || union.upazila}, ${
                      union.district_en || union.district
                    }.`
                  : `${union.upazila}, ${union.district}।`}
              </div>
            </div>

            {/* Middle Signatory (Administrative Officer) */}
            <div className="signatory-box text-center">
              <div className="sign-space h-[22px]" />
              <div className="sign-name text-[12px] font-bold text-black leading-tight">
                {isEn
                  ? written(
                      data.middleSignatoryNameEn,
                      data.middleSignatoryNameBn || "সৈয়দ মেহেদী মাসুদ",
                    )
                  : data.middleSignatoryNameBn || "সৈয়দ মেহেদী মাসুদ"}
              </div>
              <div className="sign-role-sub text-[11px] font-semibold text-black leading-tight mt-0.5">
                {isEn
                  ? data.middleSignatoryRoleEn || "Administrative Officer"
                  : data.middleSignatoryRoleBn || "প্রশাসনিক কর্মকর্তা"}
              </div>
              <div className="sign-office text-[11px] text-black leading-tight">
                {isEn ? union.up_name_en || union.up_name : union.up_name}
              </div>
              <div className="sign-location text-[11px] text-black leading-tight">
                {isEn
                  ? `${union.upazila_en || union.upazila}, ${
                      union.district_en || union.district
                    }.`
                  : `${union.upazila}, ${union.district}।`}
              </div>
            </div>

            {/* Right Signatory (Chairman) */}
            <div className="signatory-box text-center">
              <div className="sign-space h-[22px]" />
              <div className="sign-name text-[12px] font-bold text-black leading-tight">
                {isEn
                  ? written(signatory.signatory_name_en, signatory.signatory_name)
                  : signatory.signatory_name}
              </div>
              <div className="sign-role-sub text-[11px] font-semibold text-black leading-tight mt-0.5">
                {isEn
                  ? signatory.signatory_role_en || signatory.signatory_role
                  : signatory.signatory_role}
              </div>
              <div className="sign-office text-[11px] text-black leading-tight">
                {isEn ? union.up_name_en || union.up_name : union.up_name}
              </div>
              <div className="sign-location text-[11px] text-black leading-tight">
                {isEn
                  ? `${union.upazila_en || union.upazila}, ${
                      union.district_en || union.district
                    }.`
                  : `${union.upazila}, ${union.district}।`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
