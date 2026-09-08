import type { Metadata } from "next";
import ArticlesContent from "./ArticlesContent";

export const metadata: Metadata = {
  title: "Technical Articles — Armando Chanto",
};

export default function ArticlesPage() {
  return <ArticlesContent />;
}
