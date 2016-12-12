package com.company;

import spark.ModelAndView;
import spark.Spark;
import spark.template.mustache.MustacheTemplateEngine;

import java.util.HashMap;

public class Main {
    public static Products products;

    public static void main(String[] args) {

        Spark.init();

        Spark.get(

                "/api/hello",
                ((request, response) -> {


                    return "hello world";

                })

        );

        Spark.get(

                "/api/products",
                ((request, response) -> {
                    //listing of our products, which links to their description



                    return "hello world";

                })

        );

        Spark.get(

                "/api/get-cart",
                ((request, response) -> {
                    //will be linked for all pages, will show the current attributes of the session
                   //will have the remove, add, and change

                    return "hello world";

                })

        );

        Spark.get(

                "/api/get-product",
                ((request, response) -> {

                    //switch or if statements?? on which product customer is inquiring upon (depends on session attribute?


                    return "hello world";

                })

        );

        Spark.get(

                "/api/tax",
                ((request, response) -> {


                    return "hello world";

                })

        );

        Spark.post(

                "/api/add-product",
                ((request, response) -> {
                    //a button that allows the user to add as many to their cart as needed


                    return "hello world";

                })

        );

        Spark.post(

                "/api/remove-product",
                ((request, response) -> {


                    return "hello world";

                })

        );

        Spark.post(

                "/api/change-quantity",
                ((request, response) -> {


                    return "hello world";

                })

        );









    }
}
