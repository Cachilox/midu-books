import api from "@/api/api";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
});

describe("api", () => {
  describe("api.readList.update", () => {
    it("should update local storage with a reading list", async () => {
      const readList = new Set(["978-0307743657", "978-0486411095"]);

      await api.readList.update(readList);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "readList",
        JSON.stringify(Array.from(readList))
      );
    });
  });
  
});
