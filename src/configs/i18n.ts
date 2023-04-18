import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      logIn: "Login",
      logInSuccess: "Login Success!!!",
      LogInError: "Invalid Email or Password!",
      register: "Register",
      registerSuccess: "Registration Success!",
      registerError: "Registration Error!",
      email: "Email",
      requiredEmail: "Please enter your email",
      invalidEmail: "Please enter a valid email address",
      password: "Password",
      requiredPassword: "Please enter your password",
      invalidPassword: "Password must be 4 or more characters",
      confirmPassword: "Confirm Password",
      notMatchPassword: "Please make sure your password match",
      name: "Name",
      requiredName: "Please enter your name",
      gender: "Gender",
      male: "Male",
      female: "Female",
      requiredGender: "Please select your gender",
      region: "Region",
      requiredRegion: "Please select your region",
      state: "State",
      requiredState: "Please select your state",
    },
  },
  vi: {
    translation: {
      logIn: "Đăng nhập",
      logInSuccess: "Đăng nhập thành công!!!",
      LogInError: "Email hoặc mật khẩu sai",
      registerSuccess: "Đăng ký thành công",
      registerError: "Đăng ký thất bại!",
      register: "Đăng ký",
      email: "Địa chỉ Email",
      requiredEmail: "Vui lòng nhập Email",
      invalidEmail: "Địa chỉ Email không hợp lệ",
      password: "Mật khẩu",
      requiredPassword: "Vui lòng nhập mật khẩu",
      invalidPassword: "Mật khẩu từ 4 ký tự trở lên",
      confirmPassword: "xác nhận mật khẩu",
      notMatchPassword: "Mật khẩu đã nhập không khớp",
      name: "Họ và tên",
      requiredName: "Vui lòng nhập tên",
      gender: "Giới tính",
      male: "Nam",
      female: "Nữ",
      requiredGender: "Vui lòng chọn giới tính ",
      region: "Quốc gia",
      requiredRegion: "Vui lòng chọn quốc gia",
      state: "Thành phố",
      requiredState: "Vui lòng nhập thành phô",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});
