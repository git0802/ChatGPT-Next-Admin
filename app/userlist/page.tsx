import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

import UserTable from "@/components/Tables/UserTable";

const UserListPage = () => {
  return (
    <>
      <Breadcrumb pageName="User List" />

      <div className="flex flex-col gap-10">
        <UserTable />
      </div>
    </>
  );
};

export default UserListPage;
