export const validateRegistration = (req, res, next) => {
    console.log('Received body:', req.body);  // Log the request body after multer processes the data

    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    next();
};



export const validateLogin = (req, res, next) => {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType)
        return res.status(400).json({ message: "All fields are required." });

    next();
};
