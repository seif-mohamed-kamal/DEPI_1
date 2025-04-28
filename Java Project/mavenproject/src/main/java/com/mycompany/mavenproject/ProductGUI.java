/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mavenproject;

import javax.swing.*;
import java.awt.*;
import java.io.*;
import java.util.*;

public class ProductGUI {
    private static final int LOW_STOCK_THRESHOLD = 100;

    public static void main(String[] args) {
        // Create the main frame
        JFrame frame = new JFrame("Product Management");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(800, 600);

        // Create a panel for input fields and buttons
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(10, 2)); // Adjusted layout to fit all components

        // Create labels and text fields for product information
        JLabel idLabel = new JLabel("Product ID:");
        JTextField idField = new JTextField(15);
        JLabel nameLabel = new JLabel("Name:");
        JTextField nameField = new JTextField(15);
        JLabel categoryLabel = new JLabel("Category:");
        JTextField categoryField = new JTextField(15);
        JLabel stockLabel = new JLabel("Stock:");
        JTextField stockField = new JTextField(15);
        JLabel priceLabel = new JLabel("Price:");
        JTextField priceField = new JTextField(15);
        JLabel supplierLabel = new JLabel("Supplier:");
        JTextField supplierField = new JTextField(15);

        // Search fields
        JLabel searchLabel = new JLabel("Search by ID:");
        JTextField searchField = new JTextField(15);
        JButton searchButton = new JButton("Search");

        // Buttons for actions
        JButton addButton = new JButton("Add Product");
        JButton updateButton = new JButton("Update Product");
        JButton deleteButton = new JButton("Delete Product");
        JButton loadButton = new JButton("Load Products");
        JButton notifyButton = new JButton("Notify Low Stock");
        // Add this new button for opening the ProductGUI

        // Add labels and text fields to the panel
        panel.add(idLabel);
        panel.add(idField);
        panel.add(nameLabel);
        panel.add(nameField);
        panel.add(categoryLabel);
        panel.add(categoryField);
        panel.add(stockLabel);
        panel.add(stockField);
        panel.add(priceLabel);
        panel.add(priceField);
        panel.add(supplierLabel);
        panel.add(supplierField);
        panel.add(searchLabel);
        panel.add(searchField);

        // Create a text area to display product information
        JTextArea textArea = new JTextArea();
        textArea.setEditable(false); // Make the text area read-only
        JScrollPane scrollPane = new JScrollPane(textArea);

        // Panel for buttons
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(addButton);
        buttonPanel.add(updateButton);
        buttonPanel.add(deleteButton);
        buttonPanel.add(loadButton);
        buttonPanel.add(notifyButton);
        buttonPanel.add(searchButton);


        // Add components to the frame
        frame.getContentPane().add(panel, BorderLayout.NORTH);
        frame.getContentPane().add(scrollPane, BorderLayout.CENTER);
        frame.getContentPane().add(buttonPanel, BorderLayout.SOUTH);

        // Show the frame
        frame.setVisible(true);

        // Load Products into the text area
        loadButton.addActionListener(e -> {
            loadProductsFromFile(textArea);
        });

