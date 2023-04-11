// bắt lỗi đăng ký
const checkRegister = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ status:1, message: 'Nhập đầy đủ thông tin !'});
    } else {
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regexEmail.test(email)) {
            return res.status(400).json({ status:1, 
                message: 'Email không hợp lệ' });
        }
        let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regexPassword.test(password)) {
            return res.status(400).json({ status:1, 
                message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số' })   ;
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ status:1, 
                message: 'Mật khẩu không khớp' });
        }
        return next();
    }
}
module.exports = {checkRegister};