const axios = require('axios')
var data = require('./data.json')
var errors = []
const fs = require('fs')
var i = 0
data.forEach((datum, index) => {
    // console.log(datum?.event)
    try {
        var orderjson = JSON.parse(datum?.orderjson)
        var jsonstring = datum?.orderjson
        // orderjson.Items.forEach(item => {
        //     console.log(item.showname, item.TotalAmount)
        // })
        console.log(orderjson.BillAmount)
        // console.log(datum?.event, orderjson ? JSON.parse(orderjson).InvoiceNo: null)
        axios.post('https://biz1pos.azurewebsites.net/api/POSOrder/saveorder_3', {
            OrderJson: jsonstring
        }).then(res => {
            console.log(`statusCode: ${res.data.status}`)
            console.log(`message: ${res.data.message}`)

            if (res.data.error) {
                console.log(datum.invoiceno)
                datum.error = res.data.error
                errors.push(datum)
            }
            i++
            console.log(i, data.length)
            if (i == data.length) {
                console.log(errors.length)
                fs.writeFile('./errororders.json', JSON.stringify(errors), err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //file written successfully
                })
            }
        }).catch(error => {
            // console.error(error)
        })
    } catch (error) {
        console.log(error)
    }
})
function saveorder(orderjson) {
    axios.post('https://biz1pos.azurewebsites.net/api/POSOrder/saveorder_3', {
        OrderJson: orderjson
    }).then(res => {
        console.log(`statusCode: ${res.data.status}`)
        console.log('res.data.error')
    }).catch(error => {
        // console.error(error)
    })
}
