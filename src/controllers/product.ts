"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import * as uuidV1 from "uuid/v1";

import { Response, Request, NextFunction } from "express";
import { default as Product } from "../models/Product";
import * as formidable from "formidable";

/**
 * GET /api
 * List of API examples.
 */
export let newFormItem = (req: Request, res: Response) => {
    res.render("product/addItemForm", {
        title: "API Examples"
    });
};

/**
 * List of all items
 */
export async function listItems(req: Request, res: Response) {
    const items = await getListItem();
    console.log(items);
    res.render("product/addItemForm", {
        title: "API Examples"
    });
}

async function getListItem() {
    try {
        const items = await Product.find({ "delFlag": false }).exec();
        return items;
    } catch (err) {
        throw err;
    }
}
/**
 * add new items
 */
export let addItem = (req: Request, res: Response, next: NextFunction) => {
    console.log("pos here ");
    const product = {
        image: "",
        productId: "",
        name: "",
        productInfor: ""
    };

    const form = new formidable.IncomingForm();
    let allowed = true;
    form.parse(req);
    form.onPart = function (part) {
        if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
            this.handlePart(part);
        } else {
            allowed = false;
        }
    };
    form.on("file", function (name: String, file: any) {
        // console.log('Uploaded ' + file.name);
    });
    form.on("fileBegin", function (name: String, file: any) {
        const imageName = uuidV1({
            node: undefined,
            clockseq: 0x1234,
            msecs: new Date().getTime(),
            nsecs: 1006
        });

        file.path = "./src/public/images/items/" + imageName + file.name.substring(file.name.length - 4);
        product.image = "images/" + imageName + file.name.substring(file.name.length - 4);
    });

    form.on("field", function (name: String, field: undefined) {
        if (name == "productId") {
            product.productId = field;
        } else if (name == "name") {
            product.name = field;
        } else if (name == "productInfor") {
            product.productInfor = field;
        }
    });

    form.on("end", function () {
        console.log("comhere??");
        if (allowed == true) {
            const item = new Product(product);
            item.save(function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.redirect("/");
                }
            });
        } else {
            res.render("error", {
                title: "Express",
                message: "only accept .mp3, .mp4"
            });
        }
    });
};
