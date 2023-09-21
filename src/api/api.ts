import { Book } from "@/interface/types";

const api = {
  readList: {
    update: async (readList: Set<Book["ISBN"]>) => {
      localStorage.setItem("readList", JSON.stringify(Array.from(readList)));
    },
    onChange: (cb: (readList: Set<Book["ISBN"]>) => void) => {
      const getReadList = () => {
        const readList = new Set(
          JSON.parse(
            window.localStorage.getItem("readList") || "[]"
          ) as Book["ISBN"][]
        );

        cb(readList);
      };

      window.addEventListener("storage", getReadList);
      getReadList();

      return () => window.removeEventListener("storage", getReadList);
    },
  },
  book: {
    list: async (): Promise<Book[]> => {
      return import("../data/books.json").then((data) =>
        data.library.map((data) => data.book)
      );
    },
  },
};

export default api;
