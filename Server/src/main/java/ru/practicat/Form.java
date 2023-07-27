package ru.practicat;

import java.io.Serializable;

public record Form(String name, String phone, String university, String specialization, String stage, int course,
                   int hours, String startDate, String endDate, String petProjects, String ideas,
                   String skills) implements Serializable {

    @Override
    public String toString() {
        return "Анкета:" + "\r\n" +
                "Имя: " + name() + "\r\n" +
                "Телефон: " + phone() + "\r\n" +
                "Из учебного заведения: " + university() + "\r\n" +
                "Со специализацией: " + specialization() + "\r\n" +
                "Со ступенью образования: " + stage() + "\r\n" +
                "Курс обучения: " + course() + "\r\n" +
                "Готов посветить практике " + hours() + " часов в день" + "\r\n" +
                "Желает приступить " + startDate() +
                " и закончить " + endDate() + "\r\n" +
                "Пет проекты: " + petProjects() + "\r\n" +
                "Идеи: " + ideas() + "\r\n" +
                "Навыки: " + skills();
    }
}
