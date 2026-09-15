const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Product name must be unique",
        });
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
        .map((error) => error.message)
        .join(", ");

        return res.status(400).json({
            success: false,
            message,
        });
    }

    res.status(500).json({
        success: false,
        message: err.message || "Interval server Error",
    });
}

export default errorMiddleware;