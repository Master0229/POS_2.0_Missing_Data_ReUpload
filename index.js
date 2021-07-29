var Datastore = require('nedb')
const fs = require('fs')

var db = new Datastore({ filename: './missingorders/Velachery/orderlogs.db' });
db.loadDatabase(function (err) {    // Callback is optional
    // Now commands will be executed
});


var regs = [
    /3720210727\/1/
    
]
var i = 0
var strdt = '['
var arr = []
regs.forEach(reg => {
    db.find({ orderjson: { $regex: reg } }, function (err, docs) {
        i++
        docs.forEach(doc => {
            var order = JSON.parse(doc.orderjson)
            if ((order.PaidAmount > 0 && order.Transactions.length > 0) || order.PaidAmount == 0) {
                doc.invoiceno = order.InvoiceNo
                arr.push(doc)
                console.log(order.InvoiceNo, order.BillAmount, order.PaidAmount, order.Transactions.length)
            }
        })
        // arr = [...arr, ...[docs]]
        if (i == regs.length) {
            // strdt += ']'
            fs.writeFile('./data.json', JSON.stringify(arr), err => {
                if (err) {
                    console.error(err)
                    return
                }
                //file written successfully
            })
        }
    })
})

