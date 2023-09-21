"use client";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/api";
import { Book } from "@/interface/types";
import Image from "next/image";

export default function ClientPage({ books }: { books: Book[] }) {
  const [readList, setReadList] = useState<Set<Book["ISBN"]>>(() => new Set());
  const [genre, setGenre] = useState<string>("");
  const [wiew, setWiew] = useState<"available" | "readlist">("available");

  const genres = useMemo(() => {
    const map = new Map<string, number>();

    for (const book of books) {
      if (!map.has(book.genre)) map.set(book.genre, 0);

      if (wiew === "readlist" && !readList.has(book.ISBN)) continue;

      map.set(book.genre, map.get(book.genre)! + 1);
    }

    return Array.from(map.entries()).map(([label, count]) => ({
      label,
      count,
    }));
  }, [readList, wiew, books]);

  const matches = useMemo(() => {
    // if (!genre) return books;
    return books.filter((book) => {
      if (wiew === "readlist" && !readList.has(book.ISBN)) return false;
      if (genre && book.genre !== genre) return false;

      return true;
    });
  }, [genre, books, readList, wiew]);

  const handleBookClick = (book: Book) => {
    const draft = structuredClone(readList);

    draft.has(book.ISBN) ? draft.delete(book.ISBN) : draft.add(book.ISBN);

    api.readList.update(draft);

    setReadList(draft);
  };

  useEffect(() => {
    const unsuscribe = api.readList.onChange(setReadList);

    return () => unsuscribe();
  }, []);

  return (
    <article className="grid gap-4">
      <nav className="sticky top-0 z-10 bg-[Canvas] py-3">
        <ul className="inline-flex gap-4">
          <li>
            <select
              className="py-1 rounded-md"
              value={wiew}
              onChange={(e) =>
                setWiew(e.target.value as "available" | "readlist")
              }
            >
              <option value="available">Disponibles ({books.length})</option>
              <option value="readlist">
                Lista de lectura ({readList.size})
              </option>
            </select>
          </li>

          <li>
            <select
              className="py-1 rounded-md"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              name="genre"
            >
              <option value="">Todos los generos</option>
              {genres.map(({ label, count }) => (
                <option key={label} value={label}>
                  {label} ({count})
                </option>
              ))}
            </select>
          </li>
        </ul>
      </nav>
      {matches.length ? (
        <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-8">
          {matches.map((book) => (
            <li
              key={book.ISBN}
              className="grid cursor-pointer grid-rows-[auto,1fr] gap-3"
              onClick={() => handleBookClick(book)}
            >
              <Image
                className="aspect-[9/14] w-full rounded-md bg-gray-800 object-cover shadow-xl"
                width={260}
                height={414}
                src={book.cover}
                alt={book.title}
              />
              <p>
                {book.title} {readList.has(book.ISBN) && <span> ⭐</span>}
              </p>
              <p className="text-md line-clamp-3 opacity-80">{book.synopsis}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="w-full text-2xl mt-[9rem] py-8 text-center opacity-50">
          No hay resultados
        </p>
      )}
    </article>
  );
}
