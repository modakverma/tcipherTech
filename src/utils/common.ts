export async function isPasswordValid(password: string) : Promise<boolean> {
  return new Promise((resolve, reject) => {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      return resolve(false);
    }

    // Password must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return resolve(false);
    }

    // Password must contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return resolve(false);
    }

    // Password must contain at least one digit
    if (!/\d/.test(password)) {
      return resolve(false);
    }

    // Password must contain at least one special character
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return resolve(false);
    }

    // All criteria passed, password is valid
    return resolve(true);
  })
}