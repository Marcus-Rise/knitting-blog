import { IsNotEmpty } from "class-validator";

class PreviewDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  documentId: string;

  constructor(token = "", documentId = "") {
    this.token = token;
    this.documentId = documentId;
  }
}

export { PreviewDto };
