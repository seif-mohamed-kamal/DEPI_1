/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.mavenproject;

import javax.swing.*;
import java.awt.*; 
import java.io.*;
import java.util.*;

public class MangerGUI {
    private static final int LOW_STOCK_THRESHOLD = 100;

    public static void main(String[] args) {
        // Create the main frame
        JFrame frame = new JFrame("Supplier Management");
        frame.setSize(1000, 700);

        // Create a panel for input fields and buttons
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(10, 2)); // Adjusted layout to fit all components

        // Create labels and text fields for supplier information
        JLabel idLabel = new JLabel("Supplier ID:");
        JTextField idField = new JTextField(15);
        JLabel nameLabel = new JLabel("Supplier Name:");
        JTextField nameField = new JTextField(15);
        JLabel categoryLabel = new JLabel("Category:");
        JTextField categoryField = new JTextField(15);
        JLabel costLabel = new JLabel("Cost:");
        JTextField costField = new JTextField(15);
        JLabel priceLabel = new JLabel("Price:");
        JTextField priceField = new JTextField(15);

        // Search fields
        JLabel searchLabel = new JLabel("Search by Supplier ID:");
        JTextField searchField = new JTextField(15);
        JButton searchButton = new JButton("Search");

        // Buttons for actions
        JButton addButton = new JButton("Add Supplier");
        JButton updateButton = new JButton("Update Supplier");
        JButton deleteButton = new JButton("Delete Supplier");
        JButton loadButton = new JButton("Load Suppliers");
        JButton profitButton = new JButton("Show Total Profit");
        JButton offerButton = new JButton("Offer"); // New button for the offer
        JButton openProductGUIButton = new JButton("Open Product Management");
        JButton goToProductButton = new JButton("Go to Product Management");

        // Add labels and text fields to the panel
        panel.add(idLabel);
        panel.add(idField);
        panel.add(nameLabel);
        panel.add(nameField);
        panel.add(categoryLabel);
        panel.add(categoryField);
        panel.add(costLabel);
        panel.add(costField);
        panel.add(priceLabel);
        panel.add(priceField);
        panel.add(searchLabel);
        panel.add(searchField);

        // Create a text area to display supplier information
        JTextArea textArea = new JTextArea();
        textArea.setEditable(false); // Make the text area read-only
        JScrollPane scrollPane = new JScrollPane(textArea);

        // Panel for buttons
        JPanel buttonPanel = new JPanel();
        buttonPanel.add(addButton);
        buttonPanel.add(updateButton);
        buttonPanel.add(deleteButton);
        buttonPanel.add(loadButton);
        buttonPanel.add(profitButton);
        buttonPanel.add(searchButton);
        buttonPanel.add(offerButton); // Add the new offer button
        buttonPanel.add(goToProductButton);


        // Add components to the frame
        frame.getContentPane().add(panel, BorderLayout.NORTH);
        frame.getContentPane().add(scrollPane, BorderLayout.CENTER);
        frame.getContentPane().add(buttonPanel, BorderLayout.SOUTH);

        // Show the frame
        frame.setVisible(true);

        // Load Suppliers into the text area
        loadButton.addActionListener(e -> {
            loadSuppliersFromFile(textArea);
        });
        goToProductButton.addActionListener(e -> {
        frame.setVisible(false);  // Hide Manger GUI
        ProductGUI.main(args);    // Open Product GUI
    });


