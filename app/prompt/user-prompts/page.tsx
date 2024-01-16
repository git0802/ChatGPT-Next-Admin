"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

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
