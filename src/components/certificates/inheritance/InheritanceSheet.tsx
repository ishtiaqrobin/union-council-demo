"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { CertificateData } from "@/types/certificate";

interface InheritanceSheetProps {
  data: CertificateData;
}

export function InheritanceSheet({ data }: InheritanceSheetProps) {
  const { union, meta, applicant, signatory, heirs = [] } = data;
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

  const toBnNo = (num: number) => {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(num).padStart(2, "0").split("").map((d) => bnDigits[parseInt(d)] || d).join("");
  };

  const toBnWords = (num: number) => {
    const wordsMap: Record<number, string> = {
      1: "এক",
      2: "দুই",
      3: "তিন",
      4: "চার",
      5: "পাঁচ",
      6: "ছয়",
      7: "সাত",
      8: "আট",
      9: "নয়",
      10: "দশ",
    };
    return wordsMap[num] || String(num);
  };

  const sonCount = heirs.filter((h) => h.relation.includes("পুত্র")).length;
  const daughterCount = heirs.filter((h) => h.relation.includes("কন্যা")).length;
  const spouseCount = heirs.filter((h) => h.relation.includes("স্ত্রী") || h.relation.includes("স্বামী")).length;
  const relativesCount = heirs.filter((h) => !h.relation.includes("পুত্র") && !h.relation.includes("কন্যা") && !h.relation.includes("স্ত্রী") && !h.relation.includes("স্বামী")).length;
  const totalCount = heirs.length;

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
        <div className="font-bold text-slate-900 text-[13px] font-solaiman">
          {meta.cert_title || "উত্তরাধিকার সনদ"}
        </div>
        <div className="w-[150px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Gradient Border */}
      <div className="flex-1 relative p-3.5 my-2 mx-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-600 shadow-md flex flex-col">
        <div className="certificate-inner-frame w-full h-full bg-white pt-4 px-6 pb-3 relative flex flex-col justify-between z-10 flex-1 border border-amber-200">

          {/* Background Watermark */}
          <div className="watermark-container absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] pointer-events-none -z-10 flex justify-center items-center">
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

            {/* Center Header Titles */}
            <div className="header-titles flex flex-col items-center justify-center">
              <div className="gov-sub-title text-[13.5px] font-semibold text-gray-800 tracking-wide mb-[1px]">
                গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার
              </div>
              <h1 className="up-main-title text-[28px] font-bold text-header-red leading-snug m-0 tracking-wide">
                {union.up_name}
              </h1>
              <div className="up-sub-address text-[13.5px] font-bold text-slate-900 mt-[1px]">
                উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।
              </div>
              <div className="up-web-url font-siliguri text-[12.5px] font-bold text-slate-900 mt-[1px]">
                {union.website}
              </div>
            </div>

            {/* Top Right Logo AND Photo Image side by side */}
            <div className="flex items-center justify-end">
              <div className="owner-photo-box w-[68px] h-[78px] border border-slate-400 bg-white p-0.5 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src={applicant.photo_url || "/assets/image/person.webp"}
                  alt="আবেদনকারীর ছবি"
                  width={64}
                  height={74}
                  className="w-full h-full object-cover text-xs"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Metadata Ribbon */}
          <div className="cert-meta-ribbon flex justify-between items-center mt-[10px] px-1">
            <div className="meta-item meta-serial text-[14px] text-[#121212]">
              <span className="lbl font-semibold mr-1.5">ক্রমিক নং:</span>
              <span className="val font-bold font-siliguri tracking-wide">{meta.serial_no}</span>
            </div>

            <div className="meta-badge-container flex justify-center flex-1">
              <div className="cert-badge bg-blue-600 text-white text-[15.5px] font-bold px-[32px] py-[3.5px] rounded-sm tracking-wide inline-block shadow-sm">
                {meta.cert_title}
              </div>
            </div>

            <div className="meta-item meta-date text-[14px] text-[#121212]">
              <span className="lbl font-semibold mr-1.5">তারিখ:</span>
              <span className="val font-bold font-siliguri tracking-wide">{meta.issue_date}</span>
            </div>
          </div>

          {/* Certificate Content Body */}
          <div className="cert-content-body mt-3 px-1 flex-1 flex flex-col justify-start">
            <p className="cert-paragraph text-[14px] leading-[2.1] text-gray-900 text-justify mb-2">
              এই মর্মে সনদ দেওয়া যাইতেছে যে,{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {applicant.person_name}
              </span>
              (আইডি নং-
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {applicant.nid_no}
              </span>
              ) , পিতা:{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {applicant.father_name}
              </span>
              ,মাাতাঃ{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {applicant.mother_name}
              </span>
              , গ্রাম:{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {applicant.village}
              </span>
              ,ওয়ার্ডঃ{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {applicant.ward_no}
              </span>
              ,বাসা নং{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {applicant.house_no}
              </span>
              , ইউনিয়ন:{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {union.up_name}
              </span>
              , উপজেলা:{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {union.upazila}
              </span>
              , জেলা:{" "}
              <span className="font-bold border-b border-dotted border-gray-700 pb-[1px]">
                {union.district}
              </span>
              , তাহার নিম্নলিখিত রহিয়াছে।
            </p>

            {/* Heirs Table Top Note */}
            <div className="text-[13px] font-bold text-gray-900 mb-1 border-b border-dashed border-gray-400 pb-1">
              মন্তব্যঃ গ্রামঃ <span>{applicant.village}</span>, ডাকঘরঃ <span>{applicant.post_office}</span>, উপজেলাঃ <span>{applicant.person_upazila || union.upazila}</span>, জেলাঃ <span>{applicant.person_district || union.district}</span>।
            </div>

            {/* Heirs Table (3 columns: ক্রমিক নম্বর, গনের নাম, সম্পর্ক) */}
            <div className="w-full my-1 overflow-hidden">
              <table className="w-full border-collapse border border-gray-400 text-[13.5px]">
                <thead>
                  <tr className="bg-gray-100 font-bold text-center">
                    <th className="border border-gray-400 px-2 py-1.5 w-24">ক্রমিক নম্বর</th>
                    <th className="border border-gray-400 px-3 py-1.5 text-center">গনের নাম</th>
                    <th className="border border-gray-400 px-3 py-1.5 w-36 text-center">সম্পর্ক</th>
                  </tr>
                </thead>
                <tbody>
                  {heirs.map((item, idx) => (
                    <tr key={item.id || idx} className="text-center">
                      <td className="border border-gray-400 px-2 py-1 font-bold">{toBnNo(idx + 1)}</td>
                      <td className="border border-gray-400 px-3 py-1 text-left font-bold">{item.name}</td>
                      <td className="border border-gray-400 px-3 py-1 font-semibold">{item.relation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Heirs Table Bottom Summary Note */}
            <p className="cert-summary text-[13.5px] leading-relaxed text-gray-900 mt-2.5 text-justify font-solaiman">
              উক্ত ব্যক্তির {sonCount > 0 ? `${toBnNo(sonCount)} জন পুত্র, ` : "জন পুত্র, "}{daughterCount > 0 ? `${toBnNo(daughterCount)} জন কন্যা,` : "জন কন্যা,"}{spouseCount > 0 ? "স্বামী/স্ত্রী, " : "স্বামী/স্ত্রী, "}{relativesCount > 0 ? `${toBnNo(relativesCount)} জন নিকট আত্মীয়সহ ` : "জন নিকট আত্মীয়সহ "}মোট-({toBnNo(totalCount)}) ({toBnWords(totalCount)}) জন আছে, ইহা ব্যতিত তাহার আর কোন নাই, {applicant.ward_no} নং ওয়ার্ড ইউপি সদস্য/সদস্যা এর সুপারিশের ভিত্তিতে প্রদান করা হইল।
            </p>
          </div>

          {/* Footer Signatures */}
          <div className="cert-footer-section flex justify-between items-end mt-auto p-[4px]">
            <div className="qr-code-box flex flex-col items-start">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 shadow-sm">
                <QRCodeSVG value={signatory.qr_url || "https://www.lgoms.org"} size={78} level="M" />
              </div>
              <div className="trn-text font-siliguri text-[13px] font-bold text-gray-900 mt-[3px]">
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            <div className="signatory-box text-center min-w-[200px] pb-[2px]">
              <div className="sign-space h-[32px]" />
              <div className="sign-name text-[14.5px] font-bold text-black leading-tight">{signatory.signatory_name}</div>
              <div className="sign-designation text-[12.5px] font-semibold text-gray-800 leading-tight">{signatory.signatory_role}</div>
              <div className="sign-office text-[12.5px] font-semibold text-gray-800 leading-tight">{union.up_name}</div>
              <div className="sign-location text-[12.5px] font-semibold text-gray-800 leading-tight">{union.upazila}, {union.district}।</div>
            </div>
          </div>

          {/* Bottom Tagline Ribbon (Under Chairman Signatory Info) */}
          <div className="mt-2 text-center text-[12px] font-bold text-gray-900 bg-gray-50/90 py-0.5 border border-gray-200 rounded">
            অল্প সময়ে সল্প খরচে, সঠিক বিচার পেতে, চল যাই গ্রামআদালতে* সময়মত জন্ম ও মৃত্যু নিবন্ধন করুন।
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
