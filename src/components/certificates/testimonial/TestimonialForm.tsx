"use client";

import React from "react";
import { CertificateData } from "@/types/certificate";
import { X, RotateCcw, Building2, FileText, User, MapPin, PenTool, Info, Sparkles } from "lucide-react";

interface TestimonialFormProps {
  data: CertificateData;
  onChange: (updated: CertificateData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialForm({
  data,
  onChange,
  onReset,
  isOpen,
  onClose,
}: TestimonialFormProps) {
  if (!isOpen) return null;

  const updateUnion = (field: string, value: string) => {
    onChange({ ...data, union: { ...data.union, [field]: value } });
  };

  const updateMeta = (field: string, value: string) => {
    onChange({ ...data, meta: { ...data.meta, [field]: value } });
  };

  const updateApplicant = (field: string, value: string) => {
    onChange({ ...data, applicant: { ...data.applicant, [field]: value } });
  };

  const updateSignatory = (field: string, value: string) => {
    onChange({ ...data, signatory: { ...data.signatory, [field]: value } });
  };

  const applyTemplate = (title: string, desc: string, closing?: string) => {
    onChange({
      ...data,
      meta: { ...data.meta, cert_title: title },
      customDescriptionBn: desc,
      closingWishBn: closing || "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।"
    });
  };

  const inputClass = "px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/80 transition-colors";

  return (
    <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
              প্রত্যয়নপত্রের লাইভ এডিটর
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">যে কোন প্রত্যয়ন তৈরি করুন</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onReset} className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> রিসেট
          </button>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6 overflow-y-auto">
        {/* Templates Quick Selector */}
        <div className="flex flex-col gap-2 p-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> দ্রুত টেমপ্লেট সিলেক্ট করুন
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-1">
            <button
              onClick={() => applyTemplate(
                "ভোটার স্থানান্তর প্রত্যয়ন",
                "তিনি বিগত দিনে মৌজা/মহল্লাঃ মধুপুর, ডাকঘরঃ নারুয়া-7730, বালিয়াকান্দি, রাজবাড়ী স্থায়ীভাবে বসবাস করতেন। বর্তমানে তিনি অত্র ইউনিয়নের ০1 নং ওয়ার্ডের গ্রামঃ গাবলা, ডাকঘরঃ উদয়পুর-৭৮০০, উপজেলাঃ রাজবাড়ী সদর, জেলাঃ রাজবাড়ী- স্থায়ীভাবে বসবাস করছেন। তিনি অত্র ঠিকানায় ভোটার স্থানান্তর করতে ইচ্ছুক। আমার জানা মতে তার নৈতিক চরিত্র ভালো।"
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              ১. ভোটার স্থানান্তর
            </button>
            <button
              onClick={() => applyTemplate(
                "স্বামীর বাড়িতে বসবাস",
                "তিনি ইতিপূর্বে পিতার বাড়িতে বসবাস করতেন। বর্তমানে তিনি অত্র ইউনিয়নের ০৫ নং ওয়ার্ডের রাজাপুর গ্রামে স্বামীর বাড়িতে স্থায়ীভাবে বসবাস করছেন। আমার জানা মতে তার নৈতিক চরিত্র ভালো।",
                "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।"
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              ২. স্বামীর বাড়িতে বসবাস
            </button>
            <button
              onClick={() => applyTemplate(
                "জাতীয় পরিচয়পত্র সংশোধন প্রত্যয়ন",
                "আমি তাকে ব্যক্তিগতভাবে চিনি ও জানি। তার জাতীয় পরিচয়পত্রে ভূলবশত পিতার নাম এসেছে সাগর আলী শেখ, অপরদিকে তার জন্ম নিবন্ধনে পিতার নাম এবং পিতার জাতীয় পরিচয়পত্রে নাম দেওয়া আছে মোঃ ইসমাইল মোল্লা, যা তার পিতার সঠিক নাম। এমতাবস্থায় তার জাতীয় পরিচয়পত্রের পিতার নাম তার জন্ম নিবন্ধন অনুযায়ী সংশোধন যোগ্য।"
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              ৩. NID তথ্য সংশোধন
            </button>
            <button
              onClick={() => applyTemplate(
                "নতুন ভোটার নিবন্ধনের প্রত্যয়ন",
                "তিনি ইতিপূর্বে ভোটার নিবন্ধনের সময় এলাকায় না থাকার কারনে ভোটার নিবন্ধন করতে ব্যর্থ হয়। বর্তমানে তিনি নতুন ভোটার হতে ইচ্ছুক। আমার জানা মতে তার নৈতিক চরিত্র ভালো।",
                "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।"
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              ৪. নতুন ভোটার নিবন্ধন
            </button>
            <button
              onClick={() => applyTemplate(
                "শিল্পী প্রত্যয়ন",
                "আমার জানামতে তিনি অত্র এলাকার একজন স্থায়ী বাসিন্দা। আমার জানামতে তিনি একজন শিল্পী। তিনি গানবাজনা পেশার সহিত জড়িত।",
                "আমি তার সর্বাঙ্গীন মঙ্গল কামনা করি।"
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              ৫. শিল্পী প্রত্যয়ন
            </button>
            <button
              onClick={() => applyTemplate(
                "প্রত্যয়নপত্র",
                "তিনি অত্র ইউনিয়নের একজন স্থায়ী বাসিন্দা ও সৎ, চরিত্রবান ও আইনমান্যকারী নাগরিক। রাষ্ট্র বা সমাজ বিরোধী কোন কার্যকলাপে তাহার জড়িত থাকার তথ্য পাওয়া যায় নাই।",
                "আমি তাহার জীবন ও কর্মক্ষেত্রে সার্বিক কল্যাণ ও সুস্বাস্থ্য কামনা করি।"
              )}
              className="text-[11px] text-left p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 transition-colors font-semibold"
            >
              ৬. সাধারণ চরিত্র সনদ
            </button>
          </div>
        </div>

        {/* Union Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Building2 className="w-4 h-4" /> পরিষদের তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ইউনিয়ন পরিষদ</label>
            <input type="text" value={data.union.up_name} onChange={(e) => updateUnion("up_name", e.target.value)} className={inputClass} />
          </div>
        </div>

        {/* Certificate Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> সনদের বিবরণ
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">প্রত্যয়নের শিরোনাম (Title)</label>
            <input type="text" value={data.meta.cert_title} onChange={(e) => updateMeta("cert_title", e.target.value)} className={inputClass} placeholder="প্রত্যয়নপত্র / শিল্পী প্রত্যয়ন..." />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ক্রমিক নং</label>
              <input type="text" value={data.meta.serial_no} onChange={(e) => updateMeta("serial_no", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">তারিখ</label>
              <input type="text" value={data.meta.issue_date} onChange={(e) => updateMeta("issue_date", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Applicant Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <User className="w-4 h-4" /> নাগরিকের তথ্য
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">নাম</label>
            <input type="text" value={data.applicant.person_name} onChange={(e) => updateApplicant("person_name", e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">এনআইডি/আইডি নং</label>
              <input type="text" value={data.applicant.nid_no} onChange={(e) => updateApplicant("nid_no", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ছবির URL</label>
              <input type="text" value={data.applicant.photo_url || ""} onChange={(e) => updateApplicant("photo_url", e.target.value)} className={inputClass} placeholder="/assets/image/person.webp" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">পিতার নাম</label>
              <input type="text" value={data.applicant.father_name} onChange={(e) => updateApplicant("father_name", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মাতার নাম</label>
              <input type="text" value={data.applicant.mother_name} onChange={(e) => updateApplicant("mother_name", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <MapPin className="w-4 h-4" /> ঠিকানা
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">গ্রাম</label>
              <input type="text" value={data.applicant.village} onChange={(e) => updateApplicant("village", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ওয়ার্ড নং</label>
              <input type="text" value={data.applicant.ward_no} onChange={(e) => updateApplicant("ward_no", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">বাসা নং</label>
              <input type="text" value={data.applicant.house_no} onChange={(e) => updateApplicant("house_no", e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ডাকঘর</label>
              <input type="text" value={data.applicant.post_office} onChange={(e) => updateApplicant("post_office", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Custom Dynamic Content */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <FileText className="w-4 h-4" /> ডাইনামিক প্রত্যয়ন বিবরণ ও শেষ বার্তা
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মূল প্রত্যয়ন বিবরণ (Custom Text)</label>
            <textarea
              value={data.customDescriptionBn || ""}
              onChange={(e) => onChange({ ...data, customDescriptionBn: e.target.value })}
              className={`${inputClass} h-32 leading-relaxed`}
              placeholder="এখানে যে কোন কাস্টম প্রত্যয়ন বিবরণ লিখুন..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">শেষ শুভেচ্ছা বার্তা (Closing Wish)</label>
            <input
              type="text"
              value={data.closingWishBn || "আমি তার সার্বিক কল্যাণ ও উন্নতি কামনা করি।"}
              onChange={(e) => onChange({ ...data, closingWishBn: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* Signatory */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
            <Info className="w-4 h-4" /> স্বাক্ষরকারী
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">অনুমোদনকারী</label>
            <input type="text" value={data.signatory.signatory_name} onChange={(e) => updateSignatory("signatory_name", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">পদবি</label>
            <input type="text" value={data.signatory.signatory_role} onChange={(e) => updateSignatory("signatory_role", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
    </aside>
  );
}
