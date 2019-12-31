const express = require('express')
const router = express.Router()

const ConfigurationJson = require('../json/Configuration.json')
const search = require('../json/search.json')
const search2 = require('../json/search2.json')
const queryTLanshouTimelySortRpt = require('../json/queryTLanshouTimelySortRpt.json')
const selectList = require('../json/selectList.json')


const mydb = require('../public/js/mongodb')


var url = "mongodb://192.168.199.161:8083";
const dbName = 'pyt111';
const TableDataList = 'TableDataList';
const TableDataList2 = 'TableDataList2';

// const countectData = {
//     json: search2,
//     dbName: dbName,
//     runoob: TableDataList2,
// }
// let client = mydb.connect(url, countectData) //一些默认默认方法

router.use('/', (req, res, next) => {
    res.json(ConfigurationJson)
})
router.post('/realtime/lineCargoVolumeReal/loadData', async (req, res, next) => {
    // console.log(req.body);
    let limtD = Number(req.body.limit)
    let pageSize = Number(req.body.limit)
    let page = Number(req.body.offset)
    let skipD = pageSize * page
    let client = await mydb.connect(url)
    let total = 0;
    let query = client.db(dbName).collection(TableDataList).find({})
    query.count((err, res) => {
        total = res//获取所有数据长度
    })
    query.skip(skipD);
    query.limit(limtD)
    let findList = await query.skip(skipD).limit(limtD).toArray()
    // console.log(findList);
    client.close();
    search.list = findList;
    search.total = total;
    res.json(search)
})

router.post('/realtime/lineCargoVolumeReal/searchChildData', async (req, res, next) => {
    let findData = {
        TableDataList2: { //表名
            type: {
                $in: [1]
            }
        }
    }
    let client = await mydb.connect(url)
    let dataObj = await mydb.findData(client, dbName, findData).catch(err => { //返回所有查到的数据对象
        console.log(err);
    })
    let data = await dataObj.TableDataList2.toArray()
    // console.log(data);
    client.close()
    res.json(data)


})
router.post('/queryTLanshouTimelySortRpt', async (req, res, next) => {

    res.json(queryTLanshouTimelySortRpt)
})
router.post('/queryDeptType', async (req, res, next) => {

    res.json(selectList)
})
module.exports = router;
