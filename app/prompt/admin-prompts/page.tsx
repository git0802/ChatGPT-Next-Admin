"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Tables Page | Next.js E-commerce Dashboard Template",
    description: "This is Tables page for TailAdmin Next.js",
    // other metadata
};

import AdminPromptTable from "@/components/Tables/AdminPromptTable";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminPromptsPage = () => {
    const [packageData, setPackageData] = useState();

    const fetchData = async () => {
        let { data } = await axios.get("/api/prompt");
        setPackageData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <>
            <Breadcrumb pageName="Admin Prompts" />

            <div className="flex flex-col gap-10">
                <AdminPromptTable packageData={packageData} />
            </div>
        </>
    );
};

export default AdminPromptsPage;
