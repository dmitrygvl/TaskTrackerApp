import { sumTs } from "./index";

describe("sum", () => {
  it("sum 2 and 3 = 5", () => {
    expect(sumTs(2, 3)).toEqual(5);
  });
});
