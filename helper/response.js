function FormatResponse(res, status, message, data) {
    const safeData = JSON.parse(JSON.stringify(data, getCircularReplacer()));
    res.status(status).json({
        status: status,
        message: message,
        data: safeData
    });
}

function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}

module.exports = FormatResponse;
