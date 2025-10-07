import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { WelcomeCardComponent } from "../../shared/components/welcome-card/welcome-card.component";
@Component({
  selector: "app-welcome",
  standalone: true,
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
  imports: [WelcomeCardComponent]

})

export class WelcomeComponent {
    features = [
        { iconName: "fa-solid fa-heart", title: "Meaningful Engagement" },
        { iconName: "fa-solid fa-magnifying-glass", title: "Easy Discoverability" },
        { iconName: "fa-solid fa-users", title: "Community Blogging" },
    ];
    constructor(private router:Router){}


    onRegister(){
        this.router.navigateByUrl("/auth/register")
    }
    onLogin(){
        this.router.navigateByUrl("/auth/login")
    }
}