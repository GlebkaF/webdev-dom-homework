export function sanitazeHtml(string){
    return string.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}