package com.se.championschoice.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  @Value("${app.base.url}")
  private String baseUrl;

  public void sendVerificationEmail(String toEmail, String firstName, String token) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("championchoice0101@gmail.com");
    message.setTo(toEmail);
    message.setSubject("Verify Your Champion's Choice Account");

    String verificationLink = baseUrl + "/verify?token=" + token;

    String emailBody = "Hello " + firstName + ",\n\n"
        + "Thank you for registering with Champion's Choice!\n\n"
        + "Please click the link below to verify your email address:\n"
        + verificationLink + "\n\n"
        + "This link will expire in 24 hours.\n\n"
        + "If you did not create an account, please ignore this email.\n\n"
        + "Thanks,\n"
        + "Champion's Choice Team";

    message.setText(emailBody);

    mailSender.send(message);
  }
}
