"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { CertificateData } from "@/types/certificate";

interface FamilySheetProps {
  data: CertificateData;
  lang?: "bn" | "en";
}

export function FamilySheet({ data, lang = "bn" }: FamilySheetProps) {
  const { union, meta, applicant, signatory, heirs = [] } = data;
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

  const sonCount = heirs.filter((h) => (h.relation_en || h.relation).toLowerCase().includes("son") || h.relation.includes("পুত্র")).length;
  const daughterCount = heirs.filter((h) => (h.relation_en || h.relation).toLowerCase().includes("daughter") || h.relation.includes("কন্যা")).length;
  const spouseCount = heirs.filter((h) => (h.relation_en || h.relation).toLowerCase().includes("spouse") || (h.relation_en || h.relation).toLowerCase().includes("wife") || (h.relation_en || h.relation).toLowerCase().includes("husband") || h.relation.includes("স্ত্রী") || h.relation.includes("স্বামী")).length;
  const fatherCount = heirs.filter((h) => (h.relation_en || h.relation).toLowerCase().includes("father") || h.relation.includes("পিতা")).length;
  const motherCount = heirs.filter((h) => (h.relation_en || h.relation).toLowerCase().includes("mother") || h.relation.includes("মাতা")).length;
  const brotherCount = heirs.filter((h) => (h.relation_en || h.relation).toLowerCase().includes("brother") || h.relation.includes("ভাই")).length;
  const sisterCount = heirs.filter((h) => (h.relation_en || h.relation).toLowerCase().includes("sister") || h.relation.includes("বোন")).length;
  const selfCount = heirs.filter((h) => (h.relation_en || h.relation).toLowerCase().includes("self") || h.relation.includes("নিজ")).length;
  const totalCount = heirs.length;

  return (
    <div
      id="certificateSheet"
      className={`certificate-sheet certificate-sheet-portrait w-[210mm] h-[297mm] min-w-[210mm] min-h-[297mm] bg-white shadow-2xl relative overflow-hidden box-border text-[#121212] px-6 py-4 flex flex-col justify-between print:w-[210mm] print:h-[297mm] print:min-w-[210mm] print:min-h-[297mm] print:max-w-[210mm] print:max-h-[297mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid ${
        isEn ? "font-serif" : "font-solaiman"
      }`}
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
          {isEn ? (meta.cert_title_en || "Family Certificate") : (meta.cert_title || "পারিবারিক সনদ")}
        </div>
        <div className="w-[150px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Gradient Border */}
      <div className="flex-1 relative p-3.5 my-3 mx-2 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-600 shadow-md flex flex-col">
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
                alt="Government Seal"
                width={72}
                height={72}
                className="gov-monogram w-full h-full drop-shadow-sm"
                priority
              />
            </div>

            <div className="header-titles flex flex-col items-center justify-center">
              <div className="gov-sub-title text-base text-black tracking-wide mb-[1px]">
                {isEn ? "Government of the People's Republic of Bangladesh" : "গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার"}
              </div>
              <h1 className={`${isEn ? "text-3xl" : "text-4xl"} up-main-title font-bold text-header-red leading-snug m-0 tracking-wide`}>
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </h1>
              <div className="up-sub-address text-xl font-semibold text-black mt-[1px]">
                {isEn ? (
                  <>Upazila: <span>{union.upazila_en || union.upazila}</span>, District: <span>{union.district_en || union.district}</span>.</>
                ) : (
                  <>উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।</>
                )}
              </div>
              <div className={`up-web-url text-sm font-semibold text-black mt-[1px] ${isEn ? "font-serif" : "font-siliguri"}`}>
                {union.website}
              </div>
            </div>

            {/* Top Right Logo AND Photo Image side by side */}
            <div className="flex items-center justify-end">
              <div className="owner-photo-box w-[68px] h-[78px] border border-slate-400 bg-white p-0.5 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src={applicant.photo_url || "/assets/image/person.webp"}
                  alt="Applicant Photo"
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
            <div className="meta-item meta-serial text-base text-[#121212]">
              <span className="lbl mr-1.5">{isEn ? "Serial No:" : "সনদ নং:"}</span>
              <span className={`val font-bold tracking-wide ${isEn ? "font-serif" : "font-siliguri"}`}>
                {isEn ? (meta.serial_no_en || meta.serial_no) : meta.serial_no}
              </span>
            </div>

            <div className="meta-badge-container flex justify-center flex-1">
              <div className="cert-badge bg-red-900 text-white text-xl font-semibold px-9 py-1 rounded-[4px] tracking-wide inline-block shadow-md">
                {isEn ? (meta.cert_title_en || "Family Certificate") : (meta.cert_title || "পারিবারিক সনদ")}
              </div>
            </div>

            <div className="meta-item meta-date text-base text-[#121212]">
              <span className="lbl mr-1.5">{isEn ? "Date:" : "তারিখ:"}</span>
              <span className={`val font-bold tracking-wide ${isEn ? "font-serif" : "font-siliguri"}`}>
                {isEn ? (meta.issue_date_en || meta.issue_date) : meta.issue_date}
              </span>
            </div>
          </div>

          {/* Certificate Content Body */}
          <div className="cert-content-body mt-3 px-1 flex-1 flex flex-col justify-start">
            {isEn ? (
              <p className="cert-paragraph text-base leading-[2.1] text-black text-justify mb-2 font-serif">
                This family certificate is hereby issued stating that{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.person_name_en || applicant.person_name}
                </span>{" "}
                (ID No:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.nid_no_en || applicant.nid_no}
                </span>
                ), Father:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.father_name_en || applicant.father_name}
                </span>
                , Mother:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.mother_name_en || applicant.mother_name}
                </span>
                , Village:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.village_en || applicant.village}
                </span>
                , Ward:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.ward_no_en || applicant.ward_no}
                </span>
                , House No:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.house_no_en || applicant.house_no}
                </span>
                , Union:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {union.up_name_en || union.up_name}
                </span>
                , Upazila:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {union.upazila_en || union.upazila}
                </span>
                , District:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {union.district_en || union.district}
                </span>
                , has the following members in his/her family with their relationships stated below.
              </p>
            ) : (
              <p className="cert-paragraph text-base leading-[2.1] text-black text-justify mb-2 font-solaiman">
                এই মর্মে পারিবারিক সনদ দেওয়া হইতেছে যে,{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.person_name}
                </span>{" "}
                (আইডি নং:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.nid_no}
                </span>
                ), পিতা:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.father_name}
                </span>
                , মাতাঃ{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.mother_name}
                </span>
                , গ্রাম:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.village}
                </span>
                , ওয়ার্ডঃ{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.ward_no}
                </span>
                , বাসা নং{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.house_no}
                </span>
                , ইউনিয়ন:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {union.up_name}
                </span>
                , উপজেলা:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {union.upazila}
                </span>
                , জেলা:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {union.district}
                </span>
                , উল্লেখিত ব্যক্তির পরিবারে নিম্নলিখিত সদস্য রহিয়াছে যাদের সম্পর্ক উল্লেখ করা হলো।
              </p>
            )}

            {/* Family Table (5 columns) */}
            <div className="w-full my-1 overflow-hidden">
              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead>
                  <tr className="bg-gray-100 font-bold text-center">
                    <th className="border border-gray-400 px-2 py-1.5 w-20">{isEn ? "SL No." : "ক্রমিক নং"}</th>
                    <th className="border border-gray-400 px-3 py-1.5 text-center">{isEn ? "Member Name" : "সদস্য গণের নাম"}</th>
                    <th className="border border-gray-400 px-3 py-1.5 w-28 text-center">{isEn ? "Date of Birth" : "জন্ম তারিখ"}</th>
                    <th className="border border-gray-400 px-2 py-1.5 w-20 text-center">{isEn ? "Age" : "বয়স"}</th>
                    <th className="border border-gray-400 px-3 py-1.5 w-24 text-center">{isEn ? "Relationship" : "সম্পর্ক"}</th>
                  </tr>
                </thead>
                <tbody>
                  {heirs.map((item, idx) => (
                    <tr key={item.id || idx} className="text-center">
                      <td className="border border-gray-400 px-2 py-1">{isEn ? idx + 1 : toBnNo(idx + 1)}</td>
                      <td className="border border-gray-400 px-3 py-1 text-left">{isEn ? (item.name_en || item.name) : item.name}</td>
                      <td className="border border-gray-400 px-3 py-1">{isEn ? (item.dob_en || item.dob || item.age_or_dob_en || item.age_or_dob) : (item.dob || item.age_or_dob)}</td>
                      <td className="border border-gray-400 px-2 py-1">{isEn ? (item.age_or_dob_en || item.age_or_dob) : item.age_or_dob}</td>
                      <td className="border border-gray-400 px-3 py-1">{isEn ? (item.relation_en || item.relation) : item.relation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Family Table Bottom Summary Note */}
            {isEn ? (
              <p className="cert-summary text-base leading-relaxed text-black mt-2.5 text-justify font-serif">
                The aforementioned person has <span className="font-semibold">{sonCount} Son(s), {daughterCount} Daughter(s), {spouseCount} Spouse(s), {fatherCount} Father, {motherCount} Mother, {brotherCount} Brother(s), {sisterCount} Sister(s), and Self, making a total of {totalCount} family member(s)</span>. Aside from them, there are no other family members. Issued upon recommendation of the Ward No. {applicant.ward_no_en || applicant.ward_no} UP Member.
              </p>
            ) : (
              <p className="cert-summary text-base leading-relaxed text-black mt-2.5 text-justify font-solaiman">
                উল্লেখিত ব্যক্তির <span className="font-semibold">{toBnNo(sonCount)} জন পুত্র,{toBnNo(daughterCount)} জন কন্যা,{toBnNo(spouseCount)} জন স্বামী/স্ত্রী, {toBnNo(fatherCount)} জন পিতা,{toBnNo(motherCount)} জন মাতা,{toBnNo(brotherCount)} জন ভাই,{toBnNo(sisterCount)} জন বোন, {toBnNo(selfCount)} নিজসহ মোট-{toBnNo(totalCount)} ({toBnWords(totalCount)})</span> জন সদস্য আছে, ইহা ব্যতিত তাহার আর কোন পারিবারিক সদস্য নাই, {applicant.ward_no} নং ওয়ার্ড ইউপি সদস্য/সদস্যা এর সুপারিশের ভিত্তিতে প্রদান করা হইল।
              </p>
            )}
          </div>

          {/* Footer Signatures */}
          <div className="cert-footer-section flex justify-between items-end mt-auto p-[4px]">
            <div className="qr-code-box flex flex-col items-start">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 shadow-sm">
                <QRCodeSVG value={signatory.qr_url || "https://www.lgoms.org"} size={78} level="M" />
              </div>
              <div className={`trn-text text-sm text-black mt-[3px] ${isEn ? "font-serif" : "font-siliguri"}`}>
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            <div className="signatory-box text-center min-w-[200px] pb-[2px]">
              <div className="sign-space h-[32px]" />
              <div className="sign-name text-base font-semibold text-black leading-tight">
                {isEn ? (signatory.signatory_name_en || signatory.signatory_name) : signatory.signatory_name}
              </div>
              <div className="sign-designation text-base text-black leading-tight">
                {isEn ? (signatory.signatory_role_en || signatory.signatory_role) : signatory.signatory_role}
              </div>
              <div className="sign-office text-base text-black leading-tight">
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </div>
              <div className="sign-location text-base text-black leading-tight">
                {isEn ? <>{union.upazila_en || union.upazila}, {union.district_en || union.district}.</> : <>{union.upazila}, {union.district}।</>}
              </div>
            </div>
          </div>

          {/* Bottom Tagline Ribbon */}
          <div className="mt-3 text-center text-base text-black">
            {isEn
              ? "Get quick justice at low cost in Village Court * Register birth & death on time."
              : "অল্প সময়ে সল্প খরচে, সঠিক বিচার পেতে, চল যাই গ্রামআদালতে* সময়মত জন্ম ও মৃত্যু নিবন্ধন করুন।"}
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
