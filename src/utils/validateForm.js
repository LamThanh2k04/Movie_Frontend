
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

export const validateFormRegister = (formData) => {
    let errors = {}


    if(!formData.name) {
        errors.name = 'Tên không được để trống'
    }
    
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

    if (!formData.confirmPassword) {
        errors.confirmPassword = 'Vui lòng nhập lại mật khẩu'
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Mật khẩu không khớp'
    }

    return errors
}