package com.company;

import jodd.json.JsonParser;
import jodd.json.JsonSerializer;
import spark.Session;
import spark.Spark;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

public class Main {
    public static ArrayList<Products> products = new ArrayList<>();
    public static HashMap<Integer, Integer> cart = new HashMap();

    public static void main(String[] args) throws IOException {

        File productData = new File("products.txt");
        Scanner scanner = new Scanner(productData);
        while(scanner.hasNext()) {
            String read = scanner.nextLine();
            String p [] = read.split(";");
            Products prod = new Products(Integer.parseInt(p[0]), p[1], p[2], Double.parseDouble(p[3]), p[4]);
            products.add(prod);
        }

        Spark.port(getHerokuAssignedPort()); 

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

                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(products); /* is now a vehicle for what is in it*/
                    return json;


                })

        );

        Spark.get(

                "/api/get-cart",
                ((request, response) -> {
                    //will be linked for all pages, will show the current attributes of the session
                   //will have the remove, add, and change



                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(cart); /* is now a vehicle for what is in it*/
                    return json;

                    //String quantity = id += request.queryParams("userSelection");

                })

        );

        Spark.get(

                "/api/get-product",
                ((request, response) -> {



                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(products); /* is now a vehicle for what is in it*/
                    return json;

                    //query parameter from url

                    //switch or if statements?? on which product customer is inquiring upon (depends on session attribute?)


                })

        );

        Spark.get(

                "/api/tax",
                ((request, response) -> {


                    String zip = request.queryParams("zipCode");

                    //String total = request.queryParams("subtotal");

                    //double subtotal = Double.parseDouble(total);


                    double total = 0;

                    for(Map.Entry<Integer, Integer> entry : cart.entrySet()) {
                        Integer productId = entry.getKey();
                        Integer productQuantity = entry.getValue();

                        Products x = new Products(); //Integer.parseInt(id), "name", "description", Double.parseDouble("price"), "imageName");
                        for(Products temp : products) {
                            if(temp.id == productId) {
                                x = temp;
                            }

                        }
                        total += x.getPrice() * productQuantity;

                    }


                    URL taxUrl = new URL("https://taxrates.api.avalara.com/postal?postal=" + zip + "&country=US&apikey=ODeb/KozEMOsBvpNX3L40Tekut5ozlAY8uYnAUklC4Kg6A0IQIY5Lx6lYUCez3WAEHvNy91SUBzaooq6mf5/Mg==");

                    URLConnection uc = taxUrl.openConnection();
                    BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    while(in.ready()) {
                        sb.append(in.readLine());
                    }
                    String inputLine = in.readLine(); //the url object that we created

                    //System.out.println(inputLine);

                    JsonParser parser = new JsonParser();
                    TaxListing listing = parser.parse(sb.toString(), TaxListing.class);
                    listing.setTotal(total);

                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.include("*").serialize(listing); /* is now a vehicle for what is in it*/
                    return json;
                })

        );

        Spark.post(

                "/api/add-product",
                ((request, response) -> {
                    //a button that allows the user to add as many to their cart as needed
                    String id = request.queryParams("id");

                    if(id == null) {
                        throw new Exception("No item selected");
                    }

                    int idId = Integer.parseInt(id);

                    cart.put(idId, 1);

                    return "";

                })

        );

        Spark.post(

                "/api/remove-product",
                ((request, response) -> {
                    String id = request.queryParams("id");

                    if(id == null) {
                        throw new Exception("No item selected");
                    }

                    int idId = Integer.parseInt(id);

                    cart.remove(idId);

                    return "";

                })

        );

        Spark.post(

                "/api/change-quantity",
                ((request, response) -> {
                    String id = request.queryParams("id");

                    if(id == null) {
                        throw new Exception("No item selected");
                    }

                    int idId = Integer.parseInt(id);

                    cart.get(idId);

                    String newQuantity = request.queryParams("newQuantity");
                    int quantity = Integer.parseInt(newQuantity);

                    cart.put(idId, quantity); // puts back the product with the idId # with an Integer(quantity) of z

                    return "";


                })

        );











    }

    private static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }


}
