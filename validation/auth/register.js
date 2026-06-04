const yup = require("yup");

exports.registerValidator = yup.object().shape({
  name: yup
    .string()
    .matches(/^[آ-ی\s]{2,50}$/, "نام خودرا پارسی وارد کنید")
    .required("نام را وارد کنید"),

  username: yup
    .string()
    .required("نام کاربری وارد کنید")
    .matches(
      /^[a-zA-Z0-9]+(_?[a-zA-Z0-9]+)*$/,
      "نام کاربری فقط شامل حروف انگلیسی، اعداد و یک _ است",
    )
    .min(5, "نام کاربری حداقل ۵ کاراکتر است"),

  password: yup
    .string()
    .required("رمز را وارد کنید")
    .min(5, "رمزعبور حداقل ۵ کاراکتر است"),
});
