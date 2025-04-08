import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared.module";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
        IonicModule.forRoot(),
         AppRoutingModule,
         ReactiveFormsModule,
         HttpClientModule,
       SharedModule],
})
export class AppModule{}