const MongoClient = require('mongodb').MongoClient; //需要启动mongodb服务


const connect = async (url, data = null) => {
    if (data) {

        let json = data.json;
        let dbName = data.dbName; //数据库名称
        let runoob = data.runoob; //创建或链接的数据表名称
        let res = await MongoClient.connect(url, {
            useNewUrlParser: true
        });

    /** 创建集合并插入数据  start*/

        // let insterD = await insterData(res, json, dbName, runoob)
        // console.log(insterD);
    /** 创建集合并插入数据  end*/


    /** 插入多条数据  start*/
    //     let whereUp = {}
    //     // let whereUp = {lineType:"downLoad"};
    //     let Data = { $set: {type:1} };//插入一列
    //     // let Data = {$unset:{x1:"",x2:""}};//删除一列
    //   let insterD = await updateData(res,whereUp, Data, dbName, runoob)
    /** 插入多条数据  end*/

        // let wehereData = {$or:[{person:{$type:2}},{ticket :{$type:2}},{p1 :{$type:2}},{p2 :{$type:2}},{t1 :{$type:2}},{t2 :{$type:2}}]}//查找多列条件  person转换为2类型
        //   let result = await mydb.typeTo(res,IndexExample1,dbName,wehereData,16)

        // mydb.deleatData(res,IndexExample1,dbName,{})//删除所有
        // mydb.createIndex(res,dbName,IndexExample1,{index: 1})//创建索引
        // mydb.getIndex(res,dbName,IndexExample1)//获取集合中所有的索引

        // let r = await mydb.findData(res, {person:1},dbName,IndexExample1)
        // let x = await r.explain()
        // let x = await r.explain()
        // console.log(x);
        // console.log(r.explain());
        res.close()
    } else {
        return MongoClient.connect(url, {
            useNewUrlParser: true
        })
    }


};
//修改数据类型
const typeTo = (client, IndexExample1, dbName, findData, newType) => {
    const mydb = client.db(dbName);
    let col = mydb.collection(IndexExample1);
    let findList = findData.$or;
    let keys = [];
    for (let i in findList) {
        let keyData = findList[i];
        for (let key in keyData) {
            keys.push(key)
        }
        // console.log(findList[i]);
    }
    console.log(keys);
    console.log('链接成功');
    if (newType === 16) {
        console.log(findData);
        let s = col.find(findData).forEach(el => { //字符串转int32
            // console.log(el);
            for (let i in keys) {
                // console.log({[keys[i]] :el[keys[i]] });
                col.updateOne({
                    [keys[i]]: el[keys[i]]
                }, {
                    $set: {
                        [keys[i]]: parseFloat(el[keys[i]])
                    }
                })
            }

            // col.updateOne({ticket :el.ticket },{$set:{ticket :parseFloat(el.ticket )}})

        })
        //    console.log(s);
        return s
    }
    // client.close()
}
//删除数据
const deleatData = async (client, IndexExample1, dbName, deletData) => {
    const mydb = client.db(dbName);
    let col = mydb.collection(IndexExample1);
    console.log('链接成功');
    let Ddata = await col.deleteMany(deletData).catch(err => {
        console.log(err);
    })
    console.log(Ddata);
}
//创建索引
const createIndex = (client, dbName, IndexExample1, indexData) => {
    let mydb = client.db(dbName);
    let col = mydb.collection(IndexExample1);

    col.createIndex(indexData, (err) => {
        console.log(err);
    })
}

//查看索引
const getIndex = async (client, dbName, IndexExample1) => {
    let mydb = client.db(dbName);
    let col = mydb.collection(IndexExample1);
    let indexs = await col.indexes();
    console.log(indexs);
}

/**
 * 插入数据
 */
const insterData = async (client, insertData, dbName, IndexExample1) => {
    //链接到表
    let d;
    let mydb = client.db(dbName);
    let col = mydb.collection(IndexExample1);
    //插入数据

    // console.log(insertData,Object.prototype.toString.call(insertData));
    if (Object.prototype.toString.call(insertData) === "[object Array]") {
        // console.log('insertMany');
        d = await col.insertMany(insertData).catch(err => {
            console.log(err);
        })

    } else if (Object.prototype.toString.call(insertData) === "[object Object]") {
        // console.log('insertOne');
        d = await col.insertOne(insertData).catch(err => {
            console.log(err);
        })
    }
    client.close()
    return d
}
/**
 * 查询数据
 * 多表多条件同时查询
 */
const findData = async (client, dbName, findData) => {
    let mydb = client.db(dbName)
    let cols = await mydb.collections();
    let d = new Object;
    // console.log(cols);
    cols.forEach((el, i) => {
        for (let x in findData) {
            if (x === el.collectionName) {
                d[x] = cols[i].find(findData[x])
            }
        }
        // console.log(el,i);
    })
    // console.log(d);
    // console.log(cols);
    // let d = await col.find(findData)
    // .toArray().catch(err => {
    //     console.log(err);
    // })
    return d

}
/**
 * 更新数据
 */
const updateData = async (client, whereStr, updata, dbName, runoob) => {
    let mydb = client.db(dbName)
    let col = await mydb.collection(runoob);
    let d = await col.updateMany(whereStr, updata).catch(err => {
        console.log(err);
    })
    return d
    // col.updateMany(whereStr, updata)
}
// let ss = MongoClient.connect(url, {
//     useNewUrlParser: true
// }, (err, client) => {
//     if (err) throw err;
//     console.log('链接成功');
//     // console.log(client);
//     // updateData(client,{lineType:'downLoad'},{$set:{title:'分拣'}})//更新
//     // findData(client, (result) => {
//     //     // console.log(result);
//     //     client.close()
//     // })

//     // insterData(client, (result) => {
//     //     console.log(result);
//     //     client.close()
//     // })

// });
module.exports = {
    connect,
    insterData,
    findData,
    updateData,
    typeTo,
    deleatData,
    createIndex,
    getIndex
}
