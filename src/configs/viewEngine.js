import express from 'express'

const configviewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine","ejs");
    app.set("view","./src/views")
}

export default configviewEngine;
