function isValidEmail(email){
    if (typeof email !== "string") {
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

console.log(isValidEmail("test@example.com"));
console.log(isValidEmail('wrong-email'));