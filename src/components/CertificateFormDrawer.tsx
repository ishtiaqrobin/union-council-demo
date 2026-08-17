"use client";

import React from "react";
import { CertificateData, HeirItem } from "@/types/certificate";
import {
    X,
    RotateCcw,
    Building2,
    FileText,
    User,
    MapPin,
    PenTool,
    Users,
    Plus,
    Trash2,
    Briefcase,
    DollarSign,
    Info
} from "lucide-react";

interface CertificateFormDrawerProps {
    data: CertificateData;
    onChange: (updated: CertificateData) => void;
    onReset: () => void;
    isOpen: boolean;
    onClose: () => void;
}

export function CertificateFormDrawer({
    data,
    onChange,
    onReset,
    isOpen,
    onClose,
}: CertificateFormDrawerProps) {
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

    const handleHeirChange = (index: number, field: keyof HeirItem, value: string) => {
        if (!data.heirs) return;
        const updatedHeirs = [...data.heirs];
        updatedHeirs[index] = { ...updatedHeirs[index], [field]: value };
        onChange({ ...data, heirs: updatedHeirs });
    };

    const addHeir = () => {
        const currentHeirs = data.heirs || [];
        const newHeir: HeirItem = {
            id: String(Date.now()),
            name: "",
            relation: "",
            age_or_dob: "",
            nid_or_bc: "",
            comments: "জীবিত"
        };
        onChange({ ...data, heirs: [...currentHeirs, newHeir] });
    };

    const removeHeir = (index: number) => {
        if (!data.heirs) return;
        const updatedHeirs = data.heirs.filter((_, i) => i !== index);
        onChange({ ...data, heirs: updatedHeirs });
    };

    return (
        <aside className="no-print edit-drawer w-full sm:w-[420px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl h-[calc(100vh-62px)] overflow-y-auto sticky top-[62px] z-[500] flex flex-col font-siliguri transition-colors duration-200">

            {/* Drawer Header */}
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <PenTool className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-none">
                            তথ্য পরিবর্তন করুন
                        </h3>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">লাইভ ২-ওয়ে ডাটা বাইন্ডিং</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onReset}
                        title="মূল ডামি ডাটাতে রিসেট করুন"
                        className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        রিসেট
                    </button>

                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Form Content Body */}
            <div className="p-5 flex flex-col gap-6 overflow-y-auto">

                {/* Section 1: Councils Info */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
                        <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        পরিষদের তথ্য
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ইউনিয়ন পরিষদের নাম</label>
                        <input
                            type="text"
                            value={data.union.up_name}
                            onChange={(e) => updateUnion("up_name", e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/80 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">উপজেলা</label>
                            <input
                                type="text"
                                value={data.union.upazila}
                                onChange={(e) => updateUnion("upazila", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">জেলা</label>
                            <input
                                type="text"
                                value={data.union.district}
                                onChange={(e) => updateUnion("district", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ওয়েবসাইট / লিংক</label>
                        <input
                            type="text"
                            value={data.union.website}
                            onChange={(e) => updateUnion("website", e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Section 2: Certificate Metadata */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        সনদের বিবরণ
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ক্রমিক নং</label>
                            <input
                                type="text"
                                value={data.meta.serial_no}
                                onChange={(e) => updateMeta("serial_no", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">তারিখ</label>
                            <input
                                type="text"
                                value={data.meta.issue_date}
                                onChange={(e) => updateMeta("issue_date", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">সনদের শিরোনাম</label>
                        <input
                            type="text"
                            value={data.meta.cert_title}
                            onChange={(e) => updateMeta("cert_title", e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Section 3: Applicant Details */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
                        <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        আবেদনকারীর তথ্য
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">নাম</label>
                        <input
                            type="text"
                            value={data.applicant.person_name}
                            onChange={(e) => updateApplicant("person_name", e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">এনআইডি / জন্ম নিবন্ধন নং</label>
                        <input
                            type="text"
                            value={data.applicant.nid_no}
                            onChange={(e) => updateApplicant("nid_no", e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">পিতার নাম</label>
                            <input
                                type="text"
                                value={data.applicant.father_name}
                                onChange={(e) => updateApplicant("father_name", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">মাতার নাম</label>
                            <input
                                type="text"
                                value={data.applicant.mother_name}
                                onChange={(e) => updateApplicant("mother_name", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>

                    {data.applicant.spouse_name !== undefined && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">স্বামীর / স্ত্রীর নাম</label>
                            <input
                                type="text"
                                value={data.applicant.spouse_name}
                                onChange={(e) => updateApplicant("spouse_name", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    )}
                </div>

                {/* Section 4: Address Details */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
                        <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        ঠিকানা
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">গ্রাম</label>
                            <input
                                type="text"
                                value={data.applicant.village}
                                onChange={(e) => updateApplicant("village", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">বাসা নং</label>
                            <input
                                type="text"
                                value={data.applicant.house_no}
                                onChange={(e) => updateApplicant("house_no", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ওয়ার্ড নং</label>
                            <input
                                type="text"
                                value={data.applicant.ward_no}
                                onChange={(e) => updateApplicant("ward_no", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ডাকঘর</label>
                            <input
                                type="text"
                                value={data.applicant.post_office}
                                onChange={(e) => updateApplicant("post_office", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">উপজেলা (ঠিকানা)</label>
                            <input
                                type="text"
                                value={data.applicant.person_upazila}
                                onChange={(e) => updateApplicant("person_upazila", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">জেলা (ঠিকানা)</label>
                            <input
                                type="text"
                                value={data.applicant.person_district}
                                onChange={(e) => updateApplicant("person_district", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Dynamic Specific Extras */}
                {data.heirs && (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                                <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                ওয়ারিশ / সদস্য তালিকা ({data.heirs.length} জন)
                            </div>
                            <button
                                onClick={addHeir}
                                className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 rounded transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" /> সদস্য যোগ করুন
                            </button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {data.heirs.map((heir, idx) => (
                                <div key={heir.id || idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl flex flex-col gap-2 relative group">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300">
                                            সদস্য #{idx + 1}
                                        </span>
                                        <button
                                            onClick={() => removeHeir(idx)}
                                            className="text-rose-500 hover:text-rose-600 p-1 hover:bg-rose-500/10 rounded transition-colors"
                                            title="মুছে ফেলুন"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="নাম"
                                            value={heir.name}
                                            onChange={(e) => handleHeirChange(idx, "name", e.target.value)}
                                            className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-slate-100 font-solaiman"
                                        />
                                        <input
                                            type="text"
                                            placeholder="সম্পর্ক"
                                            value={heir.relation}
                                            onChange={(e) => handleHeirChange(idx, "relation", e.target.value)}
                                            className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-slate-100 font-solaiman"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="বয়স / জন্ম তারিখ"
                                            value={heir.age_or_dob}
                                            onChange={(e) => handleHeirChange(idx, "age_or_dob", e.target.value)}
                                            className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-slate-100 font-solaiman"
                                        />
                                        <input
                                            type="text"
                                            placeholder="NID / জন্ম সনদ"
                                            value={heir.nid_or_bc}
                                            onChange={(e) => handleHeirChange(idx, "nid_or_bc", e.target.value)}
                                            className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs text-slate-900 dark:text-slate-100 font-solaiman"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Template Specific Extra Inputs */}
                {data.incomeAmountBn !== undefined && (
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-siliguri">
                            <DollarSign className="w-3.5 h-3.5" /> বার্ষিক আয়ের পরিমাণ (কথায় ও অংকে)
                        </label>
                        <input
                            type="text"
                            value={data.incomeAmountBn}
                            onChange={(e) => onChange({ ...data, incomeAmountBn: e.target.value })}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman"
                        />
                    </div>
                )}

                {data.businessNameBn !== undefined && (
                    <div className="flex flex-col gap-3">
                        <div className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" /> ব্যবসার বিবরণ
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">প্রতিষ্ঠানের নাম</label>
                            <input
                                type="text"
                                value={data.businessNameBn}
                                onChange={(e) => onChange({ ...data, businessNameBn: e.target.value })}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ব্যবসার ধরন</label>
                            <input
                                type="text"
                                value={data.businessTypeBn || ""}
                                onChange={(e) => onChange({ ...data, businessTypeBn: e.target.value })}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">লাইসেন্স ফি</label>
                            <input
                                type="text"
                                value={data.licenseFeeBn || ""}
                                onChange={(e) => onChange({ ...data, licenseFeeBn: e.target.value })}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman"
                            />
                        </div>
                    </div>
                )}

                {data.aliasNameBn !== undefined && (
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-rose-600 dark:text-rose-400 font-siliguri">অন্য নাম / উপনাম</label>
                        <input
                            type="text"
                            value={data.aliasNameBn}
                            onChange={(e) => onChange({ ...data, aliasNameBn: e.target.value })}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman"
                        />
                    </div>
                )}

                {/* Section 5: Signatory Info */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-800">
                        <Info className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        স্বাক্ষরকারীর তথ্য ও QR
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">অনুমোদনকারীর নাম</label>
                        <input
                            type="text"
                            value={data.signatory.signatory_name}
                            onChange={(e) => updateSignatory("signatory_name", e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">পদবি</label>
                        <input
                            type="text"
                            value={data.signatory.signatory_role}
                            onChange={(e) => updateSignatory("signatory_role", e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">ট্রানজেকশন নং (Trn)</label>
                            <input
                                type="text"
                                value={data.signatory.trn_no}
                                onChange={(e) => updateSignatory("trn_no", e.target.value)}
                                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">QR কোড URL / ডাটা</label>
                        <input
                            type="text"
                            value={data.signatory.qr_url}
                            onChange={(e) => updateSignatory("qr_url", e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 font-solaiman outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>
                </div>

            </div>
        </aside>
    );
}