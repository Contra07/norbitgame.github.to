package ru.practicat;

import java.io.IOException;
import java.net.ServerSocket;

public class Server {

    private final int port;
    private final String origin; 
    private final MailSender mail;
    

    public Server(int port, String origin, String configPath) {
        this.port = port;
        this.mail = new MailSender(configPath);
        this.origin = origin;
    }

    void start() {
        try (var server = new ServerSocket(this.port)) {
            System.out.println("Server started on port" + server.getLocalPort());
            while (true) {
                System.out.println("Server waiting...");
                var socket = server.accept();
                var thread = new Handler(socket, origin, mail);
                thread.start();
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
    }
}
