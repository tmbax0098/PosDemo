module.exports = new class Answer {

    success = (res, data = null) => res.status(200).json({data: data, error: null});

    save = (res, message = "Data saved successfully.") => res.status(200).json({data: message, error: null});

    fail = (res, data = null) => res.status(400).json({data: data, error: null});

    error = (res, error = "Error") => res.status(404).json({data: null, error: error});

}