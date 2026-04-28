exports.checkRegisterInput = (data)=> {
    // info must be : name , email , phone number, password

    // check its not empty
    if(data.name.trim().length == 0 && data.email.trim().length == 0 && data.phone.trim().length == 0 && data.password.trim().length == 0) return false;

    // check email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(data.email)) return false;

    // check phone number
    const cleanedPhone = data.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\d+$/;
    if(!phoneRegex.test(data.phone)) return false;

    // check passwrod length
    if(data.password.length > 16 && data.password.length < 6) return false;

    // All check passed
    return true
}

exports.checkLoginInput = (data)=> {
    // info must be : email , phone number, password

    // check its not empty
    if(data.email.trim().length == 0 && data.phone.trim().length == 0) return false;

    // check email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(data.email)) return false;

    // check phone number
    const cleanedPhone = data.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\d+$/;
    if(!phoneRegex.test(cleanedPhone)) return false;

    // check passwrod length
    if(data.password.length > 16 && data.password.length < 6) return false;
    
    // All check passed
    return true
}