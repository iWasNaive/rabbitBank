const yup = require("yup");

exports.loginValidator = yup.object().shape({
  username: yup
    .string("خطا در داده ورودی")
    .required("نام کاربری وارد کنید")
    .min(5, "طول نام کاربری حدقل ۵ کرکتر"),
    
  password: yup
    .string("خطا در داده ورودی")
    .required("رمز عبور وارد کنید")
    .min(5, "حدقل رمز عبور ۵ کرکتر"),
});
