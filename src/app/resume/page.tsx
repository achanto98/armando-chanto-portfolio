import type { Metadata } from "next";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = {
  title: "Resume — Armando Chanto",
};

export default function ResumePage() {
  return <ResumeContent />;
}