        // Add Supplier functionality
        addButton.addActionListener(e -> {
            try {
                String id = idField.getText();
                String name = nameField.getText();
                String category = categoryField.getText();
                double cost = Double.parseDouble(costField.getText());
                double price = Double.parseDouble(priceField.getText());
                Manger newSupplier = new Manger(id, name, category, cost, price);
                appendToFile(newSupplier);

                // Clear fields after adding
                idField.setText("");
                nameField.setText("");
                categoryField.setText("");
                costField.setText("");
                priceField.setText("");
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(frame, "Please enter valid input for cost and price.", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        // Update Supplier functionality
        updateButton.addActionListener(e -> {
            try {
                String id = idField.getText();
                String name = nameField.getText();
                String category = categoryField.getText();
                double cost = Double.parseDouble(costField.getText());
                double price = Double.parseDouble(priceField.getText());

                boolean updated = Manger.updateCategory_supplier(id, name, category, cost, price);
                if (updated) {
                    JOptionPane.showMessageDialog(frame, "Supplier updated successfully.");
                } else {
                    JOptionPane.showMessageDialog(frame, "Supplier not found.");
                }

                // Clear fields after updating
                idField.setText("");
                nameField.setText("");
                categoryField.setText("");
                costField.setText("");
                priceField.setText("");
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(frame, "Please enter valid input for cost and price.", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        // Delete Supplier functionality
        deleteButton.addActionListener(e -> {
            try {
                String id = idField.getText();
                Manger.deleteCategory_supplier(id);
                idField.setText(""); // Clear ID field after deletion
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(frame, "Please enter a valid Supplier ID.", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        // Search Supplier functionality
        searchButton.addActionListener(e -> {
            String searchQuery = searchField.getText().trim();
            if (!searchQuery.isEmpty()) {
                searchSupplierById(searchQuery, textArea);
            } else {
                JOptionPane.showMessageDialog(frame, "Please enter a supplier ID to search.", "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        // Show Total Profit functionality
        profitButton.addActionListener(e -> {
            double totalProfit = getTotalProfit(); // Calculate the profit by reading suppliers
            textArea.setText("Total Profit: " + totalProfit);
        });

        // Offer functionality
        offerButton.addActionListener(e -> {
            // Display the offer message in the text area
            textArea.setText("Product: Sweets\nDiscount: 50%\nStart from Date: 11-12-2024\nEnd on Date: 20-12-2024");
        });
    }

    // Load suppliers from file and display in the text area
    private static void loadSuppliersFromFile(JTextArea textArea) {
        File file = new File("category.txt");
        StringBuilder suppliersData = new StringBuilder();
        if (file.exists()) {
            try (Scanner scanner = new Scanner(file)) {
                while (scanner.hasNextLine()) {
                    String line = scanner.nextLine();
                    suppliersData.append(line).append("\n");
                }
            } catch (IOException e) {
                System.out.println("Error loading suppliers: " + e.getMessage());
            }
        }
        textArea.setText(suppliersData.toString());
    }

    // Search supplier by ID in the file and display result in the text area
    private static void searchSupplierById(String searchQuery, JTextArea textArea) {
        File file = new File("category.txt");
        StringBuilder result = new StringBuilder();
        boolean found = false;

        if (file.exists()) {
            try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    if (line.contains("supplier_id=" + searchQuery)) {
                        result.append("Supplier found: ").append(line).append("\n");
                        found = true;
                        break; // Exit after finding the first match
                    }
                }
            } catch (IOException e) {
                System.out.println("Error searching suppliers: " + e.getMessage());
            }
        }

        if (found) {
            textArea.setText(result.toString()); // Show found supplier in text area
        } else {
            textArea.setText("Supplier with ID " + searchQuery + " not found.");
        }
    }

    // Append supplier to file (used when adding a new supplier)
    private static void appendToFile(Manger supplier) {
        try (PrintWriter writer = new PrintWriter(new FileWriter("category.txt", true))) {
            writer.println(supplier.toString());
        } catch (IOException e) {
            System.out.println("Error appending to file: " + e.getMessage());
        }
    }

    // Calculate the total profit based on suppliers in the file
    private static double getTotalProfit() {
        File file = new File("category.txt");
        double totalProfit = 0.0;

        if (file.exists()) {
            try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    // Assuming the line has cost and price in the format: cost=xx, price=xx
                    String[] parts = line.split(", ");
                    double cost = 0;
                    double price = 0;

                    for (String part : parts) {
                        if (part.startsWith("cost=")) {
                            cost = Double.parseDouble(part.split("=")[1]);
                        } else if (part.startsWith("price=")) {
                            price = Double.parseDouble(part.split("=")[1]);
                        }
                    }

                    // Add profit from this supplier
                    totalProfit += (price - cost);
                }
            } catch (IOException e) {
                System.out.println("Error calculating total profit: " + e.getMessage());
            }
        }

        return totalProfit;
    }
}
