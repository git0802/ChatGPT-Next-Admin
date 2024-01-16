"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Tables Page | Next.js E-commerce Dashboard Template",
    description: "This is Tables page for TailAdmin Next.js",
    // other metadata
};

import UserPromptTable from "@/components/Tables/UserPromptTable";
import axios from "axios";
import React, { useEffect } from "react";

const UserPromptsPage = () => {
    const [packageData, setPackageData] = React.useState();

    const fetchData = async () => {
        let { data } = await axios.get("/api/prompt");
        setPackageData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Breadcrumb pageName="User Prompts" />

            <div className="flex flex-col gap-10">
                <UserPromptTable packageData={packageData} />
            </div>
        </>
    );
};

export default UserPromptsPage;
