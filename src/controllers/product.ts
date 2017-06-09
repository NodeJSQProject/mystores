"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import { default as Product } from "../models/Product";

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
export let ListItems = (req: Request, res: Response) => {
    const products = Product.find();
    res.render("product/addItemForm", {
        title: "API Examples"
    });
};
/**
 * add new items 
 */
export let addItem = (req: Request, res: Response, next: NextFunction) => {
    const product = new Product({
        productId: req.body.productID,
        name: req.body.name,
        namlinkAmazone: req.body.namlinkAmazone,
        vietnamPrice: req.body.vietnamPrice,
        japanPrice: req.body.japanPrice,
        category: req.body.category,
        productInfor: req.body.productInfor
    });

    product.save((err) => {
        if (err) { return next(err); }
        req.logIn(product, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    });
};
