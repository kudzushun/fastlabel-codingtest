import { ValidateError } from "tsoa";

export function validateContent(content: string | undefined){
  if(!content || content.length > 80) throw new ValidateError({"validation error": {message: "validation error", value: content}}, 'invalid content length');
};