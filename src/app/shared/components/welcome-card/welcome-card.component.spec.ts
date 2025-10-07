import{ComponentFixture,TestBed}from'@angular/core/testing';
import{WelcomeCardComponent}from'./welcome-card.component';
import{By}from'@angular/platform-browser';

describe('WelcomeCardComponent',()=>
    {
    let component:WelcomeCardComponent;
    let fixture:ComponentFixture<WelcomeCardComponent>;

    beforeEach(async()=>
  { 
    await TestBed.configureTestingModule({
        imports:[WelcomeCardComponent]
    }).compileComponents();

    fixture=TestBed.createComponent(WelcomeCardComponent);
    component=fixture.componentInstance;
    
    fixture.detectChanges();
 });

 it('should create',() => {
    expect(component).toBeTruthy();
 });


it('should render icon and title based on inputs',()=>{
        component.iconName='test-icon';
        component.title='Test-Title';
        fixture.detectChanges();
        const iconElement=fixture.debugElement.query(By.css('.icon-class'));
        const titleElement=fixture.debugElement.query(By.css('.title'));
        expect(iconElement?.nativeElement.classList).toContain('test-icon');
        expect(titleElement?.nativeElement.textContent).toBe('Test-Title');
    })
    });

