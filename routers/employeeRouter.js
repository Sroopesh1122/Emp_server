const { createEmp, updateEmp, deleteEmp, getAllEmp, Imageuploader, getEmp } = require('../controllers/employeeController')
const { upload, imagesResize } = require('../middleware/ImageResize')

const router = require('express').Router()

router.post("/create",createEmp)

router.put("/update/:id",updateEmp)

router.delete("/delete/:id",deleteEmp)

router.get("/",getAllEmp);
router.get("/:id",getEmp);

router.post("/images/upload",upload.array('images',1),imagesResize,Imageuploader)


module.exports = router