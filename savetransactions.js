var Datastore = require('nedb')
const fs = require('fs')
const axios = require('axios')

var db = new Datastore({ filename: './missingorders/Velachery/transactions.db' });
db.loadDatabase(function (err) {    // Callback is optional
    // Now commands will be executed
});

var tr_data = require('./transaxns.json')

var invoicenos = [
    "3120210727/9",
    "3120210724/26",
    "3120210726/11",

]
// var i = 0
// var strdt = '['
// invoicenos.forEach(invoiceno => {
//     db.findOne({ InvoiceNo: invoiceno}, function (err, docs) {
//         console.log(docs)
//         strdt += JSON.stringify(docs) + (i != 3 ? ',' : '')
//         i++
//         if (i == 3) {
//             strdt += ']'
//             fs.writeFile('./transaxns.json', strdt, err => {
//                 if (err) {
//                     console.error(err)
//                     return
//                 }
//                 //file written successfully
//             })
//         }
//     })
// })
// console.log(tr_data)
axios.post('https://biz1pos.azurewebsites.net/api/Receipt/ordertransaction', tr_data).then(res => {
    console.log(`statusCode: ${res.data.status}`)
    console.log(res.data.error)
}).catch(error => {
    // console.error(error)
})