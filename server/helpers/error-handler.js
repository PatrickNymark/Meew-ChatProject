module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ error: err });
    }

    if(err.name === 'Unauthorized') {
        return res.status(401).json({ error: err.message })
    }

    // mongodb error
    if(err.name === 'ValidationError') {
        let arr = []
        Object.keys(err.errors).forEach(key => {
            arr.push(err.errors[key].message)
        });

        return res.status(400).json({ error: arr })
    }

    // default to 500 server error
    return res.status(500).json({ error: err.message });
}