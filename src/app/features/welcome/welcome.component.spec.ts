import { ComponentFixture,TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { WelcomeComponent } from "./welcome.component";
import { WelcomeCardComponent } from "../../shared/components/welcome-card/welcome-card.component";
import { By } from "@angular/platform-browser";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  
    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj("Router", ["navigateByUrl"]);
        await TestBed.configureTestingModule({
            imports: [WelcomeComponent, WelcomeCardComponent],
            providers: [{ provide: Router, useValue: mockRouter }]
        }).compileComponents();

        fixture = TestBed.createComponent(WelcomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it( "should render three app-welcome-card components", () => {
        const cards = fixture.debugElement.queryAll(By.css("app-welcome-card"));
        expect(cards.length).toBe(3);
    });

    it('should navigate to /auth/login when login button is clicked',() => {
        const button = fixture.debugElement.query(By.css('#loginbtn'));
        expect(button).withContext("login button not found in DOM").not.toBeNull();
        button.triggerEventHandler('click', null);
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith("/auth/login");
    });

    it('should navigate to /auth/register when register button is clicked',() =>{

        const button = fixture.debugElement.query(By.css('#registerbtn'));
        expect(button).withContext("login button not found in DOM").not.toBeNull();
        button.triggerEventHandler('click', null);
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith("/auth/register");
        
    });

    
});