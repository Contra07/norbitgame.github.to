package ru.practicat;

public class Main {
    public static void main(String[] args) {
        try{
            var port = Integer.parseUnsignedInt(args[0]);
            var origin = args[1];
            var mailConfigPath = args[2];
            new Server(port, origin, mailConfigPath).start();
        }
        catch(Exception ex){
            ex.printStackTrace();
        }
    }
}

