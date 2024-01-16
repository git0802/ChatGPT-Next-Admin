'use client';

import Image from "next/image";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const TableThree = (props: any) => {
  let packageData: any = props.data;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-2 dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Email
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem: any, key: any) => (
              <tr key={key}>
                <td className="flex flex-row items-center border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 gap-4">
                  <div className="flex-shrink-0">
                    <Image className='rounded-full' src={packageItem.imageUrl} alt="Brand" width={48} height={48} />
                  </div>
                  <div>
                    <div className='flex flex-row gap-2'>
                      {
                        packageItem.firstName && <h5 className="font-medium text-black dark:text-white">
                          {packageItem.firstName}
                        </h5>
                      }
                      {
                        packageItem.lastName && <h5 className="font-medium text-black dark:text-white">
                          {packageItem.lastName}
                        </h5>
                      }
                    </div>
                    <p className="text-sm">
                      {packageItem.emailAddresses[0].emailAddress}
                    </p>
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.invoiceDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.emailAddresses[0].verification?.status === "verified"
                      ? "text-success bg-success"
                      : packageItem.status === "unverified"
                        ? "text-danger bg-danger"
                        : "text-warning bg-warning"
                      }`}
                  >
                    {packageItem.emailAddresses[0].verification?.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <PencilSquareIcon width="18" height="18" />
                    </button>
                    <button className="text-danger hover:text-primary" type="submit" >
                      <TrashIcon width="18" height="18" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
