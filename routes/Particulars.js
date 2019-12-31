var express = require('express');
var router = express.Router();
const portJson = require('../json/port.json');
const mongodJson = require('../json/mongod.json');
const searchJson = require('../json/searchData.json');

// import homeJson from '../json/home3.json'
var MongoClient = require('mongodb').MongoClient; //需要启动mongodb服务
var ObjectId = require('mongodb').ObjectId; //查询_id
var MONGODB_BASE_URL = "mongodb://192.168.199.161:8088";
const IndexExample1 = 'IndexExample1';
const searchData = 'searchData';
const tableData = 'tableData';
const dbName = 'pyt111';
const mydb = require('../public/js/mongodb');
// const updateData = (client, whereStr, updata) => {
//     const mydb = client.db(dbName);
//     let col = mydb.collection(IndexExample1);
//     let dt = col.updateMany(whereStr, updata).then(res => {
//         console.log(res);
//     })y
// }
const countectData = {
    json: searchJson,
    dbName: dbName,
    runoob: searchData,
};
// let client = mydb.connect(MONGODB_BASE_URL,countectData)

//
/* post home page. */
const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(creator(i))
    }
    return result
};
router.use('/auxiliary', async (req, res, next) => {
    // console.log(portJson);
    let data = {
        upLoad: [],
        initialSort: [],
        downLoad: []
    };
    // let findData = {
    //     lineType: {
    //         $in: ['upLoad', "initialSort", "downLoad"]
    //     }
    // }
    let findData = {
        IndexExample1: { //表名
            lineType: {
                $in: ['upLoad', "initialSort", "downLoad"]
            }
        },
        tableData: {

        },
        searchData: {

        }
    };
    // console.time('findTime')
    let client = await mydb.connect(MONGODB_BASE_URL);
    let dataObj = await mydb.findData(client, dbName, findData).catch(err => { //返回所有查到的数据对象
        console.log(err);
    });
    // let a =await dataObj.IndexExample1.explain()//查看执行分析
    // console.log(a);
    // console.log(dataObj);
    let arr = await dataObj.IndexExample1.toArray().catch(err => {
        console.log(err);
    });
    let table = await dataObj.tableData.toArray().catch(err => {
        console.log(err);
    });
    let searchList = await dataObj.searchData.toArray().catch(err => {
        console.log(err);
    });
    // console.log(searchList);
    data.t2 = [];
    data.t1 = [];
    for (let i in table) {
        if (table[i].type === 2) {
            data.t2.push(table[i]);
        } else if (table[i].type === 1) {
            data.t1.push(table[i]);
        }
    }
    data.getOutfieldList = searchList;
    // console.log(data);
    // console.timeEnd('findTime')
    client.close();

    // console.log(arr);
    // console.log(table);
    for (let i in arr) {
        let lineType = arr[i].lineType;
        arr[i].id = arr[i]._id
        if (lineType === 'upLoad') {
            data.upLoad.push(arr[i]);

        } else if (lineType === 'initialSort') {
            data.initialSort.push(arr[i]);
        } else if (lineType === 'downLoad') {
            let index = arr[i].downLoadIndex;
            data.downLoad[index] = new Object;
        }
    }
    let DL = data.downLoad;
    for (let x in DL) {
        let ports = DL[x].ports = []
        for (let i in arr) {
            // console.log(typeof x, typeof arr[i].downLoadIndex);
            if (x === String(arr[i].downLoadIndex)) {
                ports.push({
                    id: arr[i]._id,
                    title: arr[i].title,
                    addres: arr[i].addres,
                    ticket: arr[i].ticket,
                    person: arr[i].person,
                    t1: arr[i].t1,
                    t2: arr[i].t2,
                    p1: arr[i].p1,
                    p2: arr[i].p2,
                    index: i,
                    list: generateItems(25, (y) => ({
                        lineName: '分拣线--' + i,
                        portName: '端口--' + x,
                        id: y + i + x,
                    }))
                });

            }
        }
    }
    // console.log(data);

    let RESDATA = {
        statusCode: 200,
        data: data,
        message: "数据加载成功"
    };
    // let RESDATA = {
    //     statusCode: 100,
    //     data: {},
    //     message:"数据加载异常"
    // };

    let timer = setTimeout(() => {
        clearTimeout(timer);
        res.json(RESDATA);
        // next()
    }, 0)
    // // res.render('index', { title: 'Express' });
});
router.post('/addPort', async (req, res, next) => {
    let insertData = req.body,
        RESDATA = {};
    insertData.ticket = Number(insertData.ticket);
    insertData.person = Number(insertData.person);
    insertData.downLoadIndex = Number(insertData.downLoadIndex);
    if (insertData) {
        let client = await mydb.connect(MONGODB_BASE_URL);
        let P = await mydb.insterData(client, insertData, dbName, IndexExample1);
        client.close();
        // console.log(P);
        if (P.ops.length > 0) {
            RESDATA.statusCode = 200;
            RESDATA.message = "修改成功";
        } else {
            RESDATA.statusCode = 201;
            RESDATA.message = "修改失败";
        }

    }
    // let RESDATA = {
    //     statusCode: 200,
    //     message:"修改成功"
    //     // data: data
    // };
    res.json(RESDATA)
});
router.post('/changeOutfieldList', async (req, res, next) => { //修改中转场列表数据接口
    let OutfieldList = req.body;
    console.log(OutfieldList);
    // insertData.ticket = Number(insertData.ticket)
    // insertData.person = Number(insertData.person)
    // insertData.downLoadIndex = Number(insertData.downLoadIndex)
    // if (insertData) {
    //     let client = await mydb.connect(MONGODB_BASE_URL);
    //     let P = await mydb.insterData(client, insertData, dbName, IndexExample1)
    //     //    console.log(P);
    //     client.close()
    // }
    let RESDATA = {
        statusCode: 200,
        message: "修改成功"
        // data: data
    };
    res.json(RESDATA)
});

