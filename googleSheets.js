const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require("es6-promisify")


function printScientist(scientist){
    console.log(`Name: ${scientist.name}`)
}
async function accessSpreadsheet(){
    //require(['../node_modules/es6-promisify', '../node_modules/google-spreadsheet' ], async function() {
        const creds = {
            "type": "service_account",
            "project_id": "golledge",
            "private_key_id": "f21321588e86e498b36e62d2b5a3ad1dba7d4a67",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1YvQ8oDUvz5gS\n7AuImVAkZldDaoIom2MIwaUBweFgQPbBWDpHtEIfNaW2HVWWByUZmhrPjMTMrwqr\nr5vpi54JjNY0SZpUOYUcb0FMOvIvbyUVgdH2u8rEf75BoT72kKvsy5NxdfQ7xIN6\nfjBSQHB68n0pUA4WF3FWPremLsi1PuxdxkO6f3VdRnXlpMCJZsfOc2yuqJoRbtHq\nVyAb/9NAPkBuRcXl0Xb/ykoadtS3R/E8u9l+czYqGcCpeN65D0UAD42IXejgAhkY\n+4sncSjAkY7aBajPrXKcokQpqekgLGsKLGUbweY/LKBOexG+gWTSXt1OyirNK9rC\n4X/e+lfHAgMBAAECggEAQ4mOyywT4bN4OkNtn/UF5Ce/AjkcMaZ5337Kw7a/Binq\nNt91A9HYdOpywzZ08aHDbJ72sKUHefcLEBYZBYKY25F3CI0HS6kHKSk7tPiVyJen\nxTRLS4Vs4HF4E9PIL+J6QXcjdTGoOMDY+7kUoOuhdgXoGIPYWt1rs+MyWkw9K06a\nE8vfSEz3NsRXWJacNv7spmHGF2Xkz7dOzjGxrow1c+/yVNRhZyg5mS3JxWpLAVG8\nLflhqYstXcsmylqqGBZJpvDWYVUkb5pneHxUNgAWWE5ARQiDjSnkOdTiVKAGkjbZ\nrJOn2rN4kWvqwU4ljg/GqABxvxzWzl2t2DgJLEX6kQKBgQD8brGLADZN0XD85JkC\n4VTNVZuYclAjrINPVoYaQZS/vQ3kKRtcfR5Jww40EK1kOgc6yy8L85EDjJvekuRm\nYW66b9b+w8ZiapOoHgNsU76W8kHbtqUx3vAY3F/A1IRwmddn1PB0JEFAY77o2XNh\nB+Uq48cohfxoIS2AWDAxS5gDiwKBgQC38zcEAkWidf8UHQlBrb6O4ltGjcFkBKdg\nXHYGlcRFLNASXSP3xqPEoLhHRSTaY5AtJCGm99VuYeXSQIdJ7CdlA42gGOGSntHi\nW2zQeiTKlCoNXijrX0yO8WiiqejSEqo9+/Xrkhqpn+B8Vp4p0Y7ach3TNnhNVBhp\nFYyjEQhUNQKBgQDZhCjIte4VMBxETlbq/G+uX84rlpUnqEed3djAVzJt5eJKcIF7\nOPUYalOa2aQPcVE5gEuR6NdUT50gNUNKVTqsvCJudRRFScDiZLpeZesc9rN5N/Ex\nAAGz6nE4H+fffzD1768i5Pq1GT4wNvAM9FislInQiWPt9mjW5ybf01ux8QKBgEuT\ng7ED9fQvoqNy4pC3f6lY2sN8Dk63ksUGd/9wnPkG1l4VImf0luh8V/oAMIoBigTh\n6WmePXRiiHf/xxXaDr1z3kY+sr74vabQhT6KUH9irHxdiVZbCytXh/P89wkIXiWl\nVX55wraaVzL+q3DnBlg9tn9Gy9qJiJX0IpoEr3VZAoGBAMvdMaNYiDOUU585GBwJ\nB0QwaGvHFmbGaY1vVa+Nev7stUgicAeCTGaQvdJaOXQdyAjFEqwwQR2ssM+MQ3Zp\njd4rbQHjOf1NoolNgW5TVzgMXYSQ0SV3b7/4cBSndK5U3N8slttIjZVowJ4hmx7a\ndpV4Ec3ezuDLaz4AMfGJPjnL\n-----END PRIVATE KEY-----\n",
            "client_email": "golledge@golledge.iam.gserviceaccount.com",
            "client_id": "103170260321373746614",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/golledge%40golledge.iam.gserviceaccount.com"
        }


        const doc = new GoogleSpreadsheet('1Na5qz5vZOlOMabmqhmP-RdTsZvkHRFwJUjPlvQr0w-Y')
        await promisify(doc.useServiceAccountAuth)(creds)
        const info = await promisify(doc.getInfo)()
        const sheet = info.worksheets[0]
        console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount} `)
        const rows = await promisify(sheet.getRows)({
            // offset: 1
        })
        //console.log(rows)
        rows.forEach(row => {
            printScientist(row)
        })
    //})
}

accessSpreadsheet()