import { render, fireEvent } from "@testing-library/react";
import { api } from "@/api";
import ClientPage from "@/app/client";

describe("BookList", () => {
  it("should render No results message when no books are available", () => {
    const { getByText } = render(<ClientPage books={[]} />);
    expect(getByText(/No hay resultados/)).toBeTruthy();
  });

  it("should render the books library if data is received", async () => {
    const books = await api.book.list();
    const { getByText } = render(<ClientPage books={books} />);
    expect(getByText(/El Señor de los Anillos/)).toBeTruthy();
  });
});

describe("ClientPage", () => {
  it("should render correctly with book data", () => {
    const books = [
      {
        title: "El Señor de los Anillos",
        pages: 1200,
        genre: "Fantasía",
        cover:
          "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
        synopsis:
          "Una aventura épica en un mundo de fantasía llamado la Tierra Media.",
        year: 1954,
        ISBN: "978-0618640157",
        author: {
          name: "J.R.R. Tolkien",
          otherBooks: ["El Hobbit", "El Silmarillion"],
        },
      },
    ];

    const { getByText, getByLabelText } = render(<ClientPage books={books} />);

    expect(getByText(/Disponibles/)).toBeInTheDocument();

    const selectView = getByLabelText("Selecciona vista");
    fireEvent.change(selectView, { target: { value: "readlist" } });

    expect(getByText(/Lista de lectura/)).toBeInTheDocument();
  });
});
