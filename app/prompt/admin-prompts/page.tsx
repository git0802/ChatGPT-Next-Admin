"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

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
