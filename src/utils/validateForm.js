
export const validateFormLogin = (formData) => {
    let errors = {}
    if (!formData.email) {
        errors.email = 'Email không được để trống'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email không hợp lệ'
    }

    if (!formData.password) {
        errors.password = 'Mật khẩu không được để trống'
    } else if (formData.password.length < 6) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    return errors
}