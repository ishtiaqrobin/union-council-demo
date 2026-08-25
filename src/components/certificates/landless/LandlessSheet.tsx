"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { CertificateData } from "@/types/certificate";

interface LandlessSheetProps {
  data: CertificateData;
  lang?: "bn" | "en";
}

export function LandlessSheet({ data, lang = "bn" }: LandlessSheetProps) {
  const { union, meta, applicant, signatory, landDetailsBn, landDetailsEn } = data;
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

  return (
    <div
      id="certificateSheet"
      className={`certificate-sheet certificate-sheet-landscape w-[297mm] h-[210mm] min-w-[297mm] min-h-[210mm] bg-white shadow-2xl relative overflow-hidden box-border text-[#121212] px-8 py-4 flex flex-col justify-between print:w-[297mm] print:h-[210mm] print:min-w-[297mm] print:min-h-[210mm] print:max-w-[297mm] print:max-h-[210mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid ${
        isEn ? "font-sans" : "font-solaiman"
      }`}
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
      <div className="flex justify-between items-center text-xs text-black font-sans px-1 pb-1">
        <div className="w-[180px] text-left font-normal text-black">
          {printDateTime}
        </div>
        <div className={`text-black text-sm ${isEn ? "font-sans" : "font-solaiman"}`}>
          {isEn ? (meta.cert_title_en || "Landless Certificate") : (meta.cert_title || "ভূমিহীন প্রত্যয়ন")}
        </div>
        <div className="w-[180px]" />
      </div>

      {/* Main Certificate Box with Outer Padding and Thick Gradient Border */}
      <div className="flex-1 relative p-4 my-8 mx-12 bg-gradient-to-br from-blue-500 via-indigo-400 to-blue-500 shadow-md">
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
                alt="Government Seal"
                width={72}
                height={72}
                className="gov-monogram w-full h-full drop-shadow-sm"
                priority
              />
            </div>

            <div className="header-titles flex flex-col items-center justify-center">
              <div className={`text-base text-black tracking-wide mb-[1px] `}>
                {isEn ? "Government of the People's Republic of Bangladesh" : "গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার"}
              </div>
              <h1 className="up-main-title text-4xl font-bold text-header-red leading-snug m-0 tracking-wide">
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </h1>
              <div className="up-sub-address text-lg sm:text-xl font-semibold text-black mt-[1px]">
                {isEn ? (
                  <>Upazila: <span>{union.upazila_en || union.upazila}</span>, District: <span>{union.district_en || union.district}</span>.</>
                ) : (
                  <>উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।</>
                )}
              </div>
              <div className={`up-web-url text-sm font-semibold text-black mt-[1px] ${isEn ? "font-sans" : "font-siliguri"}`}>
                {union.website}
              </div>
            </div>

            <div className="header-right-spacer w-[76px] h-[76px]" />
          </div>

          {/* Metadata Ribbon */}
          <div className="cert-meta-ribbon flex justify-between items-center mt-[10px] px-1">
            <div className="meta-item meta-serial text-base text-[#121212]">
              <span className="lbl mr-1.5">{isEn ? "Serial No:" : "ক্রমিক নং:"}</span>
              <span className={`val font-bold tracking-wide ${isEn ? "font-sans" : "font-siliguri"}`}>
                {isEn ? (meta.serial_no_en || meta.serial_no) : meta.serial_no}
              </span>
            </div>

            <div className="meta-badge-container flex justify-center flex-1">
              <div className="cert-badge bg-cyan-700 text-white text-xl font-semibold px-9 py-1 rounded-[4px] tracking-wide inline-block shadow-sm">
                {isEn ? (meta.cert_title_en || "Landless Certificate") : meta.cert_title}
              </div>
            </div>

            <div className="meta-item meta-date text-base text-[#121212]">
              <span className="lbl mr-1.5">{isEn ? "Date:" : "তারিখ:"}</span>
              <span className={`val font-bold tracking-wide ${isEn ? "font-sans" : "font-siliguri"}`}>
                {isEn ? (meta.issue_date_en || meta.issue_date) : meta.issue_date}
              </span>
            </div>
          </div>

          {/* Certificate Content Body */}
          <div className="cert-content-body mt-6 px-2 flex-1 flex flex-col justify-start">
            {isEn ? (
              <p className="cert-paragraph text-base leading-[2.2] text-black text-justify font-sans">
                This is to certify that,{" "}
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
                , House No:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.house_no_en || applicant.house_no}
                </span>
                , Ward No:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.ward_no_en || applicant.ward_no}
                </span>
                , Post Office:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.post_office_en || applicant.post_office}
                </span>
                , Upazila:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.person_upazila_en || applicant.person_upazila || union.upazila_en || union.upazila}
                </span>
                , District:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.person_district_en || applicant.person_district || union.district_en || union.district}
                </span>
                . Verified by the Village Police and UP Member, he/she is a permanent resident of Ward No.{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.ward_no_en || applicant.ward_no}
                </span>
                , Village:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.village_en || applicant.village}
                </span>{" "}
                of this Union Parishad. He/She is not involved in any anti-state or unlawful activities.{" "}
                {landDetailsEn || landDetailsBn || "To the best of my knowledge, he/she does not own any agricultural or non-agricultural land. He/She is completely landless."}
              </p>
            ) : (
              <p className="cert-paragraph text-base leading-[2.2] text-black text-justify font-solaiman">
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
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
                , মাতা:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.mother_name}
                </span>
                {applicant.spouse_name ? (
                  <>
                    , স্বামী/স্ত্রীর নাম:{" "}
                    <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                      {applicant.spouse_name}
                    </span>
                  </>
                ) : null}
                , গ্রাম:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.village}
                </span>
                , বাসা নং:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.house_no}
                </span>
                , ওয়ার্ড নং:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.ward_no}
                </span>
                , ডাকঘর:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.post_office}
                </span>
                , উপজেলা:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.person_upazila}
                </span>
                , জেলা:{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.person_district}
                </span>{" "}
                এর তথ্য গ্রামপুলিশ ও মেম্বার দ্বারা যাচাই বাছাই করা হয়। যাচাই করে জানা যায় যে, তিনি অত্র ইউনিয়নের{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.ward_no}
                </span>{" "}
                নং ওয়ার্ডের{" "}
                <span className="font-semibold border-b border-dotted border-black pb-[1px]">
                  {applicant.village}
                </span>{" "}
                গ্রামের স্থায়ী বাসিন্দা। আরো জানা যায়, তিনি বাংলাদেশের আইন-শৃঙখলা ও রাষ্ট্র বিরোধী কর্মকান্ডের সহিত জড়িত নহে। তিনি এ ইউনিয়নের স্থায়ী বাসিন্দা।{" "}
                {landDetailsBn || "আমার জানামতে তার কোন জায়গা জমি নাই। তিনি একজন ভূমিহীন।"}
              </p>
            )}

            <p className={`cert-closing text-base font-semibold text-black mt-3 pl-[16px] ${isEn ? "font-sans" : "font-solaiman"}`}>
              {isEn
                ? "I wish him/her all success and prosperity in life."
                : "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।"}
            </p>
          </div>

          {/* Footer Signatures */}
          <div className="cert-footer-section flex justify-between items-end mt-auto p-[4px]">
            <div className="qr-code-box flex flex-col items-start">
              <div className="qr-canvas-holder p-1 bg-white border border-gray-300 shadow-sm">
                <QRCodeSVG value={signatory.qr_url || "https://www.lgoms.org"} size={78} level="M" />
              </div>
              <div className={`trn-text text-sm text-black mt-[3px] ${isEn ? "font-sans" : "font-siliguri"}`}>
                Trn- <span>{signatory.trn_no}</span>
              </div>
            </div>

            <div className="signatory-box text-center min-w-[200px] pb-[2px]">
              <div className="sign-space h-[32px]" />
              <div className="sign-name text-base font-semibold text-black leading-tight">
                {isEn ? (signatory.signatory_name_en || signatory.signatory_name) : signatory.signatory_name}
              </div>
              <div className="sign-role-sub text-base text-black leading-tight">
                {isEn ? "Authorized Signatory" : "অনুমোদনকারী/প্রদানকারী"}
              </div>
              <div className="sign-designation text-base text-black leading-tight">
                {isEn ? (signatory.signatory_role_en || signatory.signatory_role) : signatory.signatory_role}
              </div>
              <div className="sign-office text-base text-black leading-tight">
                {isEn ? (union.up_name_en || union.up_name) : union.up_name}
              </div>
              <div className="sign-location text-base text-black leading-tight">
                {isEn ? (
                  <>{union.upazila_en || union.upazila}, {union.district_en || union.district}.</>
                ) : (
                  <>{union.upazila}, {union.district}।</>
                )}
              </div>
            </div>
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
