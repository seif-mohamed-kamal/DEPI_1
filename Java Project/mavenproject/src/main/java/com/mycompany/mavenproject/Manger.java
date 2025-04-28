/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mavenproject;

import java.io.*;
import java.util.*;


public class Manger {
    
    
    private String supplier_id;
    private String supplier_name;
    private String category;
    private double cost; // Cost price of the product
    private double price; // Selling price of the product
    private static List<Manger> Categories = new ArrayList<>();
    private static double totalProfit = 0; // To keep track of total profit

    // Default constructor
    public Manger() {}

    // Parameterized constructor
    public Manger(String supplier_id, String supplier_name, String category, double cost, double price) {
        this.supplier_id = supplier_id;
        this.supplier_name = supplier_name;
        this.category = category;
        this.cost = cost;
        this.price = price;
        Categories.clear();
        Categories.add(this);
//        appendToFileManger();
    }

    public static void addCategory(String supplier_id, String supplier_name, String category, double cost, double price) {
        Manger m = new Manger(supplier_id, supplier_name, category, cost, price);
    }

    private static void appendToFileManger() {
        File originalFile = new File("category.txt");

        try (PrintWriter output = new PrintWriter(new FileWriter(originalFile, true))) {
            for (Manger product : Categories) {
                output.println(product.toString()); // Write the object to the file
            }
            System.out.println("Category has been appended to category.txt");
        } catch (IOException e) {
            System.err.println("An error occurred while writing to the file: " + e.getMessage());
        }
    }

    public static void readFromFileManger() throws FileNotFoundException {
        try {
            File myObj = new File("category.txt");
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

    public static boolean updateCategory_supplier(String supplier_id, String newSupplierName, String newCategory, double newCost, double newPrice) {
        File originalFile = new File("category.txt");
        File tempFile = new File("temp.txt");
        boolean updated = false;

        try (
             BufferedReader reader = new BufferedReader(new FileReader(originalFile));
             PrintWriter writer = new PrintWriter(new FileWriter(tempFile))) {

            String line;
            while ((line = reader.readLine()) != null) {
                // Parse the line to check for a match with supplier_id
                if (line.startsWith("supplier_id=" + supplier_id)) {
                    // Update the line with new details
                    line = "supplier_id=" + supplier_id + ", supplier_name=" + newSupplierName + ", category=" + newCategory + ", cost=" + newCost + ", price=" + newPrice;
                    updated = true;
                }
                writer.println(line); // Write updated or unchanged lines to the temp file
            }

            if (updated) {
                System.out.println("Category for supplier_id '" + supplier_id + "' updated successfully.");
            } else {
                System.out.println("Supplier with supplier_id '" + supplier_id + "' not found.");
            }

        } catch (IOException e) {
            System.err.println("An error occurred while updating the category: " + e.getMessage());
        }

        // Replace the original file with the updated temp file
        if (updated) {
            if (originalFile.delete() && tempFile.renameTo(originalFile)) {
                System.out.println("File updated successfully.");
            } else {
                System.err.println("Failed to update the file.");
            }
        } else {
            tempFile.delete(); // Delete temp file if no update was made
        }

        return updated;
    }

    public static void deleteCategory_supplier(String supplier_id) {
        File originalFile = new File("category.txt");
        File tempFile = new File("temp.txt");
        boolean deleted = false;

        try (
             BufferedReader reader = new BufferedReader(new FileReader(originalFile));
             PrintWriter writer = new PrintWriter(new FileWriter(tempFile))) {

            String line;
            while ((line = reader.readLine()) != null) {
                // Skip writing the line if it matches the supplier_id to be deleted
                if (line.startsWith("supplier_id=" + supplier_id)) {
                    deleted = true; // Mark as deleted
                    continue; // Skip this line
                }
                writer.println(line); // Write all other lines to the temp file
            }

            if (deleted) {
                System.out.println("Category for supplier_id '" + supplier_id + "' deleted successfully.");
            } else {
                System.out.println("Supplier with supplier_id '" + supplier_id + "' not found.");
            }

        } catch (IOException e) {
            System.err.println("An error occurred while deleting the category: " + e.getMessage());
        }

        // Replace the original file with the updated temp file
        if (deleted) {
            if (originalFile.delete() && tempFile.renameTo(originalFile)) {
                System.out.println("File updated successfully.");
            } else {
                System.err.println("Failed to update the file.");
            }
        } else {
            tempFile.delete(); // Delete temp file if no deletion was made
        }
    }

    // Calculate profit for the current supplier
    public double calculateProfit() {
        return price - cost; // profit is the difference between selling price and cost
    }

    // Add profit from this supplier to total profit
    public static void addProfitFromSupplier(Manger m) {
        totalProfit += m.calculateProfit();
    }

    // Get total profit
    public static double getTotalProfit() {
        return totalProfit;
    }

    @Override
    public String toString() {
        return "supplier_id=" + supplier_id + ", supplier_name=" + supplier_name + ", category=" + category + ", cost=" + cost + ", price=" + price;
    }
}
