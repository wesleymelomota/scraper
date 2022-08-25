const playwrigth = require('playwright')
const fs = require('fs')

/*
após rodar o arquivo Scraper.js vai ser gerado um arquivo com o nome NoteBooksLenovo.json.
 voçê terá que rodar o comando npm start para rodar o servidor json
os dados vão ficar disponivel para consumo no http:\\localhost:3001/NoteBook_lenovo ;)


*/

const Bot = async () => {
    const options = {
        force: true
    }
    const browser = await playwrigth.chromium.launch()
    const page = await browser.newPage() 
    await page.goto("https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops", {timeout: 60000})
    const noteLenovo = await page.$$eval('.caption', (allItem) => {
        const lenovo = []
        allItem.forEach((note)=> {
            const titulo = note.querySelector('.title').innerText
            if(titulo.slice(0, 6) == 'Lenovo'){
                const titulo = note.querySelector('.title').innerText
                const descricao = note.querySelector('.description').innerText
                const preco = note.querySelector('.price').innerText
                lenovo.push({titulo, descricao, preco})
                
            }
        })
        return lenovo
    }, options)
    console.log(noteLenovo)

    fs.writeFile('NoteBooksLenovo.json', JSON.stringify({'Notebook_lenovo': noteLenovo}, null, 2), err => {
        if(err) throw new Error('Deu algo errado :(')
        console.log('Arquivo criado')
    })
    
    page.waitForTimeout(20000)
    await browser.close()
    
}

Bot()