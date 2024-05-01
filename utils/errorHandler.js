const errorHandler = async (err, req, res, next) => {
    res.statusCode= res.statusCode == 200 ? 500 :200;
    console.log(err?.message);
    res.json({
      message: err?.message,
      name : err?.name
    });
  };
  module.exports = { errorHandler };