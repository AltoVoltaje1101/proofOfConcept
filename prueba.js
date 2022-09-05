const fs = require('fs')
const { google } = require('googleapis')
async function uploadFile(){


const GOOGLE_API_FOLDER_ID = '1lBDtamDiRJDK1EQRKQp0TDoKRYuAYUwr'
    try{
        const auth = new google.auth.GoogleAuth({
            keyFile: 'googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const driveService = google.drive({
            version: 'v3',
            auth
        })

        const fileMetaData = {
            'name': 'archivo.txt',
            'parents': [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'text/txt',
            body: fs.createReadStream('archivo.txt')
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        return response.data.id

    }catch(err){
        console.log('Upload file error', err)
    }
}

uploadFile().then(data => {
    console.log(data)
})
