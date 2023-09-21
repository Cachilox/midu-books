import { api } from "@/api";
import dynamic from "next/dynamic";
import IndexLoading from "./loading";

const ClientPage = dynamic(() => import("./client"), {
  ssr: false,
  loading: IndexLoading,
});

export default async function IndexPage() {
  const books = await api.book.list();

  return <ClientPage books={books} />;
}
