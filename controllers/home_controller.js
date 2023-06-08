// in large scale project controller is set of action 


module.exports.home = function (req, res) {
    //  return res.end("<h1>Epress is up for Codeial</h1>")   
    return res.render('home',{
        title: "Home",
    })
}