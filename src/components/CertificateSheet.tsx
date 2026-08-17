"use client";

import React from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { CertificateData } from "@/types/certificate";

interface CertificateSheetProps {
  data: CertificateData;
}

export function CertificateSheet({ data }: CertificateSheetProps) {
  const { union, meta, applicant, signatory, heirs, slug } = data;

  return (
    <div
      id="certificateSheet"
      className="certificate-sheet w-[297mm] h-[210mm] min-w-[297mm] min-h-[210mm] bg-white border-[12px] border-primary-blue shadow-2xl relative overflow-hidden box-border font-solaiman text-[#121212] print:w-[297mm] print:h-[210mm] print:min-w-[297mm] print:min-h-[210mm] print:max-w-[297mm] print:max-h-[210mm] print:m-0 print:shadow-none print:absolute print:top-0 print:left-0 print:break-inside-avoid"
    >
      {/* Inner Decorative Frame */}
      <div className="certificate-inner-frame w-full h-full pt-5 px-[34px] pb-4 relative flex flex-col justify-between z-10 print:pt-5 print:px-[34px] print:pb-4">

        {/* Background Watermark */}
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

        {/* Header Section */}
        <div className="cert-header grid grid-cols-[80px_1fr_80px] items-center text-center mt-1 relative">

          {/* Bangladesh Gov Seal (Left) */}
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

          {/* Header Text Center */}
          <div className="header-titles flex flex-col items-center justify-center">
            <div className="gov-sub-title text-[14px] font-semibold text-gray-800 tracking-wide mb-[1px]">
              গণ-প্রজাতন্ত্রী বাংলাদেশ সরকার
            </div>
            <h1 className="up-main-title text-[30px] font-black text-header-red leading-snug m-0 tracking-wide">
              {/* drop-shadow-[2px_2px_3px_rgba(0,0,0,0.35)] */}
              {union.up_name}
            </h1>
            <div className="up-sub-address text-[14px] font-bold text-slate-900 mt-[1px]">
              উপজেলা: <span>{union.upazila}</span>, জেলা: <span>{union.district}</span>।
            </div>
            <div className="up-web-url font-siliguri text-[13px] font-bold text-slate-900 mt-[1px]">
              {union.website}
            </div>
          </div>

          {/* Right Spacer */}
          <div className="header-right-spacer w-[80px] h-[80px]" />
        </div>

        {/* Metadata Ribbon (Serial, Badge, Date) */}
        <div className="cert-meta-ribbon flex justify-between items-center mt-[12px] px-1">
          <div className="meta-item meta-serial text-[14.5px] text-[#121212]">
            <span className="lbl font-semibold mr-1.5">ক্রমিক নং:</span>
            <span className="val font-bold font-siliguri tracking-wide">
              {meta.serial_no}
            </span>
          </div>

          <div className="meta-badge-container flex justify-center flex-1">
            <div className={`cert-badge ${data.badgeColor || 'bg-badge-green'} text-white text-[16px] font-bold px-[36px] py-[4px] rounded-md tracking-wide inline-block shadow-sm`}>
              {meta.cert_title}
            </div>
          </div>

          <div className="meta-item meta-date text-[14.5px] text-[#121212]">
            <span className="lbl font-semibold mr-1.5">তারিখ:</span>
            <span className="val font-bold font-siliguri tracking-wide">
              {meta.issue_date}
            </span>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="cert-content-body mt-4 px-2.5 flex-1 flex flex-col justify-start">

          {/* Unmarried Certificate */}
          {slug === "unmarried" && (
            <p className="cert-paragraph text-[15px] leading-[2.2] text-gray-900 text-justify">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
              <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_name}
              </span>{" "}
              (এনআইডি/জন্ম সনদ:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.nid_no}
              </span>
              ), পিতা:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.father_name}
              </span>
              , মাতা:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.mother_name}
              </span>
              , গ্রাম:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.village}
              </span>
              , বাসা নং:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.house_no}
              </span>
              , ওয়ার্ড নং:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.ward_no}
              </span>
              , ডাকঘর:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.post_office}
              </span>
              , উপজেলা:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_upazila}
              </span>
              , জেলা:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_district}
              </span>{" "}
              কে আমি ব্যক্তিগত ভাবে চিনি ও জানি। তিনি অত্র ইউনিয়নের স্থায়ী বাসিন্দা ও বাংলাদেশের নাগরিক। আমার জানামতে তিনি বিবাহবন্ধনে আবদ্ধ হন নাই।
            </p>
          )}

          {/* Citizenship Certificate */}
          {slug === "citizenship" && (
            <p className="cert-paragraph text-[15px] leading-[2.2] text-gray-900 text-justify">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
              <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_name}
              </span>{" "}
              (জাতীয় পরিচয়পত্র নং:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.nid_no}
              </span>
              ), পিতা:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.father_name}
              </span>
              , মাতা:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.mother_name}
              </span>
              , গ্রাম:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.village}
              </span>
              , বাসা নং:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.house_no}
              </span>
              , ওয়ার্ড নং:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.ward_no}
              </span>
              , ডাকঘর:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.post_office}
              </span>
              , উপজেলা:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_upazila}
              </span>
              , জেলা:{" "}
              <span className="border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_district}
              </span>{" "}
              অত্র ইউনিয়নের স্থায়ী বাসিন্দা। তিনি জন্মসূত্রে গণপ্রজাতন্ত্রী বাংলাদেশের একজন একনিষ্ঠ নাগরিক। তাহার চরিত্র শুভ এবং তিনি রাষ্ট্র বিরোধী কোনো কর্মকাণ্ডে জড়িত নহেন।
            </p>
          )}

          {/* Inheritance / Warish Certificates */}
          {(slug === "inheritance" || slug === "warish") && (
            <div>
              <p className="cert-paragraph text-[14.5px] leading-[2.1] text-gray-900 text-justify mb-2">
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
                <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                  {applicant.person_name}
                </span>{" "}
                (এনআইডি/জন্ম সনদ: {applicant.nid_no}), পিতা: {applicant.father_name}, মাতা: {applicant.mother_name}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no}, উপজেলা: {applicant.person_upazila}, জেলা: {applicant.person_district}। তাহার মৃত্যুর পর নিম্নলিখিত ওয়ারিশ/উত্তরাধিকারীগণকে জীবিত রাখিয়া ইন্তেকাল করিয়াছেন:
              </p>

              {/* Heirs Table */}
              {heirs && heirs.length > 0 && (
                <div className="w-full my-2">
                  <table className="w-full border-collapse border border-gray-400 text-[13.5px]">
                    <thead>
                      <tr className="bg-gray-100 font-bold text-center">
                        <th className="border border-gray-400 px-2 py-1 w-12">ক্র: নং</th>
                        <th className="border border-gray-400 px-3 py-1">ওয়ারিশ/উত্তরাধিকারীর নাম</th>
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
            </div>
          )}

          {/* Family Certificate */}
          {slug === "family" && (
            <div>
              <p className="cert-paragraph text-[14.5px] leading-[2.1] text-gray-900 text-justify mb-2">
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
                <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                  {applicant.person_name}
                </span>{" "}
                (এনআইডি: {applicant.nid_no}), পিতা: {applicant.father_name}, মাতা: {applicant.mother_name}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no}, উপজেলা: {applicant.person_upazila}, জেলা: {applicant.person_district}। তাহার পারিবারিক সদস্য ও কাঠামোর বিবরণ নিম্নে প্রদান করা হইলো:
              </p>

              {heirs && heirs.length > 0 && (
                <div className="w-full my-2">
                  <table className="w-full border-collapse border border-gray-400 text-[13.5px]">
                    <thead>
                      <tr className="bg-gray-100 font-bold text-center">
                        <th className="border border-gray-400 px-2 py-1 w-12">ক্র: নং</th>
                        <th className="border border-gray-400 px-3 py-1">সদস্যের নাম</th>
                        <th className="border border-gray-400 px-3 py-1 w-24">সম্পর্ক</th>
                        <th className="border border-gray-400 px-3 py-1 w-24">বয়স</th>
                        <th className="border border-gray-400 px-3 py-1">এনআইডি/জন্ম সনদ নং</th>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Same Name Certificate */}
          {slug === "same-name" && (
            <p className="cert-paragraph text-[15px] leading-[2.2] text-gray-900 text-justify">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
              <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_name}
              </span>{" "}
              এবং{" "}
              <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                {data.aliasNameBn || "অন্য নাম"}
              </span>{" "}
              (জাতীয় পরিচয়পত্র নং: {applicant.nid_no}), পিতা: {applicant.father_name}, মাতা: {applicant.mother_name}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no}, ডাকঘর: {applicant.post_office}, উপজেলা: {applicant.person_upazila}, জেলা: {applicant.person_district} কে আমি ব্যক্তিগতভাবে চিনি। বিভিন্ন নথিপত্রে উল্লিখিত উপরোক্ত উভয় নাম মূলত একই ব্যক্তির নাম এবং তিনি অত্র ইউনিয়নের একজন স্থায়ী বাসিন্দা।
            </p>
          )}

          {/* Remarriage Certificate */}
          {slug === "remarriage" && (
            <p className="cert-paragraph text-[15px] leading-[2.2] text-gray-900 text-justify">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
              <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_name}
              </span>{" "}
              (এনআইডি: {applicant.nid_no}), পিতা: {applicant.father_name}, মাতা: {applicant.mother_name}, স্বামী: {applicant.spouse_name || "স্বামীর নাম"}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no}, উপজেলা: {applicant.person_upazila}, জেলা: {applicant.person_district}। {data.remarriageReasonBn || "তিনি স্বীয় সম্মতিতে ও পারিবারিকভাবে পুনঃবিবাহ বন্ধনে আবদ্ধ হইয়াছেন।"}
            </p>
          )}

          {/* Trade License */}
          {slug === "trade-license" && (
            <div className="flex flex-col gap-2">
              <p className="cert-paragraph text-[15px] leading-[2.1] text-gray-900 text-justify">
                স্থানীয় সরকার (ইউনিয়ন পরিষদ) আইন ২০০৯ এর আওতায় ব্যবসা, পেশা ও জীবিকা পরিচালনার জন্য{" "}
                <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                  {applicant.person_name}
                </span>{" "}
                (এনআইডি: {applicant.nid_no}), পিতা: {applicant.father_name}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no} কে তাহার প্রতিষ্ঠিত প্রতিষ্ঠান{" "}
                <span className="font-bold text-blue-700 border-b border-dotted border-gray-600 pb-[1px]">
                  {data.businessNameBn || "প্রতিষ্ঠানের নাম"}
                </span>{" "}
                এর অনুকূলে <span className="font-semibold">{data.businessTypeBn || "ব্যবসার ধরন"}</span> পরিচালনার নিমিত্তে নির্ধারিত ফি{" "}
                <span className="font-bold text-emerald-700">{data.licenseFeeBn || "ফি"}</span> আদায়পূর্বক এই পেশা ও জীবিকা লাইসেন্স প্রদান করা হইল।
              </p>
              <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-semibold text-slate-700 text-center">
                {data.customDescriptionBn || "মেয়াদ ৩০-জুন-২০২৭ পর্যন্ত কার্যকর থাকিবে।"}
              </div>
            </div>
          )}

          {/* Testimonial */}
          {slug === "testimonial" && (
            <p className="cert-paragraph text-[15px] leading-[2.2] text-gray-900 text-justify">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
              <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_name}
              </span>{" "}
              (এনআইডি: {applicant.nid_no}), পিতা: {applicant.father_name}, মাতা: {applicant.mother_name}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no}, উপজেলা: {applicant.person_upazila}, জেলা: {applicant.person_district} কে আমি ব্যক্তিগতভাবে চিনি। {data.customDescriptionBn || "তিনি অত্র ইউনিয়নের একজন স্থায়ী বাসিন্দা ও সৎ, চরিত্রবান ও আইনমান্যকারী নাগরিক। রাষ্ট্র বা সমাজ বিরোধী কোন কার্যকলাপে তাহার জড়িত থাকার তথ্য পাওয়া যায় নাই।"}
            </p>
          )}

          {/* Annual Income Certificate */}
          {slug === "annual-income" && (
            <p className="cert-paragraph text-[15px] leading-[2.2] text-gray-900 text-justify">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
              <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_name}
              </span>{" "}
              (এনআইডি: {applicant.nid_no}), পিতা: {applicant.father_name}, মাতা: {applicant.mother_name}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no}, উপজেলা: {applicant.person_upazila}, জেলা: {applicant.person_district} অত্র ইউনিয়নের একজন স্থায়ী বাসিন্দা। আমার জানামতে ও অনুসন্ধান সাপেক্ষে তাহার সকল বৈধ উৎস হতে প্রাপ্ত সর্বমোট বার্ষিক আয়{" "}
              <span className="font-bold text-emerald-700 text-base border-b border-dotted border-emerald-700 pb-[1px]">
                {data.incomeAmountBn || "১,৫০,০০০/- (এক লক্ষ পঞ্চাশ হাজার টাকা)"}
              </span>।
            </p>
          )}

          {/* Landless Certificate */}
          {slug === "landless" && (
            <p className="cert-paragraph text-[15px] leading-[2.2] text-gray-900 text-justify">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{" "}
              <span className="font-bold border-b border-dotted border-gray-600 pb-[1px]">
                {applicant.person_name}
              </span>{" "}
              (এনআইডি: {applicant.nid_no}), পিতা: {applicant.father_name}, মাতা: {applicant.mother_name}, গ্রাম: {applicant.village}, ওয়ার্ড নং: {applicant.ward_no}, উপজেলা: {applicant.person_upazila}, জেলা: {applicant.person_district}। {data.landDetailsBn || "উহার নিজের নামে বা পরিবারের কোন সদস্যের নামে কোন প্রকার কৃষি বা অকৃষি জমিজমা নাই। তিনি সম্পূর্ণ ভূমিহীন ও দিনমজুর।"}
            </p>
          )}

          {/* Closing Wish */}
          <p className="cert-closing text-[14.5px] font-bold text-gray-900 mt-3 pl-[20px]">
            আমি তাহার সার্বিক কল্যাণ ও সুস্বাস্থ্য কামনা করি।
          </p>
        </div>

        {/* Bottom Signatures & QR Section */}
        <div className="cert-footer-section flex justify-between items-end mt-auto p-[6px]">

          {/* Left: QR Code & Transaction ID */}
          <div className="qr-code-box flex flex-col items-start">
            <div className="qr-canvas-holder p-1 bg-white border border-gray-300 rounded shadow-sm">
              <QRCodeSVG
                value={signatory.qr_url || "https://www.lgoms.org"}
                size={82}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="trn-text font-siliguri text-[13.5px] font-bold text-gray-900 mt-[4px]">
              Trn- <span>{signatory.trn_no}</span>
            </div>
          </div>

          {/* Right: Signatory Authority Block */}
          <div className="signatory-box text-center min-w-[210px] pb-[2px]">
            <div className="sign-space h-[36px]" />
            <div className="sign-name text-[15px] font-bold text-black leading-tight">
              {signatory.signatory_name}
            </div>
            <div className="sign-role-sub text-[13px] font-semibold text-gray-800 leading-tight">
              অনুমোদনকারী/প্রদানকারী
            </div>
            <div className="sign-designation text-[13px] font-semibold text-gray-800 leading-tight">
              {signatory.signatory_role}
            </div>
            <div className="sign-office text-[13px] font-semibold text-gray-800 leading-tight">
              {union.up_name}
            </div>
            <div className="sign-location text-[13px] font-semibold text-gray-800 leading-tight">
              {union.upazila}, {union.district}।
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
