import { Component, Input } from "@angular/core";

@Component({
  selector: "app-welcome-card",
  templateUrl: "./welcome-card.component.html",
styleUrls: ["./welcome-card.component.css"]
})

export class WelcomeCardComponent {
  @Input({required:true}) iconName: string = "";
  @Input({required:true}) title: string = "";

}