"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import UserPromptTable from "@/components/Tables/UserPromptTable";
const UserPromptsPage = () => {
  return (
    <>
      <Breadcrumb pageName="User Prompts" />

      <div className="flex flex-col gap-10">
        <UserPromptTable />
      </div>
    </>
  );
};

export default UserPromptsPage;