        // Add Product functionality
        addButton.addActionListener(e -> {
            try {
                int id = Integer.parseInt(idField.getText());
                String name = nameField.getText();
                String category = categoryField.getText();
                int stock = Integer.parseInt(stockField.getText());
                double price = Double.parseDouble(priceField.getText());
                String supplier = supplierField.getText();
                Product newProduct = new Product(id, name, category, stock, (int)price, supplier);
                appendToFile(newProduct);

                // Clear fields after adding
                idField.setText("");
                nameField.setText("");
                categoryField.setText("");
                stockField.setText("");
                priceField.setText("");
                supplierField.setText("");
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(frame, "Please enter valid input for ID, stock, and price.", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        // Update Product functionality
        updateButton.addActionListener(e -> {
            try {
                int id = Integer.parseInt(idField.getText());
                String name = nameField.getText();
                String category = categoryField.getText();
                int stock = Integer.parseInt(stockField.getText());
                double price = Double.parseDouble(priceField.getText());
                String supplier = supplierField.getText();

                boolean updated = Product.updateProduct(id, name, category, stock, price, supplier);
                if (updated) {
                    JOptionPane.showMessageDialog(frame, "Product updated successfully.");
                } else {
                    JOptionPane.showMessageDialog(frame, "Product not found.");
                }

                // Clear fields after updating
                idField.setText("");
                nameField.setText("");
                categoryField.setText("");
                stockField.setText("");
                priceField.setText("");
                supplierField.setText("");
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(frame, "Please enter valid input for ID, stock, and price.", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        // Delete Product functionality
        deleteButton.addActionListener(e -> {
            try {
                int id = Integer.parseInt(idField.getText());
                Product.deleteProduct(id);
                idField.setText(""); // Clear ID field after deletion
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(frame, "Please enter a valid ID.", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        // Search Product functionality
        searchButton.addActionListener(e -> {
            String searchQuery = searchField.getText().trim();
            if (!searchQuery.isEmpty()) {
                searchProductById(searchQuery, textArea);
            } else {
                JOptionPane.showMessageDialog(frame, "Please enter a product ID to search.", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        // Notify Low Stock functionality
        notifyButton.addActionListener(e -> {
            notifyLowStock(textArea);
        });
    }

    // Load products from file and display in the text area
    private static void loadProductsFromFile(JTextArea textArea) {
        File file = new File("products.txt");
        StringBuilder productsData = new StringBuilder();
        if (file.exists()) {
            try (Scanner scanner = new Scanner(file)) {
                while (scanner.hasNextLine()) {
                    String line = scanner.nextLine();
                    productsData.append(line).append("\n");
                }
            } catch (IOException e) {
                System.out.println("Error loading products: " + e.getMessage());
            }
        }
        textArea.setText(productsData.toString());
    }

    // Search product by ID in the file and display result in the text area
    private static void searchProductById(String searchQuery, JTextArea textArea) {
        File file = new File("products.txt");
        StringBuilder result = new StringBuilder();
        boolean found = false;

        if (file.exists()) {
            try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    if (line.contains("Product ID:" + searchQuery)) {
                        result.append("Product found: ").append(line).append("\n");
                        found = true;
                        break; // Exit after finding the first match
                    }
                }
            } catch (IOException e) {
                System.out.println("Error searching products: " + e.getMessage());
            }
        }

        if (found) {
            textArea.setText(result.toString()); // Show found product in text area
        } else {
            textArea.setText("Product with ID " + searchQuery + " not found.");
        }
    }

    // Notify user of low stock products and display the result in the text area
    private static void notifyLowStock(JTextArea textArea) {
        StringBuilder lowStockProducts = new StringBuilder();
        boolean lowStockFound = false;
        File file = new File("products.txt");
        if (file.exists()) {
            try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    if (line.contains("Stock: ")) {
                        String[] parts = line.split(", ");
                        for (String part : parts) {
                            if (part.startsWith("Stock: ")) {
                                int stock = Integer.parseInt(part.split(": ")[1]);
                                if (stock < LOW_STOCK_THRESHOLD) {
                                    lowStockProducts.append(line).append("\n");
                                    lowStockFound = true;
                                }
                            }
                        }
                    }
                }
            } catch (IOException e) {
                System.out.println("Error reading stock levels: " + e.getMessage());
            }
        }

        if (lowStockFound) {
            textArea.setText("Low stock products:\n" + lowStockProducts.toString());
        } else {
            textArea.setText("No low stock products found.");
        }
    }

    // Append product to file (used when adding a new product)
    private static void appendToFile(Product product) {
        try (PrintWriter writer = new PrintWriter(new FileWriter("products.txt", true))) {
            writer.println(product.toString());
        } catch (IOException e) {
            System.out.println("Error appending to file: " + e.getMessage());
        }
    }
}
