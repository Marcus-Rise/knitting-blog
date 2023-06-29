import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const previewExit = () => {
  const { isEnabled } = draftMode();

  if (isEnabled) {
    draftMode().disable();
  }

  redirect("/");
};

export { previewExit as GET };
