package org.example;

import com.google.gson.Gson;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class GsonParser {
    public static Form parseString(String formJSON){
        Form form = null;
        try {
            form = (new Gson()).fromJson(formJSON, Form.class);
        } catch (Exception e) {   
            System.err.println("JSON Parse error");
        }
        return form;
    }
    
    public static Form parseFile(String path){
        Gson gson = new Gson();
        listFilesForFolder(new File("."));
        try (FileReader reader = new FileReader(path)) {
            return gson.fromJson(reader, Form.class);
        } catch (IOException e) {   
            System.err.println("JSON Parser error");
            throw new RuntimeException(e);
        }
    }
    
    public static void listFilesForFolder(final File folder) {
    for (final File fileEntry : folder.listFiles()) {
        if (fileEntry.isDirectory()) {
            listFilesForFolder(fileEntry);
        } else {
            System.out.println(fileEntry.getAbsolutePath());
        }
    }
}

}


