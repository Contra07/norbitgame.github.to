package ru.practicat;

import java.io.*;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

import rawhttp.core.*;

public class Handler extends Thread {
    private static final String FAIL = "Fail";
    private static final String SUCCESS = "OK";
    private final String origin;
    private final Socket socket;
    private final MailSender mail;

    Handler(Socket socket, String origin, MailSender mail) {
        this.socket = socket;
        this.mail = mail;
        this.origin = origin;
        System.out.print("Server accepted connection form: ");
        System.out.println(socket.getInetAddress() + ":" + socket.getPort());
    }

    @Override
    public void run() {
        try (var input = socket.getInputStream(); var output = socket.getOutputStream()) 
        {
            RawHttpRequest response = GetResponse(input);
            String url = getRequestUrl(response);
            System.out.println("Resource: " + url);
            if (
                (url.equals("/form") || url.equals("/form.html")) 
                && mail.sendForm(this.getRequestBody(response))
               ){
               sendHeader(output, 200, SUCCESS);
            }
            else{
                sendHeader(output, 404, FAIL);
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    private RawHttpRequest GetResponse(InputStream input){
        RawHttp rawHttp = new RawHttp();
        RawHttpRequest response = null;
        try {
            response = rawHttp.parseRequest(input).eagerly();
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        return response;
    }
    
    private String getRequestBody(RawHttpRequest response) {
        String body = "";
        try {
            if(response.getBody().isPresent()){
                body = response.getBody().get().decodeBodyToString(StandardCharsets.UTF_8);
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        return body;
    }
    
    private String getRequestUrl(RawHttpRequest response) {
        String path = "";
        if(response != null){
            try {
                path = response.eagerly().getStartLine().getUri().getPath();
            }
            catch(Exception ex) {
                ex.printStackTrace();
            }
        }
        return path;
    }

    private void sendHeader(OutputStream output, int statusCode, String statusText) {
        var ps = new PrintStream(output);
        ps.printf("HTTP/1.1 %s %s%n", statusCode, statusText);
        ps.printf("Access-Control-Allow-Origin: "+ origin +" %n");
    }
}