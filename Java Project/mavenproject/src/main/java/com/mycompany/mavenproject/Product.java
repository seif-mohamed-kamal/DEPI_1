/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mavenproject;

/**
 *
 * @author HP
 */
import java.io.*;
import java.io.IOException;
import java.util.*;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.io.PrintWriter;
//import java.util.logging.Level;
//import java.util.logging.Logger;

class Product implements appendTo{

    // ATTRIBUTES
    private int id;
    private String name;
    private String category;
    private int stock;
    private double price;
    private String supplier;
    private Date startDate;
    private Date expireDate;
    private static List<Product> prooducts = new ArrayList<>();  
    private static final int LOW_STOCK_THRESHOLD = 100; // Define a low stock threshold

    public Product() {
    }
    // Constructor
    public Product(int id, String name, String category, int stock, int price, String supplier) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.stock = stock;
        this.price = price;
        this.supplier = supplier;
        this.startDate = new Date();
        this.expireDate = calculateExpireDate(startDate);
        prooducts.clear();
        prooducts.add(this); // Add the current instance to the list
//        appendToFile();
    }

    // To Calculate Expire Date
    private Date calculateExpireDate(Date startDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.YEAR, 2); // Add 2 years
        return calendar.getTime();
    }

    @Override
    public String toString() {
        return "Product ID:" + id + ", Name: " + name + ", Category: " + category
                + ", Stock: " + stock + ", Price: " + price + ", Supplier: " + supplier
                + ", Start Date: " + startDate + ", Expire Date: " + expireDate;
    }
    // Getters for the attributes
    private int getId() {
        return id;
    }


    private String getCategory() {
        return category;
    }

    private int getStock() {
        return stock;
    }

    private double getPrice() {
        return price;
    }

    private String getSupplier() {
        return supplier;
    }

    private Date getStartDate() {
        return startDate;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    //ADD product
    static void addProduct(int id, String name, String category, int stock, int price, String supplier) {
        Product newProduct = new Product(id, name, category, stock, price, supplier);
    }


    //Search In File
    public static void searchProductById(String name) {
     try (BufferedReader reader = new BufferedReader(new FileReader("products.txt"))) {
         String line;
         boolean found = false;
         while ((line = reader.readLine()) != null) {
             if (line.contains("Name: " + name + ", ")) {
                found = true;
                break;
             }
         }
         if (found) {
             System.out.println("Product with name is " + name + " found succefully");
         }else{
            System.out.println("Product with name is " + name + " not found");;
        }   

     } catch (IOException e) {
         System.out.println("Error reading the file: " + e.getMessage());
     }
    }  
    
    //Write In The File
    public void appendToFile() {
        File originalFile = new File("products.txt");
        try (PrintWriter output = new PrintWriter(new FileWriter(originalFile, true))) {
            for (Product product : prooducts) {
                output.println(product.toString()); // Use println to ensure each product is written on a new line
            }
            output.close();
            System.out.println("Product has been appended to products.txt");
        } catch (IOException e) {
            System.err.println("An error occurred while writing to the file: " + e.getMessage());
        }
    }
    //Read from The a File
    public static void readFromFile() throws FileNotFoundException{
    try {
      File myObj = new File("products.txt");
      Scanner myReader = new Scanner(myObj);
      while (myReader.hasNextLine()) {
        String data = myReader.nextLine();
        System.out.println(data);
      }
      myReader.close();
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
     }
    }
    
    //Update Product
    public static boolean updateProduct(int id, String name, String category, int stock, double price, String supplier) {
        File originalFile = new File("products.txt");
        File tempFile = new File("temp.txt");
        boolean updated = false;
        try (BufferedReader reader = new BufferedReader(new FileReader(originalFile));
            PrintWriter writer = new PrintWriter(new FileWriter(tempFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.startsWith("Product ID:" + id + ",")) {
                    // Parse the existing product details to retain the original start and expire dates
                    String[] parts = line.split(", ");
                    String originalStartDate = null;
                    String originalExpireDate = null;
                    // Extract the original start and expire dates
                    for (String part : parts) {
                        if (part.startsWith("Start Date:")) {
                            originalStartDate = part.split(": ")[1];
                        } else if (part.startsWith("Expire Date:")) {
                            originalExpireDate = part.split(": ")[1];
                        }
                    }
                    // Update the product details while keeping the original dates
                    line = "Product ID:" + id + ", Name: " + name + ", Category: " + category
                            + ", Stock: " + stock + ", Price: " + price + ", Supplier: " + supplier
                            + ", Start Date: " + originalStartDate + ", Expire Date: " + originalExpireDate;
                    updated = true; // Mark that an update has occurred
                }
                // Write the line to the temporary file (including the updated line if applicable)
                writer.println(line);
            }
        } catch (IOException e) {
            System.err.println("An error occurred while updating the product: " + e.getMessage());
        }

        // Replace the original file with the updated temp file
        if (updated) {
            originalFile.delete();
            tempFile.renameTo(originalFile);
        } else {
            tempFile.delete(); // Delete temp file if no update was made
        }
        return updated;
    }
    
    // Delete product by ID
    public static void deleteProduct(int id) {
        File originalFile = new File("products.txt");
        File tempFile = new File("temp.txt");
        boolean deleted = false;
        try (
             BufferedReader reader = new BufferedReader(new FileReader(originalFile));
             PrintWriter writer = new PrintWriter(new FileWriter(tempFile))) {

            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains("Product ID:" + id )) {
                    deleted = true; // Mark as deleted
                    break; // Skip writing this line to the temp file
                }
                writer.println(line);
            }
        if (deleted) {
            System.out.println("Product with name is " + id + " deleted successfully");
        }
        else{
        System.out.println("Product with name is " + id + " not found");
        }

        } catch (IOException e) {
            System.err.println("An error occurred while deleting the product: " + e.getMessage());
        }

        // Replace the original file with the updated temp file
        if (deleted) {
            originalFile.delete();
            tempFile.renameTo(originalFile);
        } else {
            tempFile.delete(); // Delete temp file if no deletion was made
        }
    }
    
    //Notify The User For a Low Stoch 
    public static void notifyLowStock() {
        try (BufferedReader reader = new BufferedReader(new FileReader("products.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Check if the line contains stock information
                if (line.contains("Stock: ")) {
                    String[] parts = line.split(", ");
                    for (String part : parts) {
                        if (part.startsWith("Stock: ")) {
                            int stock = Integer.parseInt(part.split(": ")[1]);
                            if (stock < LOW_STOCK_THRESHOLD) {
                                // Extract product name for notification
                                String name = line.split(", ")[1].split(": ")[1];
                                System.out.println("Warning: Stock for product '" + name + "' is low (Current stock: " + stock + ")");
                            }
                        }
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("An error occurred while checking stock levels: " + e.getMessage());
        }
    }

    
}
