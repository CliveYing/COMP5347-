var express = require('express')
var controller = require('../controllers/revision.server.controller')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ useNewUrlParser: true });
// var authroize_controller = require('../controllers/loginController')
var router = express.Router()

// Login & Register Part
router.get('/', controller.showHome)
router.get('/register', controller.showRegister)
router.get('/login', controller.showLogin)
router.post('/demo', urlencodedParser, controller.findOne)
router.post('/registerToDb', urlencodedParser, controller.registerToDB)
router.post('/completeprofile', urlencodedParser, controller.registerProfileToDB)


router.get('/main', controller.showMainPage)

router.get('/function1', controller.showFunctionPage1)
router.get('/function1/getTopNumberArticleRevised', controller.getTopRevisedArticle)
router.get('/function1/getLessNumberArticleRevised', controller.getLowestRevisedArticle)
router.get('/function1/getUniqueNumberUserLargest', controller.getUniqueUserRevisedArticleLargest)
router.get('/function1/getUniqueNumberUserLowest', controller.getUniqueUserRevisedArticleLowest)
router.get('/function1/getLongestArticle', controller.getLongestHistoryArticle)
router.get('/function1/getShortestArticle', controller.getShortestArticle)
router.get('/function1/getPieChart', controller.getPieChart)
router.get('/function1/getAdminTypeNumber', controller.getPieChartAdminType)
router.get('/function1/getBarChart', controller.getColumnChart)


router.get('/function2', controller.showFunctionPage2)
router.get('/function2/getTotalNoOfRevision', controller.getTotalRevisedNo) 
router.get('/function2/getTop5RegularUsers', controller.getTotalNumberOfRevisions) 
router.get('/function2/getPieChart', controller.getPieChartFunction2)
router.get('/function2/BarChart', controller.getBarChartFunction2)
router.get('/BarChartTop5SelectedOneUser', controller.GetArticleBarChartTop5SelectedUser)




router.get('/function3', controller.showFunctionPage3)
router.get('/function3/getAuthorInfo', controller.getAuthorInformation)
router.get('/function3/displayAllTimeStamp', controller.getIndividualTimestamp)
router.get('/function3/getIndividualNumberOfRevision', controller.getIndividualNumberOfRevision)



module.exports = router