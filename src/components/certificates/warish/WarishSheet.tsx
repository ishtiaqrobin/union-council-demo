"use client";

import React from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { CertificateData } from "@/types/certificate";

interface WarishSheetProps {
  data: CertificateData;
}

export function WarishSheet({ data }: WarishSheetProps) {
  const { union, meta, applicant, signatory, heirs } = data;

  return (
    <div 
      id="certificateSheet"
      className="certificate-sheet w-[297mm] h-[210mm] min-w-[297mm] min-h-[210mm] bg-white border-[12px] border-primary-blue shadow-2xl relative overflow-hidden box-border font-solaiman text-[#121212] select-none print:w-[297mm] print:h-[210mm] print:min-w-[297mm] print:min-h-[210mm] print:max-w-[297mm] print:max-h-[210mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid"
    >
      <div className="certificate-inner-frame w-full h-full pt-5 px-[34px] pb-4 relative flex flex-col justify-between z-10 print:pt-5 print:px-[34px] print:pb-4">
        <div className="watermark-container absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none -z-10 flex justify-center items-center">
          <Image
            src="/assets/watermark/watermark.webp"
            alt="Watermark"
            width={380}
            height={380}
            className="watermark-image max-w-full max-h-full object-contain opacity-[0.16] pointer-events-none"
            priority
          />
        </div>

        <div className="cert-header grid grid-cols-[80px_1fr_80px] items-center text-center mt-1 relative">
          <div className="gov-seal-left w-[76px] h-[76px] flex items-center justify-center">
            <Image
              src="/assets/logo/logo.webp"
              alt="বাংলাদেশ সরকার সিল"
              width={76}
              height={76}
              className="gov-monogram w-full h-full drop-shadow-sm"
              priority
            />
          </div>

          <div className="header-titles flex flex-col items-center justify-center">
            <div className="gov-sub-title text-[14px] font-semibold text-gray-800 tracking-wide mb-[1px]">
              গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার
            </div>
            <h1 className="up-main-title text-[30px] font-black text-header-red leading-snug m-0 tracking-wide drop-shadow-[2px_2px_3px_rgba(0,0,0,0.35)]">
              {union.up_name}
            </h1>
            <div className="up-sub-address text-[14px] font-bold text-slate-900 mt-[1px]">
              উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।
            </div>
            <div className="up-web-url font-siliguri text-[13px] font-bold text-slate-900 mt-[1px]">
              {union.website}
            </div>
          </div>

          <div className="header-right-spacer w-[80px] h-[80px]" />
        </div>

        <div className="cert-meta-ribbon flex justify-between items-center mt-[12px] px-1">
          <div className="meta-item meta-serial text-[14.5px] text-[#121212]">
            <span className="lbl font-semibold mr-1.5">ক্রমিক নং:</span>
            <span className="val font-bold font-siliguri tracking-wide">{meta.serial_no}</span>
          </div>

          <div className="meta-badge-container flex justify-center flex-1">
            <div className="cert-badge bg-indigo-600 text-white text-[16px] font-bold px-[36px] py-[4px] rounded-md tracking-wide inline-block shadow-sm">
              {meta.cert_title}
            </div>
          </div>

          <div className="meta-item meta-date text-[14.5px] text-[#121212]">
            <span className="lbl font-semibold mr-1.5">তারিখ:</span>
            <span className="val font-bold font-siliguri tracking-wide">{meta.issue_date}</span>
          </div>
        </div>

        <div className="cert-content-body mt-4 px-2.5 flex-1 flex flex-col justify-start">
          <p className="cert-paragraph text-[14.5px] leading-[2.1] text-gray-900 text-justify mb-2">
            এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
            <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
              {applicant.person_name}
            </span>{" "}
            (এনআইডি/জন্ম সনদ: {applicant.nid_no}), পিতা: {applicant.father_name}, মাতা: {applicant.mother_name}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no}, উপজেলা: {applicant.person_upazila}, জেলা: {applicant.person_district}। তাহার ইন্তেকালের সময় নিম্নোক্ত ওয়ারিশগণকে রাখিয়া যান:
          </p>

          {heirs && heirs.length > 0 && (
            <div className="w-full my-2">
              <table className="w-full border-collapse border border-gray-400 text-[13.5px]">
                <thead>
                  <tr className="bg-gray-100 font-bold text-center">
                    <th className="border border-gray-400 px-2 py-1 w-12">ক্র: নং</th>
                    <th className="border border-gray-400 px-3 py-1">ওয়ারিশের নাম</th>
                    <th className="border border-gray-400 px-3 py-1 w-24">সম্পর্ক</th>
                    <th className="border border-gray-400 px-3 py-1 w-24">বয়স</th>
                    <th className="border border-gray-400 px-3 py-1">এনআইডি/জন্ম সনদ নং</th>
                    <th className="border border-gray-400 px-2 py-1 w-20">মন্তব্য</th>
                  </tr>
                </thead>
                <tbody>
                  {heirs.map((item, idx) => (
                    <tr key={item.id || idx} className="text-center">
                      <td className="border border-gray-400 px-2 py-1">{idx + 1}</td>
                      <td className="border border-gray-400 px-3 py-1 font-bold text-left">{item.name}</td>
                      <td className="border border-gray-400 px-3 py-1">{item.relation}</td>
                      <td className="border border-gray-400 px-3 py-1">{item.age_or_dob}</td>
                      <td className="border border-gray-400 px-3 py-1">{item.nid_or_bc}</td>
                      <td className="border border-gray-400 px-2 py-1">{item.comments || "জীবিত"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="cert-closing text-[14.5px] font-bold text-gray-900 mt-2 pl-[20px]">
            আমি ওয়ারিশগণের সুস্বাস্থ্য ও সর্বাঙ্গীন মঙ্গল কামনা করি।
          </p>
        </div>

        <div className="cert-footer-section flex justify-between items-end mt-auto p-[6px]">
          <div className="qr-code-box flex flex-col items-start">
            <div className="qr-canvas-holder p-1 bg-white border border-gray-300 rounded shadow-sm">
              <QRCodeSVG value={signatory.qr_url || "https://www.lgoms.org"} size={82} level="M" />
            </div>
            <div className="trn-text font-siliguri text-[13.5px] font-bold text-gray-900 mt-[4px]">
              Trn- <span>{signatory.trn_no}</span>
            </div>
          </div>

          <div className="signatory-box text-center min-w-[210px] pb-[2px]">
            <div className="sign-space h-[36px]" />
            <div className="sign-name text-[15px] font-bold text-black leading-tight">{signatory.signatory_name}</div>
            <div className="sign-role-sub text-[13px] font-semibold text-gray-800 leading-tight">অনুমোদনকারী/প্রদানকারী</div>
            <div className="sign-designation text-[13px] font-semibold text-gray-800 leading-tight">{signatory.signatory_role}</div>
            <div className="sign-office text-[13px] font-semibold text-gray-800 leading-tight">{union.up_name}</div>
            <div className="sign-location text-[13px] font-semibold text-gray-800 leading-tight">{union.upazila}, {union.district}।</div>
          </div>
        </div>
      </div>
    </div>
  );
}
