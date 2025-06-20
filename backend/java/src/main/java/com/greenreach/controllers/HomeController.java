package com.greenreach.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
    @GetMapping("/") //handles requests for the root path
    public String home() {
        return "home"; //returns the view name
    }
}