router.post('/updata', async (req, res, next) => { //修改中转场列表数据接口
    let newData = req.body;
    let data = {};
    let whereUp = {
            "_id": ObjectId(newData.id)
        },
        Data = {
            $set: {
                "person": newData.person,
                "ticket": newData.ticket
            }
        };
    let findData = {
        IndexExample1: {
            "_id": ObjectId(newData.id)
        }
    };
    let client = await mydb.connect(MONGODB_BASE_URL);
    let p = await mydb.updateData(client, whereUp, Data, dbName, IndexExample1);
    //    let p = await mydb.findData(client, dbName, findData).catch(err => { //返回所有查到的数据对象
    //     console.log(err);
    // })
    // console.log(p);
    client.close();

    let RESDATA = {
        statusCode: 200,
        message: "修改成功"
        // data: data
    };
    res.json(RESDATA);
});

router.post('/deletedata', async (req, res, next) => { //修改中转场列表数据接口
    let newData = req.body;
    let data = {};
    let deletData = {
        "_id": ObjectId(newData.id)
    };

    let client = await mydb.connect(MONGODB_BASE_URL);
    // let p = await mydb.updateData(client, whereUp, deletData, dbName, IndexExample1);
    let p = await mydb.deleatData(client, IndexExample1, dbName, deletData); //删除某一条数据
    // let findData = {
    //     IndexExample1: {
    //         "_id": ObjectId(newData.id)
    //     }
    // }
    //    let p = await mydb.findData(client, dbName, findData).catch(err => { //返回所有查到的数据对象
    //     console.log(err);
    // })
    console.log(p);
    client.close();

    let RESDATA = {
        statusCode: 200,
        message: "删除成功"
        // data: data
    };
    res.json(RESDATA);
});











module.exports = router;
