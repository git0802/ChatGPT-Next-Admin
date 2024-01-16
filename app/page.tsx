import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./home.css";

export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
      <article className="grid lg:grid-cols-2">
        <div className="px-8 py-20 md:px-20 lg:py-48">
          <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient">
            Auth starts here.
          </h1>
          <p className="mt-2 text-lg">
            A simple and powerful Next.js template featuring authentication and
            user management powered by Clerk.
          </p>
          <div className="flex gap-2 mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              View Demo
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
