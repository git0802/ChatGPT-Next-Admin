"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import AdminPromptTable from "@/components/Tables/AdminPromptTable";

const AdminPromptsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Admin Prompts" />

      <div className="flex flex-col gap-6">
        <AdminPromptTable />
      </div>
    </>
  );
};

export default AdminPromptsPage;
