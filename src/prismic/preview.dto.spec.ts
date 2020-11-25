import { PreviewDto } from "./preview.dto";
import { validate } from "class-validator";

describe("PreviewDto", () => {
  describe("validation", () => {
    test("token is empty", async () => {
      const dto = new PreviewDto("", "awd");
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual("token");
    });
    test("documentId is empty", async () => {
      const dto = new PreviewDto("awd", "");
      const errors = await validate(dto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toEqual("documentId");
    });
    test("all is empty", async () => {
      const dto = new PreviewDto("", "");
      const errors = await validate(dto);

      expect(errors).toHaveLength(2);
      expect(errors.find((i) => i.property === "token")).not.toBeUndefined();
      expect(errors.find((i) => i.property === "documentId")).not.toBeUndefined();
    });
    test("all is not empty", async () => {
      const dto = new PreviewDto("awd", "aaa");
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });
  });
});
