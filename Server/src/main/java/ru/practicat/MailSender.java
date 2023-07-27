package ru.practicat;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class MailSender {
    private final Properties properties;
    private final String username;
    private final String password;
    private final Session session;

    public MailSender(String configPath) {
        properties = getProperties(configPath);
        username = properties.getProperty("mail.from");
        password = properties.getProperty("mail.from.password");
        session = getSession();
    }

    public boolean sendForm(String form){
        return sendMsg(getFormMessage(GsonParser.parseString(form)));
    }
    
    private boolean sendMsg(Message message){
        boolean result = false;
        try {
            Transport.send(message);
            System.out.println("Message has been sent to: ");
            for (Address Recipient : message.getAllRecipients()) {
                System.out.print(Recipient+ " ");
            }
            result = true;
        } catch (MessagingException ex) {
            System.out.println("Error sending the message");
            ex.printStackTrace();
        }
        return result;
    }
    
    private Message getFormMessage(Form form){
        Message message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(getUsername()));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(
                            properties.getProperty("mail.to")
                    )
            );
            message.setSubject("practicat");
            message.setText(form.toString());
        }
        catch (MessagingException ex) {
            message = null;
            System.out.println("Message build error");
            ex.printStackTrace();
        }
        System.out.println("Message has been build");
        return message;
    }

    private Session getSession(){
    return Session.getInstance(
                properties,
                new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(getUsername(), getPassword());
                    }
                }
        );
    }
    
    private Properties getProperties(String filename) {
        Properties properties = new Properties();
        try (FileInputStream inputStream = new FileInputStream(filename)) {
            properties.load(inputStream);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
        return properties;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
