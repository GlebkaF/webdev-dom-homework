module.exports = {
    entry: "./main.js", // Входной файл, в котором мы пишем свой код
    output: {
        filename: "mainWebpack.js" // Выходной файл, который подключаем к HTML
					// Обратите внимание, сохранится он по пути "./dist/main.js"
    }
}