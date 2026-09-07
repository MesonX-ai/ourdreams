import { PropsWithChildren } from "react";
import WcShell from "@/components/wc/WcShell";

export default function WcLayout({ children }: PropsWithChildren) {
  return <WcShell>{children}</WcShell>;
}
