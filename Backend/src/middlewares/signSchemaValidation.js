import signUpSchema  from "../schemas/authSchema.js";

export default function signSchemaValidation(req, res, next) {
  const validationSignUp = signUpSchema.validate(req.body);

  if (validationSignUp.error) {
    return res.sendStatus(422);
  }

  next();
}